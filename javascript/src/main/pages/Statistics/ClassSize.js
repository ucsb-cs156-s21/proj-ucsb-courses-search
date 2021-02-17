import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { fetchClassSize } from "main/services/statisticsService";
import ClassSizeTable from "main/components/Statistics/ClassSizeTable";
import ClassSizeForm from "main/components/Statistics/ClassSizeForm";


const ClassSize = () => {
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
                <h1>Average Class Size By Department</h1>
                <CourseOccupancyForm setOccupancyJson={setJsonTableData} fetchJSON={fetchCourseOccupancy} onSubmit={() => { setTableVisibility(false) }}/>
            </Container>
            <Container style={{ marginTop: "20px" }} className={"text-center"}>
                {tableVisibility && (tableData.length ? <CourseOccupancyTable data={tableData} /> : "There are no results!")}
            </Container>
            <ClassSizeForm setClassSizeJSON={setJsonTableData} fetchClassSize={fetchClassSize}/>
            {tableVisibility && (data.length ? <ClassSizeTable data={data} /> : "There are no results!")}
        </Jumbotron>       

    );
};

export default ClassSize;