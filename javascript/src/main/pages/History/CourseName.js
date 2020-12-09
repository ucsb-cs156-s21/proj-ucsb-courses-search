import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";
import CourseSearchCourseStartEndQtr from "main/components/BasicCourseSearch/CourseSearchCourseStartEndQtr";
import JSONPrettyCard from "main/components/Utilities/JSONPrettyCard";
import {  fetchCourseHistoryNameQtrJSON } from "main/services/courseSearches";

const CourseName = () => {

    // every function that starts with "use" is a hook
    // e.g. useState, useSWR, useAuth0

    // courseJSON is the variable for the state
    // setCourseJSON is the setter
    // the parameter to useState is the initial value of the state
    const initialCourseJSON = {
        "pageNumber": 1,
        "pageSize": 1,
        "total": 0,
        "classes": []
    };

    const [courseJSON, setCourseJSON] = useState(initialCourseJSON);

    return (
        <Jumbotron>
            <div className="text-left">
                <h2>Search Archived Course Data from MongoDB</h2>
                <h5>Search By Course Name Through Various Quarters</h5>
                <CourseSearchCourseStartEndQtr setCourseJSON={setCourseJSON} fetchJSON={fetchCourseHistoryNameQtrJSON} />
                <BasicCourseTable classes={courseJSON.classes} />
                
            </div>
        </Jumbotron>
    ); 
};

export default CourseName;

// This component displays the raw JSON returned from the API fetch, the BasicCourseTable instead displays it in a pretty fashion
// <JSONPrettyCard
//     expression={"courseJSON"}
//     value={courseJSON}
// />