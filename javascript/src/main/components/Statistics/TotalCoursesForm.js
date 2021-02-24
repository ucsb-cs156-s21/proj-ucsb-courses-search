import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import QuarterFormSelect from "main/components/Statistics/QuarterFormSelect";

const TotalCoursesForm = ({ setTotalCoursesJSON, fetchTotalCoursesByDept, onSubmit = () => {} }) => {

    const [quarter, setQuarter] = useState("20204")
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit pressed");
        onSubmit();
        setLoading(true);
        fetchTotalCoursesByDept({quarter: quarter})
        .then((courseJSON)=> {
            setTotalCoursesJSON(courseJSON);
            setLoading(false);
        });
        console.log(quarter);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="AvgClassSize.StartQuarter">
                <Form.Label>Start Quarter</Form.Label>
                <QuarterFormSelect handleSelect={setQuarter} initialQuarter={1} initialYear={2021} testId={"select-start"}/>
            </Form.Group>
            <Button variant="primary" type="submit" className={"text-center"} disabled={loading}>
                Submit
            </Button>
            {loading && <Spinner size={"sm"} style={{ marginLeft: "5px" }} animation="border" />}
        </Form>
    );
};

export default TotalCoursesForm;