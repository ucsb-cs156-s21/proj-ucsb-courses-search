import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import fetch from "isomorphic-unfetch";

const BasicCourseSearchForm = ({ setCourseJSON }) => {

    const [quarter, setQuarter] = useState("20211");
    const [department, setDepartment] = useState("CMPSC");
    const [level, setLevel] = useState("U");

    const fetchJSON = async (event) => {
        const url=`/api/public/basicsearch?qtr=${quarter}&dept=${department}&level=${level}`;
        console.log(`fetching JSON, url=${url}`);
        const courseJSON = (await (await fetch(url)).json() )
        console.log(`fetch returned, courseJSON=${courseJSON}`);
        return courseJSON;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit pressed");
        fetchJSON(event).then((courseJSON)=> {
            setCourseJSON(courseJSON);
        });
    };

    const handleQuarterOnChange = (event) => {
        setQuarter(event.target.value);
    };

    const handleDepartmentOnChange = (event) => {
        setDepartment(event.target.value);
    };

    const handleLevelOnChange = (event) => {
        setLevel(event.target.value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="BasicSearch.Quarter">
                <Form.Label>Quarter</Form.Label>
                <Form.Control as="select" onChange={handleQuarterOnChange} value={quarter} data-testid="select-quarter" >
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
