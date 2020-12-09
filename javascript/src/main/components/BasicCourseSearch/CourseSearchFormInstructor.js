import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import fetch from "isomorphic-unfetch";

const CourseSearchFormInstructor = ({ setCourseJSON, fetchJSON }) => {



    const [startQuarter, setStartQuarter] = useState("20211");
    const [endQuarter, setEndQuarter] = useState("20211");
    const [instructorText, setInstructor]=useState("KHARITONOVA");
    

    const handleSubmit = (event) => {
        //console.log(event);
        event.preventDefault();
        fetchJSON(event, { startQuarter, endQuarter, instructorText}).then((courseJSON) => {
            setCourseJSON(courseJSON);
        });
    };

    // FALL = 4, F
    // WINTER = 1, W
    // SPRING = 2, S
    // SUMMER = 3, M
    const handleStartQuarterOnChange = (event) => {
        setStartQuarter(event.target.value);
    };

    const handleEndQuarterOnChange = (event) => {
        setEndQuarter(event.target.value);
    };

    const handleInstructorOnChange = (event) => {
        setInstructor(event.target.value);
    };

    // Note:
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="BasicSearch.Quarter">
                <Form.Label>Start Quarter</Form.Label>
                <Form.Control as="select" onChange={handleStartQuarterOnChange} value={startQuarter}  >
                    <option value="20211">W21</option>

                    <option value="20204">F20</option>
                    <option value="20201">W20</option>
                    <option value="20202">S20</option>
                    <option value="20203">M20</option>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId="BasicSearch.Quarter">
                <Form.Label>End Quarter</Form.Label>
                <Form.Control as="select" onChange={handleEndQuarterOnChange} value={endQuarter}  >
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                    <option value="20201">W20</option>
                    <option value="20202">S20</option>
                    <option value="20203">M20</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="BasicSearch.Instructor">
                <Form.Label>Instructor</Form.Label>
                <Form.Control type="text" onChange={handleInstructorOnChange} value={instructorText}>
                    
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

/*
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

    const handleStartQuarterOnChange = (event) => {
        setQuarter(event.target.value);
    };

    const handleEndQuarterOnChange = (event) => {
        setQuarter(event.target.value);
    };

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
*/
export default CourseSearchFormInstructor;