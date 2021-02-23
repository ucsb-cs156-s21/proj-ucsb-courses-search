import fetch from "isomorphic-unfetch";

const fetchSubjectAreas = async () => {
    const url = '/api/public/subjects';
    const subjectsResponse = await fetch(url);
 
    if (subjectsResponse.ok)
        return subjectsResponse.json();
    const message = 
        `getting ${subjectsResponse.url}, status=${subjectsResponse.status}`;
    throw new Error(message);
}

export { fetchSubjectAreas };
