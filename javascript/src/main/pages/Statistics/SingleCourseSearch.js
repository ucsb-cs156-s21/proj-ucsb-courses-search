import React from "react";
import { useState } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { fetchSingleCourseSearch } from "main/services/statisticsService";
import SingleCourseSectionForm from "main/components/Statistics/SingleCourseSectionForm";
import SingleCourseSectionTable from "main/components/Statistics/SingleCourseSectionTable";

const SingleCourseSearch = () => {
    const [tableVisibility, setTableVisibility] = useState(false);
    const [tableData] = useState([]);

    const setJsonTableData = (json) => {
        const keys = Object.keys(json);
        keys.forEach(function (item, index) {
            var temp = {"professor":item, "professorCount":json[item]}
            tableData[index] = temp;
        })

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