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
            <ClassSizeForm setClassSizeJSON={setJsonTableData} fetchClassSize={fetchClassSize}/>
            {tableVisibility && (data.length ? <ClassSizeTable data={data} /> : "There are no results!")}
        </Jumbotron>       

    );
};

export default ClassSize;