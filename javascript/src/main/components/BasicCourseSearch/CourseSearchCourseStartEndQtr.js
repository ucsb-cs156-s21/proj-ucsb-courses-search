import React, { useState } from "react";
import { Form, Button} from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import SelectSubject from "./SelectSubject";
import { allTheSubjects } from "main/fixtures/Courses/subjectFixtures";
import { fetchSubjectAreas } from "main/services/subjectAreaService";
import useSWR from "swr";


const CourseSearchCourseStartEndQtr = ({ setCourseJSON, fetchJSON }) => {
    const [startQuarter, setStartQuarter] = useState("20212");
    const [endQuarter, setEndQuarter] = useState("20212");
    const [subject, setSubject] = useState("CMPSC   ");
    const [courseNumber, setCourseNumber] = useState("");
    const [courseSuf, setCourseSuf] = useState("");
    const { addToast } = useToasts()

    const { data: subjects, error: errorGettingSubjects } = useSWR(
		"/api/public/subjects",
		fetchSubjectAreas,
		{
			initialData: allTheSubjects,
			revalidateOnMount: true,
		}
	);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchJSON(event, { startQuarter, endQuarter, subject, courseNumber, courseSuf}).then((courseJSON) => {
            if(courseJSON.total === 0){
                addToast("There are no courses that match the requested criteria.", { appearance: "error" });
            }
            setCourseJSON(courseJSON);
        });
    };

    const handleStartQuarterOnChange = (event) => {
        setStartQuarter(event.target.value);
    };

    const handleEndQuarterOnChange = (event) => {
        setEndQuarter(event.target.value);
    };

    const handleSubjectOnChange = (subject) => {
        setSubject(subject);
    };

    const handleCourseNumberOnChange = (event) => {
        const rawCourse = event.target.value;
        if (rawCourse.match(/\d+/g) != null) {
            const number = rawCourse.match(/\d+/g)[0];
            setCourseNumber(number);
        } else {
            setCourseNumber("");
        }
        
        if (rawCourse.match(/[a-zA-Z]+/g) != null) {
            const suffix = rawCourse.match(/[a-zA-Z]+/g)[0];
            setCourseSuf(suffix);
        } else {
            setCourseSuf("");
        }
    };

    // Note: Not all possible courses were able to be added in the subject area list as many of
    // the subject areas from the database (as well as GOLD) provided no information, almost as if the classes never existed
    // One example is Zoology
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="CourseNameSearch.StartQuarter">
                <Form.Label>Start Quarter</Form.Label>
                <Form.Control as="select" onChange={handleStartQuarterOnChange} value={startQuarter}  >
                    <option value="20212">S21</option>
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                    <option value="20203">M20</option>
                    <option value="20202">S20</option>
                    <option value="20201">W20</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="CourseNameSearch.EndQuarter">
                <Form.Label>End Quarter</Form.Label>
                <Form.Control as="select" onChange={handleEndQuarterOnChange} value={endQuarter}  >
                    <option value="20212">S21</option>
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                    <option value="20203">M20</option>
                    <option value="20202">S20</option>
                    <option value="20201">W20</option>
                </Form.Control>
            </Form.Group>
            <SelectSubject
				subjects={subjects}
				subject={subject}
				setSubject={handleSubjectOnChange}
			/>
            <Form.Group controlId="CourseNameSearch.CourseNumber">
                <Form.Label>Course Number (Try searching '16' or '130A')</Form.Label>
                <Form.Control onChange={handleCourseNumberOnChange} defaultValue={courseNumber} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default CourseSearchCourseStartEndQtr;