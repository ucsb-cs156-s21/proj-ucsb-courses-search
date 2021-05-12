import React, { useState } from "react";
import { Form, Button} from "react-bootstrap";
import { useToasts } from "react-toast-notifications";

const CourseSearchFormQtrDeptOnly = ({ setCourseJSON, fetchJSON }) => {
    const localSearchQuarter = localStorage.getItem("BasicSearch.Quarter");
    const localSearchDept = localStorage.getItem("BasicSearch.Department");

    const [quarter, setQuarter] = useState(localSearchQuarter || "20212");
    const [department, setDepartment] = useState(localSearchDept || "CMPSC");
    const { addToast } = useToasts()

    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        fetchJSON(event, { quarter, department }).then((courseJSON) => {
            if(courseJSON.total === 0){
                addToast("There are no courses that match the requested criteria.", { appearance: "error" });
            }
            setCourseJSON(courseJSON);
        });
    };

    const handleQuarterOnChange = (event) => {
        localStorage.setItem("BasicSearch.Quarter", event.target.value);
        setQuarter(event.target.value);
    };

    const handleDepartmentOnChange = (event) => {
        localStorage.setItem("BasicSearch.Department", event.target.value);
        setDepartment(event.target.value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="BasicSearch.Quarter">
                <Form.Label>Quarter</Form.Label>
                <Form.Control as="select" onChange={handleQuarterOnChange} value={quarter}  >
                    <option value="20212">S21</option>
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="BasicSearch.Department">
                <Form.Label>Department</Form.Label>
                <Form.Control as="select" onChange={handleDepartmentOnChange} value={department}>
                    <option>CMPSC</option>
                    <option>MATH</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default CourseSearchFormQtrDeptOnly;
