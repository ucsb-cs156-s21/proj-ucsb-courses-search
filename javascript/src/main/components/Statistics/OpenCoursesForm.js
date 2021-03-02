import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import DepartmentFormSelect from "main/components/Statistics/DepartmentFormSelect";
import QuarterFormSelect from "main/components/Statistics/QuarterFormSelect";

const OpenCoursesForm = ({ setCourseJSON, fetchJSON, onSubmit = () => {} }) => {

    const [startQuarter, setStartQuarter] = useState("20211");
    const [department, setDepartment] = useState("CMPSC");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit();
        setLoading(true);
        fetchJSON({startQuarter, department}).then((courseJSON)=> {
            setCourseJSON(courseJSON);
            setLoading(false);
        });
    }; 

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="OpenCourses.StartQuarter">
                <Form.Label>Start Quarter</Form.Label>
                <QuarterFormSelect handleSelect={setStartQuarter} initialQuarter={4} initialYear={2020} testId={"select-start"}/>
            </Form.Group>
            <Form.Group controlId="OpenCourses.Department">
                <Form.Label>Department</Form.Label>
                <DepartmentFormSelect handleSelect={setDepartment} value={department}/>
            </Form.Group>
            <Button variant="primary" type="submit" className={"text-center"} disabled={loading}>
                Submit
            </Button>
            {loading && <Spinner size={"sm"} style={{ marginLeft: "5px" }} animation="border" />}
        </Form>
    );
};
export default OpenCoursesForm;