import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { fetchFullCourses } from "main/services/statisticsService";
import FullCoursesForm from "main/components/Statistics/FullCoursesForm";
import FullCourseTable from "main/components/Statistics/FullCourseTable";

const NumFullCoursesByDept = () => {
    const [tableVisibility, setTableVisibility] = useState(false);
    const [tableData, setTableData] = useState([]);

    const setJsonTableData = (json) => {
        let newArray = json.map((item, index) => ({index, ...item}));
        for (var i = 0; i < newArray.length; i++) {
            newArray[i].index++;
          }
        setTableData(newArray);
        setTableVisibility(true);
    }
    return (
        <Jumbotron>
            <div className="text-left">
                <h5>Search Full Courses By Department</h5>
                <FullCoursesForm setCourseJSON={setJsonTableData} fetchJSON={fetchFullCourses} />
            </div>
            {tableVisibility && (<FullCourseTable data={tableData} />)}
        </Jumbotron>
    );
};

export default NumFullCoursesByDept;