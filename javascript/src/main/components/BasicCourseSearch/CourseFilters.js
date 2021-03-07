import React from "react";
import { Form } from "react-bootstrap";

const CourseFilters = ({ cancelled, handleCancelledOnChange, closed, handleClosedOnChange, full, handleFullOnChange }) => {

    return (
        <Form.Group controlId="BasicSearch.Hide">
            <Form.Check inline type="checkbox" label="Cancelled" value={cancelled} onChange={handleCancelledOnChange} data-testid="inline-checkbox-cancelled"/>
            <Form.Check inline type="checkbox" label="Closed" value={closed} onChange={handleClosedOnChange} data-testid="inline-checkbox-closed"/>
            <Form.Check inline type="checkbox" label="Full" value={full} onChange={handleFullOnChange} data-testid="inline-checkbox-full"/>
        </Form.Group>
    );
};

export default CourseFilters;

