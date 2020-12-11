import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import JSONPrettyCard from "main/components/Utilities/JSONPrettyCard";

const ScheduleSearchForm = ({ deleteSchedule, getSchedule, getToken, onSuccess, onError }) => {

    const [id,setId] = useState("");
    const state = {
        button: 1
    };

    var scheduleOUTPUT = "";

    const handleSubmit = (event) => {
        event.preventDefault();
        if (state.button === 1){}
        scheduleOUTPUT = JSON.stringify(getSchedule({
            id
        }, getToken, onSuccess, onError))

        if (state.button === 2){
            deleteSchedule({
                id
            }, getToken, onSuccess, onError)
        }
    };

    const handleIdOnChange = (event) => {
        setId(event.target.value);
    };
//JL - Dec 8-
    //Dynamically add dropdown menu itmes:
    //https://stackoverflow.com/questions/36205673/how-do-i-create-a-dynamic-drop-down-list-with-react-bootstrap

                         
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="ScheduleSearch.schedule">
                <Form.Label>Schedule</Form.Label>
                <Form.Control type="text" placeholder="Enter Schedule id" value={id} onChange={handleIdOnChange} />
            </Form.Group>
            
            <Button onClick={() => (state.button = 1)} variant="primary" type="submit">
                Get Schedule
            </Button>

            <Button onClick={() => (state.button = 2)} variant="primary" type="submit">
                Delete Schedule
            </Button>
            <Form.Group></Form.Group>
        </Form>

        
    );
};

export default ScheduleSearchForm;
