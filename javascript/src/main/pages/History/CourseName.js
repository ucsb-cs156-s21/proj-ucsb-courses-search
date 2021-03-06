import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";
import CourseSearchCourseStartEndQtr from "main/components/BasicCourseSearch/CourseSearchCourseStartEndQtr";
import { fetchCourseHistoryNameQtrJSON } from "main/services/courseSearches";
//import { CSVLink } from "react-csv";
import BasicCourseCSV from "main/components/BasicCourseSearch/BasicCourseCSV";
//import { Button } from "react-bootstrap";

const CourseName = () => {
    const initialCourseJSON = {
        "pageNumber": 1,
        "pageSize": 1,
        "total": 0,
        "classes": []
    };

    const [courseJSON, setCourseJSON] = useState(initialCourseJSON);

    // courseId, title, sectionNumber, instructor, enroll code, units, total enrolled students, max enrolled

    return (
        <Jumbotron>
            <div className="text-left">
                <h2>Search Archived Course Data from MongoDB</h2>
                <h5>Search By Course Name Through Various Quarters</h5>
                <CourseSearchCourseStartEndQtr setCourseJSON={setCourseJSON} fetchJSON={fetchCourseHistoryNameQtrJSON} />
                <BasicCourseCSV classes={courseJSON.classes} />
                <BasicCourseTable classes={courseJSON.classes} />
            </div>
        </Jumbotron>
    ); 
};

export default CourseName;
