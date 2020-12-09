import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { fetchClassSize } from "main/services/statisticsService";
import ClassSizeTable from "main/components/Statistics/ClassSizeTable";
import ClassSizeForm from "main/components/Statistics/ClassSizeForm";


const ClassSize = () => {
    const initialData = [];
    const [data, setData] = useState(initialData);

    return (
        <Jumbotron>
            <ClassSizeForm setClassSizeJSON={setData} fetchClassSize={fetchClassSize}/>
            {(data.length == 0) ? 'There are no results!' : <ClassSizeTable data={data} />}
        </Jumbotron>       

        
    );
};

export default ClassSize;