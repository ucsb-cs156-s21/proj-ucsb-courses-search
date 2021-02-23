import fetch from "isomorphic-unfetch";

const fetchSubjectAreas = async (fields) => {
    const url = '/api/public/subjects';
    const subjectsResponse = await fetch(url);
 
    if (subjectsResponse.ok)
        return subjectsResponse.json();
    console.log("subjectsResponse",subjectsResponse);
    const message = 
        `getting ${subjectsResponse.url}, status=${subjectsResponse.status}`;
    console.log(message);
    throw new Error(message);
}

export { fetchSubjectAreas };
