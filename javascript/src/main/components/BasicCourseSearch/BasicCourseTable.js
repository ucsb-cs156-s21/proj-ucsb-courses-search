import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
import { reformatJSON } from 'main/utils/BasicCourseTableHelpers';

const BasicCourseTable = ( {classes} ) => {
  const sections = reformatJSON(classes);

  const rowStyle = (row, _rowIndex) => {
    return  (row.section % 100 === 0)? {backgroundColor: '#CEDEFA'}: {backgroundColor: '#EDF3FE'};
  }

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
  const renderAddButton = (_cell, row, rowIndex) => {
    if(sections[rowIndex + 1]){
      if((sections[rowIndex + 1]).section%100 === 0 || row.section%100 !== 0) {
        return (
          <Button variant="primary" data-testid={`add-button-${row.course.courseId}`} onClick={() => {
            //return addToSchedule(row.course.courseId);
          }}>Add</Button>
        )
      }
    }
    if (!sections[rowIndex + 1]) {
      return (
        <Button variant="primary" data-testid={`add-button-${row.course.courseId}`} onClick={() => {
          //return addToSchedule(row.course.courseId);
        }}>Add</Button>
      )
    }
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
      text: 'Section'
    },{
      dataField: "instructors",
      text: "Instructor",
      isDummyField: true,
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
    },{
      dataField: "add",
      text: "Add",
      isDummyField: true,
      formatter: (cell, row, rowIndex) => renderAddButton(cell, row, rowIndex)
    }
  ];
    return (
      <BootstrapTable keyField='enrollCode' data={sections} columns={columns} rowStyle={rowStyle}/>
    );
};
export default BasicCourseTable;