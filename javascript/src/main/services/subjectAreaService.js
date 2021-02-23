import fetch from "isomorphic-unfetch";

const fetchSubjectAreas = async (fields) => {
    const url = '/api/public/subjects';
    const subjectsResponse = await fetch(url); 
    return subjectsResponse.json();
}

export { fetchSubjectAreas };
