import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";
import CourseSearchFormInstructor from "main/components/BasicCourseSearch/CourseSearchFormInstructor";
import {  fetchInstructorHistoryNameQtrJSON } from "main/services/courseSearches";
import BasicCourseCheckbox from "main/components/BasicCourseSearch/BasicCourseCheckbox";


const Instructor = () => {

    const initialCourseJSON = {
        "pageNumber": 1,
        "pageSize": 1,
        "total": 0,
        "classes": []
    };

    const [courseJSON, setCourseJSON] = useState(initialCourseJSON);

    //Checkbox
    const [cancelled, setCancelledChecked] = useState(false);
    const [closed, setClosedChecked] = useState(false);
    const [full, setFullChecked] = useState(false); 
    var callbackFunction = (Cancelled,Closed,Full) => {
        setCancelledChecked(Cancelled);
        setClosedChecked(Closed);
        setFullChecked(Full);
    };
    //Checkbox

    return (
        <Jumbotron>
            <div className="text-left">
                <h2>Search Archived Course Data from MongoDB</h2>
                <h5>Search Instructor Through Various Quarters</h5>
                <CourseSearchFormInstructor setCourseJSON={setCourseJSON} fetchJSON={fetchInstructorHistoryNameQtrJSON} parentCallback={callbackFunction}/>
                <BasicCourseTable classes={courseJSON.classes} checks={[cancelled,closed,full]}/>
                
            </div>
        </Jumbotron>
    );
};

export default Instructor;