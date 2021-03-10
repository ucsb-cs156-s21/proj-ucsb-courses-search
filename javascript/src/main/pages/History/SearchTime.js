import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";
import CourseSearchFormDayTime from "main/components/BasicCourseSearch/CourseSearchFormDayTime";
import {  fetchInstructorHistoryNameQtrJSON } from "main/services/courseSearches";

const SearchTime = () => {
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
                <h5>Search Courses Based on Desired Times</h5>
                <CourseSearchFormDayTime setCourseJSON={setCourseJSON} fetchJSON={fetchInstructorHistoryNameQtrJSON} />
                <BasicCourseTable classes={courseJSON.classes} />
                
            </div>
        </Jumbotron>
    );
};

export default SearchTime;