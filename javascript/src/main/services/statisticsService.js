import fetch from "isomorphic-unfetch";

const fetchDivisionOccupancy = async (fields) => {
    const url = `/api/public/statistics/courseOccupancyByDivision?startQuarter=${fields.startQuarter}&endQuarter=${fields.endQuarter}&department=${fields.department}&level=${fields.level}`;
    const divisionOccupancyResponse = await fetch(url);   
    return divisionOccupancyResponse.json();
} 

const fetchClassSize = async (fields) => {
    const url = `/api/public/statistics/classSize?startQuarter=${encodeURIComponent(fields.startQuarter)}&endQuarter=${encodeURIComponent(fields.endQuarter)}`;
    const classSizeResponse = await fetch(url);
    return classSizeResponse.json();
}

export {fetchClassSize, fetchDivisionOccupancy };

    
