import React from "react";
import { Form } from "react-bootstrap";

const CourseFilters = ({ cancelled, handleCancelledOnChange, closed, handleClosedOnChange, full, handleFullOnChange }) => {

    return (
        <Form.Group controlId="BasicSearch.Hide">
            <Form.Check type="checkbox" label="Cancelled" value={cancelled} onChange={handleCancelledOnChange} id="inline-checkbox-1"/>
            <Form.Check type="checkbox" label="Closed" value={closed} onChange={handleClosedOnChange} id="inline-checkbox-2"/>
            <Form.Check type="checkbox" label="Full" value={full} onChange={handleFullOnChange} id="inline-checkbox-3"/>
        </Form.Group>
    );
};

export default CourseFilters;

