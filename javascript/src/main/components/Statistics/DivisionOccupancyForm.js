import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import fetch from "isomorphic-unfetch";

const DivisionOccupancyForm = ({ setCourseJSON, fetchJSON, setFormSubmitted }) => {

    const [startQuarter, setStartQuarter] = useState("20204");
    const [endQuarter, setEndQuarter] = useState("20212");
    const [department, setDepartment] = useState("CMPSC");
    const [level, setLevel] = useState("U");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit pressed");
        fetchJSON(event, {startQuarter, endQuarter, department, level}).then((courseJSON)=> {
            console.log(courseJSON);
            setCourseJSON(courseJSON);
            setFormSubmitted(true);
        });
    }; 

    const handleStartQuarterOnChange = (event) => {
        setStartQuarter(event.target.value);
    };

    const handleEndQuarterOnChange = (event) => {
        setEndQuarter(event.target.value);
    };

    const handleDepartmentOnChange = (event) => {
        setDepartment(event.target.value);
    };

    const handleLevelOnChange = (event) => {
        setLevel(event.target.value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="DivisionOccupancy.StartQuarter">
                <Form.Label>Start Quarter</Form.Label>
                <Form.Control as="select" onChange={handleStartQuarterOnChange} value={startQuarter} data-testid="select-start-quarter" >
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="DivisionOccupancy.EndQuarter">
                <Form.Label>End Quarter</Form.Label>
                <Form.Control as="select" onChange={handleEndQuarterOnChange} value={endQuarter} data-testid="select-end-quarter" >
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="DivisionOccupancy.Department">
                <Form.Label>Department</Form.Label>
                <Form.Control as="select" onChange={handleDepartmentOnChange} value={department}>
                    <option>CMPSC</option>
                    <option>MATH</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="DivisionOccupancy.CourseLevel">
                <Form.Label>Course Level</Form.Label>
                <Form.Control as="select" onChange={handleLevelOnChange} value={level}>
                    <option value="L">Undergrad-Lower Division</option>
                    <option value="S">Undergrad-Upper Division</option>
                    <option value="U">Undergrad-All</option>
                    <option value="G">Graduate</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
        </Button>
        </Form>
    );
};

export default DivisionOccupancyForm;
