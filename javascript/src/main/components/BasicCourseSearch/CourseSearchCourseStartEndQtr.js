import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CourseSearchCourseStartEndQtr = ({ setCourseJSON, fetchJSON }) => {

    const [startQuarter, setStartQuarter] = useState("20211");
    const [endQuarter, setEndQuarter] = useState("20211");
    const [department, setDepartment] = useState("CMPSC");
    const [courseNumber, setCourseNumber] = useState("8");

    const handleSubmit = (event) => {
        //console.log(event);
        event.preventDefault();
        fetchJSON(event, { startQuarter, endQuarter, department, courseNumber }).then((courseJSON) => {
            setCourseJSON(courseJSON);
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

    const handleCourseNumberOnChange = (event) => {
        setCourseNumber(event.target.value);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="BasicSearch.Quarter">
                <Form.Label>Start Quarter</Form.Label>
                <Form.Control as="select" onChange={handleStartQuarterOnChange} value={startQuarter}  >
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="BasicSearch.Quarter">
                <Form.Label>End Quarter</Form.Label>
                <Form.Control as="select" onChange={handleEndQuarterOnChange} value={endQuarter}  >
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="BasicSearch.Department">
                <Form.Label>Department</Form.Label>
                <Form.Control as="select" onChange={handleCourseNumberOnChange} value={department}>
                    <option>CMPSC</option>
                    <option>MATH</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="BasicSearch.CourseNumber">
                <Form.Label>Course Number</Form.Label>
                <Form.Control onChange={handleDepartmentOnChange} defaultValue={courseNumber} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default CourseSearchCourseStartEndQtr;
