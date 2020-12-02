import React from "react";
import { useState } from "react";
import { fetchCourseCount } from "main/services/statisticsService";
import CourseCountTable from "main/components/Statistics/CourseCountTable";

const NumFullCoursesByDept = () => {
    const initialData = [];
    const [data, setData] = useState(initialData);

    fetchCourseCount().then((data)=> {
        setData(data);
    });

    return (
        //<CourseCountTable data={data} />
        <h1>This is the NumFullCoursesByDept page</h1>
    );
};

export default NumFullCoursesByDept;