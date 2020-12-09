import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const GeCourseSearchForm = ({ setCourseJSON, fetchJSON }) => {

    const [startQuarter, setStartQuarter] = useState("20211");
    const [endQuarter, setEndQuarter] = useState("20211");
    const [geCode, setGeCode] = useState("A1 ");

    const handleSubmit = (event) => {
        //console.log(event);
        event.preventDefault();
        fetchJSON(event, {startQuarter, endQuarter, geCode}).then((courseJSON) => {
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

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="BasicSearch.StartQuarter">
                <Form.Label>Start Quarter</Form.Label>
                <Form.Control as="select" onChange={handleStartQuarterOnChange} value={startQuarter}  >
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="BasicSearch.EndQuarter">
                <Form.Label>End Quarter</Form.Label>
                <Form.Control as="select" onChange={handleEndQuarterOnChange} value={endQuarter}  >
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="BasicSearch.GeCode">
                <Form.Label>GE Code</Form.Label>
                <Form.Control as="select" onChange={handleGeCodeOnChange} value={geCode}>
                    <option value="A1 ">A1</option>
                    <option value="A2 ">A2</option>
                    <option value="B  ">B</option>
                    <option value="C  ">C</option>
                    <option value="D  ">D</option>
                    <option value="E  ">E</option>
                    <option value="F  ">F</option>
                    <option value="G  ">G</option>
                    <option value="AMH">American History</option>
                    <option value="ETH">Ethnicities</option>
                    <option value="EUR">European Cultures</option>
                    <option value="QNT">Quantitative Relationships</option>
                    <option value="WRT">Writing</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default GeCourseSearchForm;
