import fetch from "isomorphic-unfetch";

 const fetchBasicCourseJSON = async (event, fields) => {
    const url = `/api/public/basicsearch?qtr=${fields.quarter}&dept=${fields.department}&level=${fields.level}`;
    console.log(`fetching JSON, url=${url}`);
    const courseJSON = (await (await fetch(url)).json())
    console.log(`fetch returned, courseJSON=${courseJSON}`);
    return courseJSON;
};

export { fetchBasicCourseJSON };
    