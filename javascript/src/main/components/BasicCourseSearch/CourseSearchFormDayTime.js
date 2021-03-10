import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CourseSearchFormDayTime = ({ setCourseJSON, fetchJSON }) => {
    const [startQuarter, setStartQuarter] = useState("20212");
    const [endQuarter, setEndQuarter] = useState("20212");
    const [instructorText, setInstructor]=useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchJSON(event, { startQuarter, endQuarter, instructorText}).then((courseJSON) => {
            setCourseJSON(courseJSON);
        });
    };

    const handleStartQuarterOnChange = (event) => {
        setStartQuarter(event.target.value);
    };

    const handleEndQuarterOnChange = (event) => {
        setEndQuarter(event.target.value);
    };

    const handleInstructorOnChange = (event) => {
        setInstructor(event.target.value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="DayTimeSearch.StartController">
                <Form.Label>Start time</Form.Label>
                <Form.Control as="select" onChange={handleStartQuarterOnChange} value={startQuarter}  >
                    <option value="20212">8:00 AM</option>
                    <option value="20211">9:00 AM</option>
                    <option value ="20211">10:00 AM</option>
                    <option value="20210">11:00 AM</option>
                    <option value="20209">12:00 PM</option>
                    <option value="20208">1:00 PM</option>
                    <option value="20207">2:00 PM</option>
                    <option value="20206">3:00 PM</option>
                    <option value="20205">4:00 PM</option>
                    <option value="20204">5:00 PM</option>
                    <option value="20203">6:00 PM</option>
                    <option value="20202">7:00 PM</option>
                    <option value="20201">8:00 PM</option>
                    <option value="20200">9:00 PM</option>  
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="DayTimeSearch.EndController">
                <Form.Label>End time</Form.Label>
                <Form.Control as="select" onChange={handleEndQuarterOnChange} value={endQuarter}  >
                    <option value="20212">8:00 AM</option>
                    <option value="20211">9:00 AM</option>
                    <option value ="20211">10:00 AM</option>
                    <option value="20210">11:00 AM</option>
                    <option value="20209">12:00 PM</option>
                    <option value="20208">1:00 PM</option>
                    <option value="20207">2:00 PM</option>
                    <option value="20206">3:00 PM</option>
                    <option value="20205">4:00 PM</option>
                    <option value="20204">5:00 PM</option>
                    <option value="20203">6:00 PM</option>
                    <option value="20202">7:00 PM</option>
                    <option value="20201">8:00 PM</option>
                    <option value="20200">9:00 PM</option>              
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="QuarterSearch.StartController">
                <Form.Label>Start Quarter</Form.Label>
                <Form.Control as="select" onChange={handleStartQuarterOnChange} value={startQuarter}  >
                    <option value="20212">S21</option>
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                    <option value="20203">M20</option>
                    <option value="20202">S20</option>
                    <option value="20201">W20</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="QuarterSearch.EndController">
                <Form.Label>End Quarter</Form.Label>
                <Form.Control as="select" onChange={handleEndQuarterOnChange} value={endQuarter}  >
                <option value="20212">S21</option>
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                    <option value="20203">M20</option>
                    <option value="20202">S20</option>
                    <option value="20201">W20</option>             
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default CourseSearchFormDayTime;