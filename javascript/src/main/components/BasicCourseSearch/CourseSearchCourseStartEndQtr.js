import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CourseSearchCourseStartEndQtr = ({ setCourseJSON, fetchJSON }) => {

    const [startQuarter, setStartQuarter] = useState("20211");
    const [endQuarter, setEndQuarter] = useState("20211");
    const [subjectArea, setSubjectArea] = useState("CMPSC   ");
    const [courseNumber, setCourseNumber] = useState("8");
    const [courseSuf, setCourseSuf] = useState("");

    const handleSubmit = (event) => {
        //console.log(event);
        event.preventDefault();
        fetchJSON(event, { startQuarter, endQuarter, subjectArea, courseNumber, courseSuf}).then((courseJSON) => {
            setCourseJSON(courseJSON);
        });
    };

    const handleStartQuarterOnChange = (event) => {
        setStartQuarter(event.target.value);
    };

    const handleEndQuarterOnChange = (event) => {
        setEndQuarter(event.target.value);
    };

    const handleSubjectAreaOnChange = (event) => {
        setSubjectArea(event.target.value);
    };

    const handleCourseNumberOnChange = (event) => {
        setCourseNumber(event.target.value);
    }

    const handleCourseSufOnChange = (event) => {
        setCourseSuf(event.target.value);
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
            <Form.Group controlId="BasicSearch.SubjectArea">
                <Form.Label>Subject Area</Form.Label>
                <Form.Control as="select" onChange={handleSubjectAreaOnChange} value={subjectArea}>
                    <option value="CMPSC   ">CMPSC</option>
                    <option value="MATH    ">MATH</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="BasicSearch.CourseNumber">
                <Form.Label>Course Number</Form.Label>
                <Form.Control onChange={handleCourseNumberOnChange} defaultValue={courseNumber} />
            </Form.Group>
            <Form.Group controlId="BasicSearch.CourseSuf">
                <Form.Label>Course Suffix (i.e. A, B, etc.)</Form.Label>
                <Form.Control onChange={handleCourseSufOnChange} defaultValue={courseSuf} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default CourseSearchCourseStartEndQtr;
