import fetch from "isomorphic-unfetch";

const fetchCourseCount = async () => {
    const url = `/api/public/statistics/courseCount`;
    const courseCountResponse = await fetch(url);
    return courseCountResponse.json();
}

const fetchClassSize = async () => {
    const url = `/api/public/statistics/classSize`;
    const classSizeResponse = await fetch(url);
    return classSizeResponse.json();
}

export { fetchCourseCount, fetchClassSize };
    
