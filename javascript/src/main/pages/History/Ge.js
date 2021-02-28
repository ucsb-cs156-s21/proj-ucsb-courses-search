import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";
import GeCourseSearchForm from "main/components/BasicCourseSearch/GeCourseSearchForm";
import {  fetchGeQtrJSON } from "main/services/courseSearches";
import { CSVLink } from "react-csv";
import { Button } from "react-bootstrap";

const Ge = () => {

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

    //const [courseJSON, setCourseJSON] = useState('{"course" : "cs148"}');
    // const courseJSON = '{"course" : "cs156"}';
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
                <h5>Search GE Through Various Quarters</h5>
                <GeCourseSearchForm setCourseJSON={setCourseJSON} fetchJSON={fetchGeQtrJSON} />
                <Button><CSVLink style={{color: "white"}} headers={courseHeaders} data={courseJSON.classes} filename = {"CourseTable.csv"}>Download CSV</CSVLink></Button>
                <BasicCourseTable classes={courseJSON.classes} />
            </div>
        </Jumbotron>
    );
};

export default Ge;

// This component displays the raw JSON returned from the API fetch, the BasicCourseTable instead displays it in a table
// <JSONPrettyCard
//     expression={"courseJSON"}
//     value={courseJSON}
// /> 