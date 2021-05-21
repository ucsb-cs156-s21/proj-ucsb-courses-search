import React from "react";
import { useState } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { fetchSingleCourseSearch } from "main/services/statisticsService";
import SingleCourseSectionForm from "main/components/Statistics/SingleCourseSectionForm";
import SingleCourseSectionTable from "main/components/Statistics/SingleCourseSectionTable";
import { fromFormat } from "main/components/Statistics/QuarterFormSelect";

const SingleCourseSearch = () => {
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
                <h1>Single Course Summary</h1>
                <SingleCourseSectionForm setCourseJSON={setJsonTableData} fetchJSON={fetchSingleCourseSearch} onSubmit={() => { setTableVisibility(false) }} />
            </Container>
            <Container style={{ marginTop: "20px" }} className={"text-center"}>
                {tableVisibility && (tableData.length ? <SingleCourseSectionTable data={tableData} /> : "There are no results!")}
            </Container>
        </Jumbotron>
    );
};

export default SingleCourseSearch;