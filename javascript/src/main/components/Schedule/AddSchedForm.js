import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddSchedForm = ({ createSchedule, getToken, onSuccess, onError }) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quarter, setQuarter] = useState("W21");

    const handleSubmit = (event) => {
        event.preventDefault();
        createSchedule({
            name,
            description,
            quarter
        }, getToken, onSuccess, onError)
    };

    const handleNameOnChange = (event) => {
        setName(event.target.value);
    }

    const handleDescriptionOnChange = (event) => {
        setDescription(event.target.value);
    }

    const handleQuarterOnChange = (event) => {
        setQuarter(event.target.value);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formsSchedName">
                <Form.Label>Schedule Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Schedule Name" value={name} onChange={handleNameOnChange} data-testid="schedule-name" />
            </Form.Group>

            <Form.Group controlId="formSchedDes">
                <Form.Label>description</Form.Label>
                <Form.Control type="text" placeholder="Enter Schedule Description" value={description} onChange={handleDescriptionOnChange}  data-testid="schedule-description" />
            </Form.Group>

            <Form.Group controlId="formQuarter">
                <Form.Label>Choose Schedule quarter</Form.Label>
                <Form.Control as="select" value={quarter} onChange={handleQuarterOnChange} data-testid="schedule-quarter">
                    <option>W21</option>
                    <option>F20</option>
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" data-testid="schedSubmit">
                Create Schedule
            </Button>
        </Form>
    );
};

export default AddSchedForm;
