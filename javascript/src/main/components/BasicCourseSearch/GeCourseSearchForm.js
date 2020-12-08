import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const GeCourseSearchForm = ({ setCourseJSON, fetchJSON }) => {

    const [startQuarter, setStartQuarter] = useState("20211");
    const [endQuarter, setEndQuarter] = useState("20211");
    const [geCode, setGeCode] = useState("A");
    const [geCollege, setGeCollege] = useState("CMPSC");

    const handleSubmit = (event) => {
        //console.log(event);
        event.preventDefault();
        fetchJSON(event, {startQuarter, endQuarter, geCode, geCollege}).then((courseJSON) => {
            setCourseJSON(courseJSON);
        });
    };

    const handleStartQuarterOnChange = (event) => {
        setStartQuarter(event.target.value);
    };

    const handleEndQuarterOnChange = (event) => {
        setEndQuarter(event.target.value);
    };

    const handleGeCodeOnChange = (event) => {
        setGeCode(event.target.value);
    };

    const handleGeCollegeOnChange = (event) => {
        setGeCollege(event.target.value);
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
            <Form.Group controlId="BasicSearch.GeCode">
                <Form.Label>GE Code</Form.Label>
                <Form.Control as="select" onChange={handleGeCodeOnChange} value={geCode}>
                    <option>A</option>
                    <option>C</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default GeCourseSearchForm;
