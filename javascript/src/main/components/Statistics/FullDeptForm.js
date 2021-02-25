import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
//import DepartmentFormSelect from "main/components/Statistics/DepartmentFormSelect";
import QuarterFormSelect from "main/components/Statistics/QuarterFormSelect";

const FullDeptForm = ({ setFullDeptJSON, fetchFullDept, onSubmit = () => {} }) => {

    const [startQuarter, setStartQuarter] = useState("20204");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit pressed");
        onSubmit();
        setLoading(true);
        fetchFullDept({startQuarter}).then((courseJSON)=> {
            setFullDeptJSON(courseJSON);
            setLoading(false);
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="FullDept.startQuarter">
                <Form.Label>startQuarter</Form.Label>
                <QuarterFormSelect handleSelect={setStartQuarter} initialQuarter={4} initialYear={2020} testId={"select-start"}/>
            </Form.Group>
            <Button style={{margin: "1em 0"}} variant="primary" type="submit" className={"text-center"} disabled={loading}>
                Submit
            </Button>
            {loading && <Spinner size={"sm"} style={{ marginLeft: "5px" }} animation="border" />}
        </Form>
    );
};
export default FullDeptForm;
