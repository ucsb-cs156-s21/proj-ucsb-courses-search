import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { fetchTotalCoursesByDept } from "main/services/statisticsService";
import TotalCoursesTable from "main/components/Statistics/TotalCoursesTable";
import TotalCoursesForm from "main/components/Statistics/TotalCoursesForm";
//import { fetchTotalCoursesByDept } from "../../services/statisticsService";


const TotalCourses = () => {
    const initialData = [];
    const [data, setData] = useState(initialData);
    const [tableVisibility, setTableVisibility] = useState(false);

    const setJsonTableData = (json) => {
        setData(json);
        setTableVisibility(true);
    }



    return (
        <Jumbotron>
            <TotalCoursesForm setTotalCoursesJSON={setJsonTableData} fetchTotalCoursesByDept={fetchTotalCoursesByDept}/>
            {tableVisibility && (data.length ? <TotalCoursesTable data={data} /> : "There are no results!")}
        </Jumbotron>

    );
};

export default TotalCourses;