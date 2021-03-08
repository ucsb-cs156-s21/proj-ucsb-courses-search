import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";



const ScheduleSearchForm = ({ deleteSchedule, getSchedule, getToken, onSuccess, onError }) => {

    const [id,setId] = useState("");
    const state = {
        button: 1
    };




    const handleSubmit = (event) => {
        event.preventDefault();
        if (state.button === 1){}
        getSchedule({
            id
        }, getToken, onSuccess, onError)

        if (state.button === 2){
            deleteSchedule({
                id
            }, getToken, onError)
        }
    };

    const handleIdOnChange = (event) => {
        setId(event.target.value);
    };


                         
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="ScheduleSearch.schedule">
                    <Form.Control type="text" placeholder="Enter Schedule id" value={id} onChange={handleIdOnChange} data-testid="schedule-id" />
            </Form.Group>
            
            <Button onClick={() => (state.button = 1)} variant="primary" type="submit" data-testid="schedule-get">
                Get Schedule
            </Button>

            <Button onClick={() => (state.button = 2)} variant="primary" type="submit" data-testid="schedule-delete">
                Delete Schedule
            </Button>
            <Form.Group></Form.Group>
        </Form>

        
    );
};

export default ScheduleSearchForm;