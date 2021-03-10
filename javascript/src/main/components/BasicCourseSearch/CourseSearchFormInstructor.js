import React, { useState } from "react";
import { Form, Button} from "react-bootstrap";
import { useToasts } from "react-toast-notifications";

const CourseSearchFormInstructor = ({ setCourseJSON, fetchJSON }) => {
    const [startQuarter, setStartQuarter] = useState("20212");
    const [endQuarter, setEndQuarter] = useState("20212");
    const [instructorText, setInstructor]=useState("");
    const { addToast } = useToasts()

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchJSON(event, { startQuarter, endQuarter, instructorText}).then((courseJSON) => {
            if(courseJSON.total === 0){
                addToast("There are no courses that match the requested criteria.", { appearance: "error" });
            }
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
            <Form.Group controlId="InstructorSearch.StartController">
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
            <Form.Group controlId="Instructor.EndController">
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
            <Form.Group controlId="InstructorSearch.Instructor">
                <Form.Label>Instructor</Form.Label>
                <Form.Control type="text" onChange={handleInstructorOnChange} value={instructorText} placeholder="Instructor Last Name">
                </Form.Control>
                <Form.Text style={{ textAlign: "left"}} muted>If there are multiple instructors with the same last name, do a search by last name first to determine how the instructor first name is abbreviated, e.g. WANG R K, WANG Y X, WANG Y F, etc. and then repeat the search.</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default CourseSearchFormInstructor;