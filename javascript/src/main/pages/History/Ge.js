import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";
import GeCourseSearchForm from "main/components/BasicCourseSearch/GeCourseSearchForm";
import {  fetchGeQtrJSON } from "main/services/courseSearches";
import CourseFilters from "main/components/BasicCourseSearch/CourseFilters";
 
const Ge = () => {

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

    //const [courseJSON, setCourseJSON] = useState('{"course" : "cs148"}');
    // const courseJSON = '{"course" : "cs156"}';
    const [courseJSON, setCourseJSON] = useState(initialCourseJSON);

    //Check for closed, cancelled, full status
    const [cancelled, setCancelledChecked] = useState(false);
    const [closed, setClosedChecked] = useState(false);
    const [full, setFullChecked] = useState(false); 

    const handleCancelledOnChange = () => {
        setCancelledChecked(!cancelled);
    };
    const handleClosedOnChange = () => {
        setClosedChecked(!closed);
    };
    const handleFullOnChange = () => {
        setFullChecked(!full);
    };

    return (
        <Jumbotron>
            <div className="text-left">
                <h2>Search Archived Course Data from MongoDB</h2>
                <h5>Search GE Through Various Quarters</h5>
                <GeCourseSearchForm setCourseJSON={setCourseJSON} fetchJSON={fetchGeQtrJSON} />
                <CourseFilters cancelled={cancelled} handleCancelledOnChange={handleCancelledOnChange} closed={closed} handleClosedOnChange={handleClosedOnChange} full={full} handleFullOnChange={handleFullOnChange}/>
                <BasicCourseTable classes={courseJSON.classes} checks={[cancelled,closed,full]}/>
            </div>
        </Jumbotron>
    );
};

export default Ge;

// This component displays the raw JSON returned from the API fetch, the BasicCourseTable instead displays it in a table
// <JSONPrettyCard
//     expression={"courseJSON"}
//     value={courseJSON}
// /> 