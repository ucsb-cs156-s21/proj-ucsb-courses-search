import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddSchedForm = ({ createSchedule, updateSchedule, existingSchedule }) => {

    const emptySchedule = {
        name: "",
        description:"",
        quarter:"",
        userId:""
    };

    const [schedule, setSchedule] = useState(existingSchedule || emptySchedule);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (createSchedule) {
            createSchedule(schedule);
        }
        else{
            updateSchedule(schedule, schedule.id);
        }
    };

    const handleNameOnChange = (event) => {
        setSchedule({
            ...schedule,
            name: event.target.value
          });
    }

    const handleDescriptionOnChange = (event) => {
        setSchedule({
            ...schedule,
            description: event.target.value
          });
    }

    const handleQuarterOnChange = (event) => {
        setSchedule({
          ...schedule,
          quarter: event.target.value
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formsSchedName">
                <Form.Label>Schedule Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Schedule Name" value={schedule.name} onChange={handleNameOnChange} data-testid="schedule-name" />
            </Form.Group>

            <Form.Group controlId="formSchedDes">
                <Form.Label>description</Form.Label>
                <Form.Control type="text" placeholder="Enter Schedule Description" value={schedule.description} onChange={handleDescriptionOnChange} data-testid="schedule-description" />
            </Form.Group>

            <Form.Group controlId="formQuarter">
                <Form.Label>Choose Schedule quarter</Form.Label>
                <Form.Control type="text" placeholder="Enter Schedule Quarter" value={schedule.quarter} onChange={handleQuarterOnChange} data-testid="schedule-quarter" />
            </Form.Group>

            <Button variant="primary" type="submit" data-testid="schedule-submit">
                Submit
            </Button>
        </Form>
    );
};

export default AddSchedForm;