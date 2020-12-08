import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import fetch from "isomorphic-unfetch";

const CourseSearchFormInstructor = ({ setCourseJSON, fetchJSON }) => {

    const [quarter, setQuarter] = useState("20211");
    const [department, setDepartment] = useState("CMPSC");
    const [level, setLevel] = useState("U");
    const [instructor, setInstructor] = useState("Phill Conrad");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit pressed");
        fetchJSON(event, {quarter, department, level}).then((courseJSON)=> {
            setCourseJSON(courseJSON);
        });
    };

    const handleQuarterOnChange = (event) => {
        setQuarter(event.target.value);
    };
/*
    const handleStartQuarterOnChange = (event) => {
        setQuarter(event.target.value);
    };

    const handleEndQuarterOnChange = (event) => {
        setQuarter(event.target.value);
    };
*/
    const handleDepartmentOnChange = (event) => {
        setDepartment(event.target.value);
    };

    const handleInstructorOnChange = (event) => {
        setInstructor(event.target.value);
    };

    const handleLevelOnChange = (event) => {
        setLevel(event.target.value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="BasicSearch.Quarter">
                <Form.Label>Start Quarter</Form.Label>
                <Form.Control as="select" onChange={handleQuarterOnChange} value={quarter} data-testid="select-quarter" >
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                </Form.Control>
            </Form.Group>
            <Form.Label>End Quarter</Form.Label>
                <Form.Control as="select" onChange={handleQuarterOnChange} value={quarter} data-testid="select-quarter" >
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                </Form.Control>
            <Form.Group controlId="BasicSearch.Department">
                <Form.Label>Instructor</Form.Label>
                <Form.Control as="select" onChange={handleInstructorOnChange} value={department}>
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

export default CourseSearchFormInstructor;