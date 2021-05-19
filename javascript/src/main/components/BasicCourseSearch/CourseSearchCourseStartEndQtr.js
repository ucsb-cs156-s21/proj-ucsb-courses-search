import React, { useState } from "react";
import { Form, Button} from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { quarterRange } from "main/utils/quarterUtilities";
import SelectQuarter from "main/components/BasicCourseSearch/SelectQuarter";

const CourseSearchCourseStartEndQtr = ({ setCourseJSON, fetchJSON }) => {
    const quarters = quarterRange("20084", "20213");
    const [startQuarter, setStartQuarter] = useState(quarters[0].qqqqy);
    const [endQuarter, setEndQuarter] = useState(quarters[0].qqqqy);
    const [subjectArea, setSubjectArea] = useState("CMPSC   ");
    const [courseNumber, setCourseNumber] = useState("");
    const [courseSuf, setCourseSuf] = useState("");
    const { addToast } = useToasts()

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchJSON(event, { startQuarter, endQuarter, subjectArea, courseNumber, courseSuf}).then((courseJSON) => {
            if(courseJSON.total === 0){
                addToast("There are no courses that match the requested criteria.", { appearance: "error" });
            }
            setCourseJSON(courseJSON);
        });
    };

    const handleSubjectAreaOnChange = (event) => {
        setSubjectArea(event.target.value);
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
            <SelectQuarter
                quarters={quarters}
                quarter={startQuarter}
                setQuarter={setStartQuarter}
                controlId={"CourseNameSearch.StartQuarter"}
                label={"Start Quarter"}
            />

            <SelectQuarter
                quarters={quarters}
                quarter={endQuarter}
                setQuarter={setEndQuarter}
                controlId={"CourseNameSearch.EndQuarter"}
                label={"End Quarter"}
            />
            <Form.Group controlId="CourseNameSearch.SubjectArea">
                <Form.Label>Subject Area</Form.Label>
                <Form.Control as="select" onChange={handleSubjectAreaOnChange} value={subjectArea}>
                    <option value="ANTH    ">ANTH - Anthropology</option>
                    <option value="ART     ">ART - Art</option>
                    <option value="ART  CS ">ART - Art (Creative Studies)</option>
                    <option value="ARTHI   ">ARTHI - Art History</option>
                    <option value="ARTST   ">ARTST - Art Studio</option>
                    <option value="AS AM   ">AS AM - Asian American Studies</option>
                    <option value="ASTRO   ">ASTRO - Astronomy</option>
                    <option value="BIOL    ">BIOL - Biology</option>
                    <option value="BIOL CS ">BIOL - Biology (Creative Studies)</option>
                    <option value="BMSE    ">BMSE - Biomolecular Science and Engineering</option>
                    <option value="BL ST   ">BL ST - Black Studies</option>
                    <option value="CH E    ">CH E - Chemical Engineering</option>
                    <option value="CHEM    ">CHEM - Chemistry and Biochemistry</option>
                    <option value="CHEM CS ">CHEM - Chemistry and Biochemistry (Creative Studies)</option>
                    <option value="CH ST   ">CH ST - Chicano Studies</option>
                    <option value="CHIN    ">CHIN - Chinese</option>
                    <option value="CLASS   ">CLASS - Classics</option>
                    <option value="COMM    ">COMM - Communication</option>
                    <option value="C LIT   ">C LIT - Comparative Literature</option>
                    <option value="CMPSC   ">CMPSC - Computer Science</option>
                    <option value="CMPSCCS ">CMPSC - Computer Science (Creative Studies)</option>
                    <option value="CMPTGCS ">CMPTG - Computing (Creative Studies)</option>
                    <option value="CNCSP   ">CNCSP - Counseling, Clinical, School Psychology</option>
                    <option value="DANCE   ">DANCE - Dance</option>
                    <option value="DYNS    ">DYNS - Dynamical Neuroscience</option>
                    <option value="EARTH   ">EARTH - Earth Science</option>
                    <option value="EACS    ">EACS - East Asian Cultural Studies</option>
                    <option value="EEMB    ">EEMB - Ecology, Evolution, and Marine Biology</option>
                    <option value="ECON    ">ECON - Economics</option>
                    <option value="ED      ">ED - Education</option>
                    <option value="ECE     ">ECE - Electrical Computer Engineering</option>
                    <option value="ENGR    ">ENGR - Engineering Sciences</option>
                    <option value="ENGL    ">ENGL - English</option>
                    <option value="EDS     ">EDS - Environmental Data Science</option>
                    <option value="ESM     ">ESM - Environmental Science and Management</option>
                    <option value="ENV S   ">ENV S - Environmental Studies</option>
                    <option value="ESS     ">ESS - Exercise and Sport Studies</option>
                    <option value="ES   1- ">ES - Exercise Sport</option>
                    <option value="FEMST   ">FEMST - Feminist Studies</option>
                    <option value="FAMST   ">FAMST - Film and Media Studies</option>
                    <option value="FR      ">FR - French</option>
                    <option value="GEN SCS ">GEN S - General Studies (Creative Studies)</option>
                    <option value="GEOG    ">GEOG - Geography</option>
                    <option value="GER     ">GER - German</option>
                    <option value="GPS     ">GPS - Global Peace and Security</option>
                    <option value="GLOBL   ">GLOBL - Global Studies</option>
                    <option value="GRAD    ">GRAD - Graduate Division</option>
                    <option value="GREEK   ">GREEK - Greek</option>
                    <option value="HEB     ">HEB - Hebrew</option>
                    <option value="HIST    ">HIST - History</option>
                    <option value="INT     ">INT - Interdisciplinary</option>
                    <option value="INT  CS ">INT - Interdisciplinary (Creative Studies)</option>
                    <option value="ITAL    ">ITAL - Italian</option>
                    <option value="JAPAN   ">JAPAN - Japanese</option>
                    <option value="KOR     ">KOR - Korean</option>
                    <option value="LATIN   ">LATIN - Latin</option>
                    <option value="LAIS    ">LAIS - Latin American and Iberian Studies</option>
                    <option value="LING    ">LING - Linguistics</option>
                    <option value="LIT     ">LIT - Literature</option>
                    <option value="LIT  CS ">LIT - Literature (Creative Studies)</option>
                    <option value="MARSC   ">MARSC - Marine Science</option>
                    <option value="MATRL   ">MATRL - Materials</option>
                    <option value="MATH    ">MATH - Mathematics</option>
                    <option value="MATH CS ">MATH - Mathematics (Creative Studies)</option>
                    <option value="ME      ">ME - Mechanical Engineering</option>
                    <option value="MAT     ">MAT - Media Arts and Technology</option>
                    <option value="ME ST   ">ME ST - Midieval Studies</option>
                    <option value="MES     ">MES - Middle East Studies</option>
                    <option value="MS      ">MS - Military Science</option>
                    <option value="MCDB    ">MCDB - Molecular, Cellular and Develop. Biology</option>
                    <option value="MUS     ">MUS - Music</option>
                    <option value="MUS  CS ">MUS - Music (Creative Studies</option>
                    <option value="MUS A   ">MUS A - Music Performance Laboratories</option>
                    <option value="PHIL    ">PHIL - Philosophy</option>
                    <option value="PHYS    ">PHYS - Physics</option>
                    <option value="PHYS CS ">PHYS - Physics (Creative Studies)</option>
                    <option value="POL S   ">POL S - Political Science</option>
                    <option value="PORT    ">PORT - Portuguese</option>
                    <option value="PSY     ">PSY - Psychology</option>
                    <option value="RG ST   ">RG ST - Religious Studies</option>
                    <option value="RENST   ">RENST - Renaissance Studies</option>
                    <option value="RUSS    ">RUSS - Russian</option>
                    <option value="SLAV    ">SLAV - Slavic</option>
                    <option value="SOC     ">SOC - Sociology</option>
                    <option value="SPAN    ">SPAN - Spanish</option>
                    <option value="SHS     ">SHS - Speech and Hearing Sciences</option>
                    <option value="PSTAT   ">PSTAT - Statistics and Applied Probability</option>
                    <option value="TMP     ">TMP - Technology Management</option>
                    <option value="THTR    ">THTR - Theater</option>
                    <option value="WRIT    ">WRIT - Writing</option>
                    <option value="W%26L  CS ">W&L - Writing and Literature (Creative Studies)</option>
                </Form.Control>
            </Form.Group>
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