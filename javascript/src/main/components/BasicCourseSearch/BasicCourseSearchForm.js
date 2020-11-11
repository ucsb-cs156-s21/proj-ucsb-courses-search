import React from "react";
import { Form,Button } from "react-bootstrap";

const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit pressed");
    debugger;
};

const BasicCourseSearchForm = () => {
  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="BasicSearch.Quarter">
            <Form.Label>Quarter</Form.Label>
            <Form.Control as="select">
            <option>W21</option>
            <option>F20</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="BasicSearch.Department">
            <Form.Label>Department</Form.Label>
            <Form.Control as="select">
            <option>CMPSC</option>
            <option>MATH</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="BasicSearch.CourseLevel">
            <Form.Label>Course Level</Form.Label>
            <Form.Control as="select">
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
