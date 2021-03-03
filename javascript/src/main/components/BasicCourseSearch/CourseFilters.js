import React from "react";
import { Form} from "react-bootstrap";


const CourseFilters = ({cancelled, handleCancelledOnChange, closed, handleClosedOnChange, full, handleFullOnChange }) => {

    return (
        <Form.Group controlId="BasicSearch.Hide">
            <Form.Check type="checkbox" label="Cancelled" checked={cancelled} onClick={handleCancelledOnChange} id={`inline-checkbox-1`}/>
            <Form.Check type="checkbox"  label="Closed" checked={closed} onClick={handleClosedOnChange} id={`inline-checkbox-2`}/>
            <Form.Check type="checkbox" label="Full" checked={full} onClick={handleFullOnChange} id={`inline-checkbox-3`}/>
        </Form.Group>
    );
};

export default CourseFilters;

