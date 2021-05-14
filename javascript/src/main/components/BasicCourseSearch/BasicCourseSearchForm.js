import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import SelectSubject from "./SelectSubject";
import useSWR from "swr";
import { useToasts } from "react-toast-notifications";
import { allTheSubjects } from "main/fixtures/Courses/subjectFixtures";
import { fetchSubjectAreas } from "main/services/subjectAreaService";

const BasicCourseSearchForm = ({ setCourseJSON, fetchJSON }) => {
    const firstDepartment = allTheSubjects[0].subjectCode;
    const localStorageQuarter = localStorage.getItem("BasicSearch.Quarter");
    const localStorageSubject = localStorage.getItem("BasicSearch.Subject");
    const localStorageLevel = localStorage.getItem("BasicSearch.Level");
    const [quarter, setQuarter] = useState(localStorageQuarter || "20212");
    const [subject, setSubject] = useState(localStorageSubject || firstDepartment);
    const [level, setLevel] = useState(localStorageLevel || "U");
    const { addToast } = useToasts();
    const [errorNotified, setErrorNotified] = useState(false);

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
            if(courseJSON.total === 0){
                addToast("There are no courses that match the requested criteria.", { appearance: "error" });
            }
            setCourseJSON(courseJSON);
        });
    };

    const handleQuarterOnChange = (event) => {
        localStorage.setItem("BasicSearch.Quarter", event.target.value);
        setQuarter(event.target.value);  
    };

    const handleLevelOnChange = (event) => {
        localStorage.setItem("BasicSearch.Level",event.target.value);
        setLevel(event.target.value);

    };
    
    const handleSubjectOnChange = (subject) => {
        localStorage.setItem("BasicSearch.Subject",subject);
        setSubject(subject);
    }

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
            <SelectSubject subjects={subjects} subject={subject} setSubject={handleSubjectOnChange} />
            <Form.Group controlId="BasicSearch.CourseLevel">
                <Form.Label>Course Level</Form.Label>
                <Form.Control as="select" onChange={handleLevelOnChange} value={level}>
                    <option value="L">Undergrad-Lower Division</option>
                    <option value="S">Undergrad-Upper Division</option>
                    <option value="U">Undergrad-All</option>
                    <option value="G">Graduate</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default BasicCourseSearchForm;
