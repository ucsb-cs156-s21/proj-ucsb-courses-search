import React from "react";
import { Form } from "react-bootstrap";
import { compareValues } from "main/utils/sortHelper"

const SelectSubjectArea = ({ subjects, subject, setSubject}) => {

    const handleSubjectOnChange = (event) => {
        setSubject(event.target.value);
    };

    subjects.sort(compareValues("subjectCode"));

    return (
        <Form.Group controlId="BasicSearch.Subject">
            <Form.Label>Subject Area</Form.Label>
            <Form.Control as="select" onChange={handleSubjectOnChange} value={subject}>
                {subjects.map(function (object, i) {
                    return <option key={i} value={object.subjectCode}>{object.subjectCode} - {object.subjectTranslation}</option>;
                })}
            </Form.Control>
        </Form.Group>
    );
};

export default SelectSubjectArea;
