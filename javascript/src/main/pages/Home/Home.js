import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import BasicCourseSearchForm from "main/components/BasicCourseSearch/BasicCourseSearchForm";
import JSONPrettyCard from "main/components/Utilities/JSONPrettyCard";
import { fetchBasicCourseJSON } from "main/services/courseSearches";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";

import TableLegend from "main/components/BasicCourseSearch/TableLegend"; 



import CourseFilters from "main/components/BasicCourseSearch/CourseFilters";
 

const Home = () => {

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

    // courseId, title, sectionNumber, instructor, enroll code, units, total enrolled students, max enrolled
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
                <h5>Welcome to the UCSB Courses Search App!</h5>

                <BasicCourseSearchForm className="searchForm" setCourseJSON={setCourseJSON} fetchJSON={fetchBasicCourseJSON} />

                <TableLegend legend />
                <CourseFilters cancelled={cancelled} handleCancelledOnChange={handleCancelledOnChange} closed={closed} handleClosedOnChange={handleClosedOnChange} full={full} handleFullOnChange={handleFullOnChange}/>
                <BasicCourseTable classes={courseJSON.classes} checks={[cancelled,closed,full]} allowExport = {true} />
                <JSONPrettyCard
                    expression={"courseJSON"}
                    value={courseJSON}
                />
            </div>
        </Jumbotron>
    );
};

export default Home;
