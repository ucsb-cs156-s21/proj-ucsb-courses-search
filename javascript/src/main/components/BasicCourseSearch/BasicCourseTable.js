import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { reformatJSON } from 'main/utils/BasicCourseTableHelpers';

const BasicCourseTable = ({ classes }) => {
  const sections = reformatJSON(classes);

  const rowStyle = (row, _rowIndex) => {
    // Returns blue for lectures, yellow for over-enrolled sections, red for cancelled sections, white otherwise
    return (row.section % 100 === 0) ? {backgroundColor: '#CEDEFA'} :
           (row.courseCancelled === 'C         ' || row.classClosed === 'Y')? {backgroundColor: '#E0AAAA'} :
           (row.enrolledTotal >= row.maxEnroll) ? {backgroundColor: '#F0DC9E'} : 
           {backgroundColor: '#EDF3FE'};
  }

  const dataAlignment = (_cell, row) => {
    return (row.section % 100 === 0) ? 'left' : 'right';
  }

  const renderSectionTimes = (_cell, row) => {
    return (row.timeLocations.length > 0) ? (row.timeLocations[0].beginTime + " - " + row.timeLocations[0].endTime) : ("TBD");
  }
  const renderSectionDays = (_cell, row) => {
    return (row.timeLocations.length > 0) ? (row.timeLocations[0].days) : ("TBD");
  }

  const renderMaxEnrolled = (_cell, row) => {
    return (row.courseCancelled === 'C         ' || row.maxEnroll == null) ?  0 : row.maxEnroll;
  }

  const renderEnrolledTotal = (_cell, row) => {
    return (row.courseCancelled === 'C         ') ? "Cancelled" : 
           (row.classClosed === 'Y') ? "Closed" :
           (row.enrolledTotal === null)? 0 :
           row.enrolledTotal;
  }

  const renderCourseId = (_cell, row) => {
    return (row.section % 100 === 0) ? row.course.courseId : "";
  }

  const renderCourseTitle = (_cell, row) => {
    return (row.section % 100 === 0) ? row.course.title : "";
  }

  const renderInstructors = (_cell, row) => {
    return (row.instructors.length > 0) ? row.instructors[0].instructor : "TBD";
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
  }];

  return (
    <BootstrapTable keyField='enrollCode' data={sections} columns={columns} rowStyle={rowStyle} />
  );
};
export default BasicCourseTable;
