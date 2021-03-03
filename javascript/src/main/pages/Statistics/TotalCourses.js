import React from "react";
import { useState } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { fetchTotalCoursesByDept } from "main/services/statisticsService";
import TotalCoursesTable from "main/components/Statistics/TotalCoursesTable";
import TotalCoursesForm from "main/components/Statistics/TotalCoursesForm";


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
            <Container className="text-left">
                <h1>Total Courses by Department</h1>
                <TotalCoursesForm setTotalCoursesJSON={setJsonTableData} fetchTotalCoursesByDept={fetchTotalCoursesByDept}/>
            </Container>
            <Container style={{ marginTop: "20px" }} className={"text-center"}>
                {tableVisibility && (data.length ? <TotalCoursesTable data={data} /> : "There are no results!")}
            </Container>
        </Jumbotron>

    );
};

export default TotalCourses;