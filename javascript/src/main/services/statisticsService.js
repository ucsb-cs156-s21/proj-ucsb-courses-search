import fetch from "isomorphic-unfetch";

const fetchCourseCount = async () => {
    const url = `/api/public/statistics/courseCount`;
    const courseCountResponse = await fetch(url);
    return courseCountResponse.json();
}

const fetchClassSize = async (fields) => {
    const url = `/api/public/statistics/classSize?startQuarter=${encodeURIComponent(fields.startQuarter)}&endQuarter=${encodeURIComponent(fields.endQuarter)}`;
    const classSizeResponse = await fetch(url);
    return classSizeResponse.json();
}


export { fetchCourseCount, fetchClassSize };
    
