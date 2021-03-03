import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";
import CourseSearchFormInstructor from "main/components/BasicCourseSearch/CourseSearchFormInstructor";
import {  fetchInstructorHistoryNameQtrJSON } from "main/services/courseSearches";
import { CSVLink } from "react-csv";
import { Button } from "react-bootstrap";

const Instructor = () => {

    const initialCourseJSON = {
        "pageNumber": 1,
        "pageSize": 1,
        "total": 0,
        "classes": []
    };

    const [courseJSON, setCourseJSON] = useState(initialCourseJSON);


    const courseHeaders = [
        { label: "courseId", key: "courseId" },
        { label: "title", key: "title" },
        { label: "units", key: "unitsFixed" }
    ]

    return (
        <Jumbotron>
            <div className="text-left">
                <h2>Search Archived Course Data from MongoDB</h2>
                <h5>Search Instructor Through Various Quarters</h5>
                <CourseSearchFormInstructor setCourseJSON={setCourseJSON} fetchJSON={fetchInstructorHistoryNameQtrJSON} />

                <Button style={{margin: "1rem 0"}}>
                    <CSVLink    
                        style={{color: "white"}}
                        headers={courseHeaders} 
                        data={courseJSON.classes} 
                        filename = {"CourseTable.csv"}>
                        Download CSV
                    </CSVLink>
                </Button>
                
                <BasicCourseTable classes={courseJSON.classes} />
                
            </div>
        </Jumbotron>
    );
};

export default Instructor;