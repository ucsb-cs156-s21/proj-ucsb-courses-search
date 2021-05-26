import React, { useState }  from "react";
import { Form } from "react-bootstrap";

const SelectQuarter = ({ quarters, _quarter, setQuarter, controlId, label}) => {

    const localSearchQuarter = localStorage.getItem(controlId);
    const [quarter, setQuarterState] = useState(localSearchQuarter || "20212");


    const handleQuarterOnChange = (event) => {
        localStorage.setItem(controlId, event.target.value);
        setQuarterState(event.target.value);
        setQuarter(event.target.value);
    };


    return (
        <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="select" value={quarter} onChange={handleQuarterOnChange} >
                {quarters.map(function (object, i) {
                    return <option key={controlId + '-' + i} value={object.yyyyq}>{object.qyy}</option>;
                })}
            </Form.Control>
        </Form.Group>
    );
};

export default SelectQuarter;
