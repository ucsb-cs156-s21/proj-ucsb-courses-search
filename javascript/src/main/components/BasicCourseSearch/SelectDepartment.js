import React, { useState } from "react";
import { Form } from "react-bootstrap";

const SelectDepartment = ( {departments} ) => {

    console.log("departments=",departments);
    const [department, setDepartment] = useState("CMPSC");

    const handleDepartmentOnChange = (event) => {
        setDepartment(event.target.value);
    };

    return (
            <Form.Group controlId="BasicSearch.Department">
                <Form.Label>Department</Form.Label>
                <Form.Control as="select" onChange={handleDepartmentOnChange} value={department}>
                    {departments.map(function(object, i){
        return <option key={i}>{object.deptCode}</option>;
    })}
                </Form.Control>
            </Form.Group>
    );
};

export default SelectDepartment;
