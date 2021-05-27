import fetch from "isomorphic-unfetch";

 const fetchBasicCourseJSON = async (_event, fields) => {
    const url = `/api/public/basicsearch?qtr=${fields.quarter}&dept=${fields.subject}&level=${fields.level}`;
    const courseJSON = await fetch(url);
    return courseJSON.json();
};

const fetchBasicCourseHistoryJSON = async (_event, fields) => {
    const url = `/api/public/history/basicsearch?qtr=${fields.quarter}&dept=${fields.subject}`;
    const courseResponse = await fetch(url);
    return courseResponse.json();
};

const fetchGeQtrJSON = async (_event, fields) => {
    const url = `/api/public/history/gesearch?startQtr=${fields.startQuarter}&endQtr=${fields.endQuarter}&geCode=${fields.geCode}`;
    const courseResponse = await fetch(url);
    return courseResponse.json();
};
  
const fetchCourseHistoryNameQtrJSON = async (_event, fields) => {
    const url = `/api/public/history/coursesearch?startQtr=${fields.startQuarter}&endQtr=${fields.endQuarter}&subjectArea=${fields.subject}&courseNumber=${fields.courseNumber}&courseSuf=${fields.courseSuf}`;
    const courseResponse = await fetch(url);
    return courseResponse.json();
};

const fetchInstructorHistoryNameQtrJSON = async (_event, fields) => {
    const url = `/api/public/history/instructorsearch?startQtr=${fields.startQuarter}&endQtr=${fields.endQuarter}&instructorText=${fields.instructorText}`;
    const courseResponse = await fetch(url);
    return courseResponse.json();
};

export { fetchBasicCourseJSON, fetchBasicCourseHistoryJSON , fetchCourseHistoryNameQtrJSON, fetchGeQtrJSON ,fetchInstructorHistoryNameQtrJSON};
    
