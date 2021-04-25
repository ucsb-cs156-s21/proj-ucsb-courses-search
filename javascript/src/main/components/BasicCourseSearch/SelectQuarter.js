import React from "react";
import { Form } from "react-bootstrap";

const SelectQuarter = ({ quarters, _quarter, setQuarter, controlId, label}) => {

    const handleQuarterOnChange = (event) => {
        setQuarter(event.target.value);
    };

    return (
        <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="select" onChange={handleQuarterOnChange} >
                {quarters.map(function (object, i) {
                    return <option key={controlId + '-' + i} value={object.yyyyq}>{object.qyy}</option>;
                })}
            </Form.Control>
        </Form.Group>
    );
};

export default SelectQuarter;
