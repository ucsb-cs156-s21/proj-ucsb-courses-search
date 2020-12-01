import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { fetchCourseCount } from "main/services/statisticsService";
import CourseCountTable from "main/components/Statistics/CourseCountTable";

const CourseCount = () => {
    const initialData = [];
    const [data, setData] = useState(initialData);

    fetchCourseCount().then((data)=> {
        setData(data);
    });

    return (
        <CourseCountTable data={data} />
    );
};

export default CourseCount;
