import React from "react";
import { useState } from "react";
import { Jumbotron, Container, Spinner  } from "react-bootstrap";
import { fetchFullCourses } from "main/services/statisticsService";
import FullCoursesForm from "main/components/Statistics/FullCoursesForm";
import FullCourseTable from "main/components/Statistics/FullCourseTable";
import { fromFormat } from "main/components/Statistics/QuarterFormSelect";
import Loading from "main/components/Loading/Loading";

const NumFullCoursesByDept = () => {
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
                <h1>Full Courses By Department</h1>
                <FullCoursesForm setCourseJSON={setJsonTableData} fetchJSON={fetchFullCourses} onSubmit={() => { setTableVisibility(false) }} />
            </Container>
            <Container style={{ marginTop: "20px" }} className={"text-center"}>
                {tableVisibility && (tableData.length ? <FullCourseTable data={tableData} /> : "There are no results!")}
            </Container>
        </Jumbotron>
    );
};

export default NumFullCoursesByDept;