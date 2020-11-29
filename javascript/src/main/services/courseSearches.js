import fetch from "isomorphic-unfetch";

 const fetchBasicCourseJSON = async (event, fields) => {
    const url = `/api/public/basicsearch?qtr=${fields.quarter}&dept=${fields.department}&level=${fields.level}`;
    const courseJSON = (await (await fetch(url)).json())
    return courseJSON;
};

const fetchBasicCourseHistoryJSON = async (event, fields) => {
    const url = `/api/public/history/basicsearch?qtr=${fields.quarter}&dept=${fields.department}`;
    const courseResponse = await fetch(url);
    return courseResponse.json();
};

export { fetchBasicCourseJSON, fetchBasicCourseHistoryJSON };
    
