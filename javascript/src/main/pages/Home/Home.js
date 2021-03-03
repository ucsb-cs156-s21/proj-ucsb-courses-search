import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import BasicCourseSearchForm from "main/components/BasicCourseSearch/BasicCourseSearchForm";
import JSONPrettyCard from "main/components/Utilities/JSONPrettyCard";
import { fetchBasicCourseJSON } from "main/services/courseSearches";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";
import { CSVLink } from "react-csv";
import { Button } from "react-bootstrap";


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
    const courseHeaders = [
        { label: "courseId", key: "courseId" },
        { label: "title", key: "title" },
        { label: "units", key: "unitsFixed" }
    ]
    return (
        <Jumbotron>
            <div className="text-left">
                <h5>Welcome to the UCSB Courses Search App!</h5>
                <BasicCourseSearchForm setCourseJSON={setCourseJSON} fetchJSON={fetchBasicCourseJSON} />
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
                <JSONPrettyCard
                    expression={"courseJSON"}
                    value={courseJSON}
                />
            </div>
        </Jumbotron>
    );
};

export default Home;
