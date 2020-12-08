import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { fetchClassSize } from "main/services/statisticsService";
import ClassSizeTable from "main/components/Statistics/ClassSizeTable";
import ClassSizeForm from "main/components/Statistics/ClassSizeForm";

const ClassSize = () => {
    const initialData = [];
    const [data, setData] = useState(initialData);

    fetchClassSize().then((data)=> {
        setData(data);
    });

    return (
        <ClassSizeTable data={data} />
    );
};

export default ClassSize;