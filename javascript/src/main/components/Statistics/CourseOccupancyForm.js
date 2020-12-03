import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import DepartmentFormSelect from "main/components/Statistics/DepartmentFormSelect";
import QuarterFormSelect from "main/components/Statistics/QuarterFormSelect";

const CourseOccupancyForm = ({ setOccupancyJson, fetchJSON }) => {

    const [startQuarter, setStartQuarter] = useState("20204");
    const [endQuarter, setEndQuarter] = useState("20211");
    const [department, setDepartment] = useState("CMPSC");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit pressed");

        fetchJSON({startQuarter, endQuarter, department})
        .then((courseJSON)=> {
            setOccupancyJson(courseJSON);
        });

    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="CourseOccupancy.StartQuarter">
                <Form.Label>Start Quarter</Form.Label>
                <QuarterFormSelect handleSelect={setStartQuarter} initialQuarter={4} initialYear={2020} testId={"select-start"}/>
            </Form.Group>
            <Form.Group controlId="CourseOccupancy.EndQuarter">
                <Form.Label>End Quarter</Form.Label>
                <QuarterFormSelect handleSelect={setEndQuarter} initialQuarter={1} initialYear={2021} testId={"select-end"}/>
            </Form.Group>
            <Form.Group controlId="CourseOccupancy.Department">
                <Form.Label>Department</Form.Label>
                <DepartmentFormSelect handleSelect={setDepartment} value={department}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default CourseOccupancyForm;
