import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { fetchCourseOccupancy } from "main/services/statisticsService";
import CourseOccupancyForm from "main/components/Statistics/CourseOccupancyForm";
import CourseOccupancyTable from "main/components/Statistics/CourseOccupancyTable";

const CourseOccupancy = () => {
    const [tableVisibility, setTableVisibility] = useState(false);
    const [tableData, setTableData] = useState([]);

    const setJsonTableData = (json) => {
        setTableData(json);
        setTableVisibility(true);
    }

    return (
        <Jumbotron>
            <div className="text-left">
                <h5>Course Occupancy by Department</h5>
                <CourseOccupancyForm setOccupancyJson={setJsonTableData} fetchJSON={fetchCourseOccupancy} />
            </div>
            {tableVisibility ? (<CourseOccupancyTable data={tableData} />) : (<div>No</div>)}
        </Jumbotron>
    );
};

export default CourseOccupancy;
