import React from "react";
import { Form, Button } from "react-bootstrap";

const AddSchedForm = () => {

    const handleSubmit = (event) => {
        // event.preventDefault();
        // fetchJSON(event, { quarter, department }).then((courseJSON) => {
        //     setCourseJSON(courseJSON);
        // });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formsSchedName">
                <Form.Label>Schedule Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Schedule Name" />
            </Form.Group>

            <Form.Group controlId="formSchedDes">
                <Form.Label>description</Form.Label>
                <Form.Control type="text" placeholder="Enter Schedule Description" />
            </Form.Group>

            <Form.Group controlId="formQuarter">
                <Form.Label>Choose Schedule quarter</Form.Label>
                <Form.Control as="select">
                    <option>W21</option>
                    <option>F20</option>

                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                Create Schedule
            </Button>
        </Form>
    );
};

export default AddSchedForm;
