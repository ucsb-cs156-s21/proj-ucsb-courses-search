import React from "react";
import { useState } from "react";
import { Jumbotron, Container, Spinner } from "react-bootstrap";
import { fetchCourseOccupancy } from "main/services/statisticsService";
import CourseOccupancyForm from "main/components/Statistics/CourseOccupancyForm";
import CourseOccupancyTable from "main/components/Statistics/CourseOccupancyTable";
import { fromFormat } from "main/components/Statistics/QuarterFormSelect";
import Loading from "main/components/Loading/Loading";

const calcPercent = (first, second) => {
    first = parseInt(first);
    second = parseInt(second);

    return (first / second * 100).toFixed(0);
};

const CourseOccupancy = () => {
    const [tableVisibility, setTableVisibility] = useState(false);
    const [tableData, setTableData] = useState([]);

    const setJsonTableData = (json) => {
        json.forEach((item) => {
            item["quarter"] = fromFormat(item["quarter"]);
            item["occupancy"] = calcPercent(item["enrolled"], item["maxEnrolled"]);
        });
        setTableData(json);
        setTableVisibility(true);
    }

    return (
        <Jumbotron>
            <Container className="text-left">
                <h1>Course Occupancy by Department</h1>
                <CourseOccupancyForm setOccupancyJson={setJsonTableData} fetchJSON={fetchCourseOccupancy} onSubmit={() => { setTableVisibility(false) }}/>
            </Container>
            <Container style={{ marginTop: "20px" }} className={"text-left"}>
                {tableVisibility && (<CourseOccupancyTable data={tableData} />)}
            </Container>
        </Jumbotron>
    );
};

export default CourseOccupancy;
