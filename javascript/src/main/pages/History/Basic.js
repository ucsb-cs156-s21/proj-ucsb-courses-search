import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import CourseSearchFormQtrDeptOnly from "main/components/BasicCourseSearch/CourseSearchFormQtrDeptOnly";
import {  fetchBasicCourseHistoryJSON } from "main/services/courseSearches";
import TableLegend from "main/components/BasicCourseSearch/TableLegend"; 
import CourseFilters from "main/components/BasicCourseSearch/CourseFilters";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";

const Basic = () => {

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

    // const courseJSON = '{"course" : "cs156"}';
    return (
        <Jumbotron>
            <div className="text-left">
                <h2>Search Archived Course Data</h2>
                <p>Data on this page is accurate for past quarters, but may be 
                    incomplete or out of date for current and future quarters.
                    Course information is not immediately updated.</p>
                <CourseSearchFormQtrDeptOnly setCourseJSON={setCourseJSON} fetchJSON={fetchBasicCourseHistoryJSON} />

                <TableLegend legend />
                <CourseFilters cancelled={cancelled} handleCancelledOnChange={handleCancelledOnChange} closed={closed} handleClosedOnChange={handleClosedOnChange} full={full} handleFullOnChange={handleFullOnChange}/>
                <BasicCourseTable classes={courseJSON.classes} checks={[cancelled,closed,full]} allowExport = {true}/>
            </div>
        </Jumbotron>
    );
};

export default Basic;
