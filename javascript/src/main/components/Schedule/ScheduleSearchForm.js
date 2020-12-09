import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import fetch from "isomorphic-unfetch";

const ScheduleSearchForm = ({ setScheduleJSON, fetchJSON }) => {

    const [schedule, setSchedule] = useState("0");
    
    const [name, setName] = useState("Schedule0");
    const [description, setDescription] = useState("Default Description");
    const [quarter, setQuarter] = useState("Fall20");
    const [authorization, setAuthorization] = useState("admin");
    const [id,setId] = useState("0");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit pressed");
        fetchJSON(event, {authorization,id}).then((scheduleJSON)=> {
            setScheduleJSON(scheduleJSON);
        });
    };

    const handleNameOnChange = (event) => {
        setName(event.target.value);
    };
//JL - Dec 8-
    //Dynamically add dropdown menu itmes:
    //https://stackoverflow.com/questions/36205673/how-do-i-create-a-dynamic-drop-down-list-with-react-bootstrap
    const createSelectItems = () => {
         let items = [];         
         for (let i = 0; i <= 0; i++) {             
              items.push(<option value = {i}>{i}</option>);
         }
         return items;
     };
                         
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="ScheduleSearch.schedule">
                <Form.Label>Schedule</Form.Label>
                <Form.Control as="select" onChange={handleNameOnChange} value={name} data-testid="select-schedule" >
                        {createSelectItems()}
                </Form.Control>
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Get Schedule
            </Button>
            <Form.Group></Form.Group>
            
            
            <Button variant="primary">
                Delete Schedule
            </Button>
            
            
            {/* <Button variant="primary">
                AddSchedule
            </Button> */}
        </Form>
    );
};

export default ScheduleSearchForm;
