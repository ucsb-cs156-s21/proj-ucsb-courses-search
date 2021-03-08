import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CourseSearchFormQtrDeptOnly = ({ setCourseJSON, fetchJSON }) => {
    const [quarter, setQuarter] = useState("20212");
    const [department, setDepartment] = useState("CMPSC");

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchJSON(event, { quarter, department }).then((courseJSON) => {
            if(courseJSON.total == 0){
                alert("Empty!");
            }
            setCourseJSON(courseJSON);
        });
    };

    const handleQuarterOnChange = (event) => {
        setQuarter(event.target.value);
    };

    const handleDepartmentOnChange = (event) => {
        setDepartment(event.target.value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="BasicSearch.Quarter">
                <Form.Label>Quarter</Form.Label>
                <Form.Control as="select" onChange={handleQuarterOnChange} value={quarter}  >
                    <option value="20212">S21</option>
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="BasicSearch.Department">
                <Form.Label>Department</Form.Label>
                <Form.Control as="select" onChange={handleDepartmentOnChange} value={department}>
                    <option>CMPSC</option>
                    <option>MATH</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default CourseSearchFormQtrDeptOnly;
