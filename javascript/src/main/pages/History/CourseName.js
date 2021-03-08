import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";
import CourseSearchCourseStartEndQtr from "main/components/BasicCourseSearch/CourseSearchCourseStartEndQtr";
import { fetchCourseHistoryNameQtrJSON } from "main/services/courseSearches";
import TableLegend from "main/components/BasicCourseSearch/TableLegend";


const CourseName = () => {
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
	            	<TableLegend legend />
                <BasicCourseTable classes={courseJSON.classes} displayQuarter/>

            </div>
        </Jumbotron>
    ); 
};

export default CourseName;
