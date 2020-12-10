import fetch from "isomorphic-unfetch";


const fetchFullCourses = async (fields) => {
    const url = `/api/public/statistics/fullCoursesByDept?startQuarter=${encodeURIComponent(fields.startQuarter)}&endQuarter=${encodeURIComponent(fields.endQuarter)}&department=${encodeURIComponent(fields.department)}`;
    const fullCoursesResponse = await fetch(url); 
    return fullCoursesResponse.json();
}

const fetchClassSize = async (fields) => {
    const url = `/api/public/statistics/classSize?startQuarter=${encodeURIComponent(fields.startQuarter)}&endQuarter=${encodeURIComponent(fields.endQuarter)}`;
    const classSizeResponse = await fetch(url);
    return classSizeResponse.json();
}


export {fetchClassSize, fetchFullCourses };
