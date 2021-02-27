import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { reformatJSON } from 'main/utils/BasicCourseTableHelpers';

const BasicCourseTable = ( {classes} ) => {
  const sections = reformatJSON(classes);

  const rowStyle = (row, _rowIndex) => {
    return  (row.section % 100 === 0)? {backgroundColor: '#CEDEFA'}: {backgroundColor: '#EDF3FE'};
  }
<<<<<<< HEAD
=======

>>>>>>> e510d1d1f75956e7cc317215e502715e49e624c7
  const renderSectionTimes = (_cell, row) => {

    const times = (row.timeLocations.length > 0)? (row.timeLocations[0].beginTime + " - " + row.timeLocations[0].endTime) : ("TBD");
    return times
  }
  const renderSectionDays = (_cell, row) => {

    const days = (row.timeLocations.length > 0)? (row.timeLocations[0].days) : ("TBD");
    return days
  }
  const renderCourseId = (_cell, row) => {
    const courseId = (row.section % 100 === 0)? row.course.courseId: "";
    return (  courseId )
  }
  const renderCourseTitle = (_cell, row) => {
    const courseTitle = (row.section % 100 === 0)? row.course.title: "";
    return (  courseTitle )
  }
  const renderInstructors = (_cell, row) => {
    const instructor = (row.instructors.length > 0)? row.instructors[0].instructor: "TBD";
    return (  instructor )
  }
    const columns = [{
      dataField: 'course.courseId',
      text: 'Course Number',
      isDummyField: true,
      formatter: (cell, row) => renderCourseId(cell, row)
    },{
      dataField: 'course.title',
      text: 'Title',
      isDummyField: true,
      formatter: (cell, row) => renderCourseTitle(cell, row)
    },{
      dataField: 'section',
<<<<<<< HEAD
      text: 'Section'
=======
      text: 'Section',
      align: 'left'
>>>>>>> e510d1d1f75956e7cc317215e502715e49e624c7
    },{
      dataField: "instructors",
      text: "Instructor",
      isDummyField: true,
<<<<<<< HEAD
      formatter: (cell, row) => renderInstructors(cell, row)
    },{
      dataField: 'enrollCode',
      text: 'Enroll Code'
    },{
      dataField: 'days',
      text: 'Days',
      formatter: (cell, row) => renderSectionDays(cell, row)
    },{
      dataField: 'times',
      text: 'Time',
      formatter: (cell, row) => renderSectionTimes(cell, row)
    },{
      dataField: 'course.unitsFixed',
      text: 'Unit'
=======
      formatter: (cell, row) => renderInstructors(cell, row),
      align: 'left'
    },{
      dataField: 'enrollCode',
      text: 'Enroll Code',
      align: 'left'
    },{
      dataField: 'days',
      text: 'Days',
      formatter: (cell, row) => renderSectionDays(cell, row),
      align: 'left'
    },{
      dataField: 'times',
      text: 'Time',
      formatter: (cell, row) => renderSectionTimes(cell, row),
      align: 'left'
    },{
      dataField: 'course.unitsFixed',
      text: 'Unit',
      align: 'left'
>>>>>>> e510d1d1f75956e7cc317215e502715e49e624c7
    }
  ];
    return (
      <BootstrapTable keyField='enrollCode' data={sections} columns={columns} rowStyle={rowStyle}/>
    );
};
export default BasicCourseTable;
