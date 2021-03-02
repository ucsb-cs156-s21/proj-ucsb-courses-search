import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import SelectSubject from "./SelectSubject";
import useSWR from "swr";
import { useToasts } from "react-toast-notifications";
import { allTheSubjects } from "main/fixtures/Courses/subjectFixtures";
import { fetchSubjectAreas } from "main/services/subjectAreaService";

const BasicCourseSearchForm = ({ setCourseJSON, fetchJSON, parentCallback}) => {
    const firstDepartment = allTheSubjects[0].subjectCode;
    const [quarter, setQuarter] = useState("20212");
    const [subject, setSubject] = useState(firstDepartment);
    const [level, setLevel] = useState("U");
    const { addToast } = useToasts();
    const [errorNotified, setErrorNotified] = useState(false);
    //Checkbox
    const [cancelled, setCancelledChecked] = useState(false);
    const [closed, setClosedChecked] = useState(false);
    const [full, setFullChecked] = useState(false);
    //Checkbox

    const { data: subjects, error: errorGettingSubjects } = useSWR(
        "/api/public/subjects",
        fetchSubjectAreas,
        {
            initialData: allTheSubjects,
            revalidateOnMount: true
        }
    );

    useEffect(
        () => {
            if (!errorNotified && errorGettingSubjects) {
              addToast(`${errorGettingSubjects}`, { appearance: "error" });
              setErrorNotified(true);
            }
        },
        [errorGettingSubjects, errorNotified, addToast]
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchJSON(event, { quarter, subject, level }).then((courseJSON) => {
            setCourseJSON(courseJSON);
        });
        console.log("In Search");
        console.log(cancelled);
        console.log(closed);
        console.log(full);
        parentCallback(cancelled,closed,full);
    };

    const handleQuarterOnChange = (event) => {
        setQuarter(event.target.value);
    };

    const handleLevelOnChange = (event) => {
        setLevel(event.target.value);
    };
 
    //Checkbox
    const handleCancelledOnChange = (event) => {
        console.log("In cancelled");
        setCancelledChecked(!cancelled);
        console.log(cancelled);
    };

    const handleClosedOnChange = (event) => {
        console.log("In closed");
        setClosedChecked(!closed);
        console.log(closed);
    };

    const handleFullOnChange = (event) => {
        console.log("In full");
        setFullChecked(!full);
        console.log(full);
    };
    //Checkbox

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="BasicSearch.Quarter">
                <Form.Label>Quarter</Form.Label>
                <Form.Control as="select" onChange={handleQuarterOnChange} value={quarter} data-testid="select-quarter" >
                    <option value="20212">S21</option>
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                </Form.Control>
            </Form.Group>
            <SelectSubject subjects={subjects} subject={subject} setSubject={setSubject} />
            <Form.Group controlId="BasicSearch.CourseLevel">
                <Form.Label>Course Level</Form.Label>
                <Form.Control as="select" onChange={handleLevelOnChange} value={level}>
                    <option value="L">Undergrad-Lower Division</option>
                    <option value="S">Undergrad-Upper Division</option>
                    <option value="U">Undergrad-All</option>
                    <option value="G">Graduate</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="BasicSearch.Hide">
                <Form.Check type="checkbox" label="Cancelled" value={cancelled} onChange={handleCancelledOnChange} id={`inline-checkbox-1`}/>
                <Form.Check type="checkbox"  label="Closed" value={closed} onChange={handleClosedOnChange} id={`inline-checkbox-2`}/>
                <Form.Check type="checkbox" label="Full" value={full} onChange={handleFullOnChange} id={`inline-checkbox-3`}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default BasicCourseSearchForm;
