import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { fetchFullCourses } from "main/services/statisticsService";
import JSONPrettyCard from "main/components/Utilities/JSONPrettyCard";
import FullCoursesForm from "main/components/Statistics/FullCoursesForm";

const NumFullCoursesByDept = () => {
    const [courseJSON, setCourseJSON] = useState('{"course" : "cs156"}');

    return (
        <Jumbotron> 
        <div className="text-left">
            <h5>Search Archived Course Data from MongoDB by Full Courses</h5>
            <FullCoursesForm setCourseJSON={setCourseJSON} fetchJSON={fetchFullCourses} />
            <JSONPrettyCard
                expression={"courseJSON"}
                value={courseJSON}
            />
        </div>
    </Jumbotron>
    );
};

export default NumFullCoursesByDept;