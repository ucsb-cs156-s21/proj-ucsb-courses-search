import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import fetch from "isomorphic-unfetch";

const GeCourseSearchForm = ({ setCourseJSON, fetchJSON }) => {

    const [quarter, setQuarter] = useState("20211");
    const [ge, setGe] = useState("a");
    

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

    const handleGeOnChange = (event) => {
        setGe(event.target.value);
    };

    

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="GeSearch.StartQuarter">
                <Form.Label>Quarter</Form.Label>
                <Form.Control as="select" onChange={handleQuarterOnChange} value={quarter} data-testid="select-quarter" >
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="GeSearch.EndQuarter">
                <Form.Label>Quarter</Form.Label>
                <Form.Control as="select" onChange={handleQuarterOnChange} value={quarter} data-testid="select-quarter" >
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="GeSearch.Ge">
                <Form.Label>Quarter</Form.Label>
                <Form.Control as="select" onChange={handleGeOnChange} value={ge} data-testid="select-ge" >
                    <option value="a">AreaA</option>
                    <option value="b">AreaB</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
        </Button>
        </Form>
    );
};

export default GeCourseSearchForm;
