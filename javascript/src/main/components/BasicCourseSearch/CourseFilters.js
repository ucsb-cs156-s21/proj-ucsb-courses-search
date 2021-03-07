import React from "react";
import { Form } from "react-bootstrap";

const CourseFilters = ({ cancelled, handleCancelledOnChange, closed, handleClosedOnChange, full, handleFullOnChange }) => {

    return (
        <Form.Group controlId="BasicSearch.Hide">
            <Form.Check type="checkbox" label="Cancelled" value={cancelled} onChange={handleCancelledOnChange} id="inline-checkbox-cancelled"/>
            <Form.Check type="checkbox" label="Closed" value={closed} onChange={handleClosedOnChange} id="inline-checkbox-closed"/>
            <Form.Check type="checkbox" label="Full" value={full} onChange={handleFullOnChange} id="inline-checkbox-full"/>
        </Form.Group>
    );
};

export default CourseFilters;

