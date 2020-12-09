import fetch from "isomorphic-unfetch";


const fetchClassSize = async (fields) => {
    const url = `/api/public/statistics/classSize?startQuarter=${encodeURIComponent(fields.startQuarter)}&endQuarter=${encodeURIComponent(fields.endQuarter)}`;
    const classSizeResponse = await fetch(url);
    return classSizeResponse.json();
}


export {fetchClassSize };
    
