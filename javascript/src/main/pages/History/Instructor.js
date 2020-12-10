import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";

import CourseSearchFormQtrDeptOnly from "main/components/BasicCourseSearch/CourseSearchFormQtrDeptOnly";
import CourseSearchFormInstructor from "main/components/BasicCourseSearch/CourseSearchFormInstructor";
import JSONPrettyCard from "main/components/Utilities/JSONPrettyCard";
<<<<<<< HEAD
import {  fetchBasicCourseHistoryJSON } from "main/services/courseSearches";
import {  fetchInstructorHistoryNameQtrJSON } from "main/services/courseSearches";
//import { fetch}
=======
//import {  fetchBasicCourseHistoryJSON } from "main/services/courseSearches";
//import {  fetchInstructorCourseHistoryJSON } from "main/services/courseSearches";
import {fetchInstructorHistoryNameQtrJSON} from "main/services/courseSearches";
>>>>>>> ap adding front-end test files

const Instructor = () => {

    // every function that starts with "use" is a hook
    // e.g. useState, useSWR, useAuth0

    // courseJSON is the variable for the state
    // setCourseJSON is the setter
    // the parameter to useState is the initial value of the state

    const [courseJSON, setCourseJSON] = useState('{"course" : "cs148"}');

    // const courseJSON = '{"course" : "cs156"}';
    //<CourseSearchFormQtrDeptOnly setCourseJSON={setCourseJSON} fetchJSON={fetchBasicCourseHistoryJSON} />
    return (
        <Jumbotron>
            <div className="text-left">
                <h5>Search Archived Course Data from MongoDB</h5>
                <CourseSearchFormInstructor setCourseJSON={setCourseJSON} fetchJSON={fetchInstructorHistoryNameQtrJSON} />
                <JSONPrettyCard
                    expression={"courseJSON"}
                    value={courseJSON}
                />
            </div>
        </Jumbotron>
    );
};

export default Instructor;