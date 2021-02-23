import React, { useState } from "react";
import { Form, Button} from "react-bootstrap";
import SelectSubject from "./SelectSubject";

import {fetchSubjectAreas} from "main/services/subjectAreaService";

const BasicCourseSearchForm = ({ setCourseJSON, fetchJSON }) => {
    const [quarter, setQuarter] = useState("20212");
    const [subject, setSubject] = useState("CMPSC");
    const [level, setLevel] = useState("U");
    
    const [subjects, setSubjects] = useState([]);

    fetchSubjectAreas().then((subjectAreaJSON)=> {
        setSubjects(subjectAreaJSON);
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchJSON(event, {quarter, subject, level}).then((courseJSON)=> {
            setCourseJSON(courseJSON);
        });
    };

    const handleQuarterOnChange = (event) => {
        setQuarter(event.target.value);
    };

    const handleLevelOnChange = (event) => {
        setLevel(event.target.value);
    };
 
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="BasicSearch.Quarter">
                <Form.Label>Quarter</Form.Label>
                <Form.Control as="select" onChange={handleQuarterOnChange} value={quarter} data-testid="select-quarter" >
                    <option value="20212">S21</option>
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                </Form.Control>
            </Form.Group>
            <SelectSubject subjects={subjects} subject={subject} setSubject={setSubject} />
            <Form.Group controlId="BasicSearch.CourseLevel">
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

export default BasicCourseSearchForm;
