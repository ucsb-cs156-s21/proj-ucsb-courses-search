import React from "react";
import { useState } from "react";
import { Jumbotron, Container } from "react-bootstrap";
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
            </Container>
            <ClassSizeForm setClassSizeJSON={setJsonTableData} fetchClassSize={fetchClassSize}/>
            {tableVisibility && (data.length ? <ClassSizeTable data={data} /> : "There are no results!")}
        </Jumbotron>       

    );
};

export default ClassSize;