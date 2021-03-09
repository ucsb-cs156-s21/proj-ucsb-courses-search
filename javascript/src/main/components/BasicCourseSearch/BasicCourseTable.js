import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
import { useAuth0 } from '@auth0/auth0-react';
import { reformatJSON } from 'main/utils/BasicCourseTableHelpers';


const BasicCourseTable = ( {classes,checks, displayQuarter} ) => {
  const { isAuthenticated } = useAuth0();
  const sections = reformatJSON(classes,checks);

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
  const renderQuarter = (_cell, row) => {
    const quarter = (row.section % 100 === 0)? row.course.quarter: "";
    return (  quarter )
  }

  const RenderAddButton = (_cell, row, rowIndex) => {
    if( isAuthenticated ){
      if (!sections[rowIndex + 1]) {
        return (
          <Button variant="primary" data-testid={`add-button-${row.enrollCode}`} onClick={() => {
            //return addToSchedule(row.course.courseId);
          }}>Add</Button>
        )
      }
      else {
        if((sections[rowIndex + 1]).section%100 === 0 || row.section%100 !== 0) {
          return (
            <Button variant="primary" data-testid={`add-button-${row.enrollCode}`} onClick={() => {
              //return addToSchedule(row.course.courseId);
            }}>Add</Button>
          )
        }
      }
    }
  }

    const columns = [{
      dataField: 'course.courseId',
      text: 'Course Number',
      formatter: (cell, row) => renderCourseId(cell, row)
    },{
      dataField: 'course.title',
      text: 'Title',
      formatter: (cell, row) => renderCourseTitle(cell, row)
    },{
      dataField: 'section',
      text: 'Section'
    },{
      dataField: "instructors",
      text: "Instructor",
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
      formatter: (cell, row, rowIndex) => RenderAddButton(cell, row, rowIndex)
    }
  ];

    if(displayQuarter){
      columns.unshift(
      {
        dataField: 'course.quarter',
        text: 'Quarter',
        formatter: (cell, row) => renderQuarter(cell, row)
      }
      )
    }

    return (
      <BootstrapTable keyField='enrollCode' data={sections} columns={columns} rowStyle={rowStyle}/>
    );
};
export default BasicCourseTable;