import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";
import CourseSearchFormInstructor from "main/components/BasicCourseSearch/CourseSearchFormInstructor";
import {  fetchInstructorHistoryNameQtrJSON } from "main/services/courseSearches";
import CourseFilters from "main/components/BasicCourseSearch/CourseFilters";
<<<<<<< HEAD

=======
 
>>>>>>> main
const Instructor = () => {

    const initialCourseJSON = {
        "pageNumber": 1,
        "pageSize": 1,
        "total": 0,
        "classes": []
    };

    const [courseJSON, setCourseJSON] = useState(initialCourseJSON);

<<<<<<< HEAD

=======
    //Check for closed, cancelled, full status
>>>>>>> main
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
                <h5>Search Instructor Through Various Quarters</h5>
                <CourseSearchFormInstructor setCourseJSON={setCourseJSON} fetchJSON={fetchInstructorHistoryNameQtrJSON} />
<<<<<<< HEAD

                <CourseFilters cancelled={cancelled} handleCancelledOnChange={handleCancelledOnChange} closed={closed} handleClosedOnChange={handleClosedOnChange} full={full} handleFullOnChange={handleFullOnChange}/>
                
                <BasicCourseTable classes={courseJSON.classes} checks={[cancelled,closed,full]} displayQuarter allowExport={true}/>
                
=======
                <CourseFilters cancelled={cancelled} handleCancelledOnChange={handleCancelledOnChange} closed={closed} handleClosedOnChange={handleClosedOnChange} full={full} handleFullOnChange={handleFullOnChange}/>
                <BasicCourseTable classes={courseJSON.classes} checks={[cancelled,closed,full]}/>
>>>>>>> main
            </div>
        </Jumbotron>
    );
};

export default Instructor;