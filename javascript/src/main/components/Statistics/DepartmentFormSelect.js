import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
// hard coded depts from mongodb
// can be dynamically fetched!
const depts = [
    "ANTH ",
    "ART  ",
    "ARTHI",
    "ARTST",
    "ASAM ",
    "BLKST",
    "BMSE ",
    "CHEM ",
    "CHST ",
    "CLASS",
    "CLIT ",
    "CMPSC",
    "CNCSP",
    "CNENG",
    "COMM ",
    "CRSTU",
    "EALCS",
    "ECE  ",
    "ECON ",
    "EDUC ",
    "EEMB ",
    "ENGL ",
    "ENGSC",
    "ENVST",
    "ERTSC",
    "ESM  ",
    "ESS  ",
    "FEMST",
    "FLMST",
    "FR&IT",
    "GEOG ",
    "GERSL",
    "GLOBL",
    "GRDIV",
    "HIST ",
    "INT  ",
    "L&S  ",
    "LAIS ",
    "LAWSO",
    "LING ",
    "MARSC",
    "MAT  ",
    "MATH ",
    "MATRL",
    "MCDB ",
    "MDVST",
    "ME   ",
    "MILSC",
    "MUSIC",
    "PHIL ",
    "PHYS ",
    "POLS ",
    "PSY  ",
    "RELST",
    "RENST",
    "SOC  ",
    "SP&PT",
    "SPCH ",
    "STATS",
    "THTDA",
    "TMP  ",
    "WMST ",
    "WRIT "
];

const DepartmentFormSelect = ({ handleSelect, value }) => {
    const handleChange = (event) => {
        handleSelect(event.target.value);
    };

    return (
        <Form.Control as="select" onChange={handleChange} value={value} data-testid="select-department">
            {
                depts.map((dept, index) => {
                    return (<option key={index} value={dept.padEnd(5)}>{dept}</option>);
                })
            }
        </Form.Control>
    );
};

export default DepartmentFormSelect;

