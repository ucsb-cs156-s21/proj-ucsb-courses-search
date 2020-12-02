import fetch from "isomorphic-unfetch";

const fetchCourseCount = async () => {
    const url = `/api/public/statistics/courseCount`;
    const courseCountResponse = await fetch(url);
    return courseCountResponse.json();
}

const fetchDivisionOccupancy = async (event, fields) => {
    const url = `/api/public/statistics/courseOccupancyByDivision`;
    const courseCountResponse = await fetch(url); 
    return courseCountResponse.json();
}


export { fetchCourseCount, fetchDivisionOccupancy };
    
