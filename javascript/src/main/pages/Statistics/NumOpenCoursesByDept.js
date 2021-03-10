import React from "react";
import { useState } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { fetchOpenCoursesByDept } from "main/services/statisticsService";
import OpenCoursesForm from "main/components/Statistics/OpenCoursesForm";
import OpenCoursesTable from "main/components/Statistics/OpenCoursesTable";
import { fromFormat } from "main/components/Statistics/QuarterFormSelect";

const NumOpenCoursesByDept = () => {
    const [tableVisibility, setTableVisibility] = useState(false);
    const [tableData, setTableData] = useState([]);

    const setJsonTableData = (json) => {
        let newArray = json.map((item, index) => ({index, ...item}));
        for (var i = 0; i < newArray.length; i++) {
            newArray[i].index++;
        }
        newArray.forEach((item) => {
            item["quarter"] = fromFormat(item["quarter"]);
        });
        setTableData(newArray);
        setTableVisibility(true);
    }
    return (
        <Jumbotron>
            <Container className="text-left">
                <h1>Open Courses By Department</h1>
                <OpenCoursesForm setCourseJSON={setJsonTableData} fetchJSON={fetchOpenCoursesByDept} onSubmit={() => { setTableVisibility(false) }} />
            </Container>
            <Container style={{ marginTop: "20px" }} className={"text-center"}>
                {tableVisibility && (tableData.length ? <OpenCoursesTable data={tableData} /> : "There are no results!")}
            </Container>
        </Jumbotron>
    );
};

export default NumOpenCoursesByDept;