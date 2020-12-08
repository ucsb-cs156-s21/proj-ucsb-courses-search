import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { reformatJSON } from 'main/utils/BasicCourseTableHelpers';

const BasicCourseTable = ({ classes }) => {
  const sections = reformatJSON(classes);

  const rowStyle = (row, rowIndex) => {
    console.log(`row=`, row, `rowIndex`, rowIndex);
    return (row.section % 100 == 0) ? { backgroundColor: '#CEDEFA' } : (rowIndex % 2 == 1) ? { backgroundColor: '#EDF3FE' } : { backgroundColor: '#FFFFFF' }
  }

  const dataAlignment = (cell, row) => {
    // console.log(`cell=${cell} row=`, row);
    const alignmnet = (row.section % 100 == 0) ? 'left' : 'right';
    return alignmnet
  }

  const renderSectionTimes = (cell, row) => {

    const times = (row.timeLocations.length > 0) ? (row.timeLocations[0].beginTime + " - " + row.timeLocations[0].endTime) : ("TBD");
    return times
  }
  const renderSectionDays = (cell, row) => {

    const days = (row.timeLocations.length > 0) ? (row.timeLocations[0].days) : ("TBD");
    return days
  }

  const renderMaxEnrolled = (cell, row) => {
    const max = (row.courseCancelled == 'C         ' || row.classClosed == 'Y') ? 0 : row.maxEnroll;
    return ( max ) 
  }

  const renderEnrolledTotal = (cell, row) => {
    const enrolled = (row.courseCancelled == 'C         ') ? "Cancelled" : (row.classClosed == 'Y') ? "Closed" : row.enrolledTotal;
    return (<span>{enrolled}</span>)
  }

  const renderCourseId = (cell, row) => {
    // console.log(`cell=${cell} row=`, row);
    const courseId = (row.section % 100 == 0) ? row.course.courseId : "";
    return (<span>{courseId}</span>)
  }

  const renderCourseTitle = (cell, row) => {
    const courseTitle = (row.section % 100 == 0) ? row.course.title : "";
    return (<span>{courseTitle}</span>)
  }

  const renderInstructors = (cell, row) => {
    // console.log(`cell=${cell} row=`, row);
    const instructor = (row.instructors.length > 0) ? row.instructors[0].instructor : "TBD";
    return (<span>{instructor}</span>)
  }

  const columns = [{
    dataField: 'course.courseId',
    text: 'Course Number',
    isDummyField: true,
    formatter: (cell, row) => renderCourseId(cell, row)
  }, {
    dataField: 'course.title',
    text: 'Title',
    isDummyField: true,
    formatter: (cell, row) => renderCourseTitle(cell, row)
  }, {
    dataField: 'section',
    text: 'Section',
    align: (cell, row) => dataAlignment(cell, row)
  }, {
    dataField: "instructors",
    text: "Instructor",
    isDummyField: true,
    formatter: (cell, row) => renderInstructors(cell, row),
    align: (cell, row) => dataAlignment(cell, row)
  }, {
    dataField: 'enrollCode',
    text: 'Enroll Code',
    align: (cell, row) => dataAlignment(cell, row)
  }, {
    dataField: 'days',
    text: 'Days',
    formatter: (cell, row) => renderSectionDays(cell, row),
    align: (cell, row) => dataAlignment(cell, row)
  }, {
    dataField: 'times',
    text: 'Time',
    formatter: (cell, row) => renderSectionTimes(cell, row),
    align: (cell, row) => dataAlignment(cell, row)
  }, {
    dataField: 'course.unitsFixed',
    text: 'Unit',
    align: (cell, row) => dataAlignment(cell, row)
  }, {
    dataField: 'enrolledTotal',
    text: 'Enrolled',
    formatter: (cell, row) => renderEnrolledTotal(cell, row),
    align: (cell, row) => dataAlignment(cell, row)
  }, {
    dataField: 'maxEnroll',
    text: 'Max',
    formatter: (cell, row) => renderMaxEnrolled(cell, row),
    align: (cell, row) => dataAlignment(cell, row)
  }
  ];
  return (
    <BootstrapTable keyField='enrollCode' data={sections} columns={columns} rowStyle={rowStyle} />
  );
};
export default BasicCourseTable;
