import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import fetch from "isomorphic-unfetch";
import DepartmentFormSelect from "main/components/Statistics/DepartmentFormSelect";
import QuarterFormSelect from "main/components/Statistics/QuarterFormSelect";
import { fromFormat } from "main/components/Statistics/QuarterFormSelect";;


const DivisionOccupancyForm = ({ setCourseJSON, fetchJSON, setFormSubmitted }) => {
    const [startQuarter, setStartQuarter] = useState("20204");
    const [endQuarter, setEndQuarter] = useState("20212");
    const [department, setDepartment] = useState("CMPSC");
    const [level, setLevel] = useState("U");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit pressed");
        fetchJSON({startQuarter, endQuarter, department, level}).then((courseJSON)=> {
            courseJSON.forEach((item) => {                          // readable quarter names
                item["quarter"] = fromFormat(item["quarter"]);
            });
            setCourseJSON(courseJSON);
            setFormSubmitted(true);
            console.log(courseJSON);
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
                <QuarterFormSelect handleSelect={setStartQuarter} initialQuarter={4} initialYear={2020} testId={"select-start"}/>
            </Form.Group>
            <Form.Group controlId="DivisionOccupancy.EndQuarter">
                <Form.Label>End Quarter</Form.Label>
                <QuarterFormSelect handleSelect={setEndQuarter} initialQuarter={1} initialYear={2021} testId={"select-end"}/>
            </Form.Group>
            <Form.Group controlId="DivisionOccupancy.Department">
                <Form.Label>Department</Form.Label>
                <DepartmentFormSelect handleSelect={setDepartment} value={department}/>
            </Form.Group>
            <Form.Group controlId="DivisionOccupancy.CourseLevel">
                <Form.Label>Course Level</Form.Label>
                <Form.Control as="select" onChange={handleLevelOnChange} value={level}>
                    <option value="U">Undergraduate</option>
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
