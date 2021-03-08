import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { reformatJSON } from 'main/utils/BasicCourseTableHelpers';



const BasicCourseTable = ( {classes,checks, displayQuarter} ) => {

  const sections = reformatJSON(classes,checks);

  const COLOR_UNAVAILABLE = {backgroundColor: '#FF0000'};
  const COLOR_CLOSEFULL = {backgroundColor: '#FFBF00'};
  const COLOR_DARKBLUE = {backgroundColor: '#CEDEFA'};
  const COLOR_LIGHTBLUE = {backgroundColor: '#EDF3FE'};
  const classUnavailable = (row) => (row.enrolledTotal >= row.maxEnroll || row.courseCancelled === "Y" || row.classClosed ==="Y"); 
  const closeToFull = (row) => ((row.maxEnroll - row.enrolledTotal) < (.2 * row.maxEnroll));

  const rowStyle = (row) => {
    if (row.section % 100 === 0)
    {
      //We interate through all the classes, for the first section (should be the mod 100 == 0 section) if it is equal to the section we are setting
      //the color to we do something.
      var i; 
      for (i in classes) 
      {
        if (classes[i].classSections[0].enrollCode === row.enrollCode && classes[i].classSections[0].section === row.section) 
        { 
            if (classes[i].classSections.length === 1)
            {
              //return COLOR_DEBUG;
              //This code should only execute when dealing with stand alone lectures.
              if(classUnavailable(row))
              {
                return COLOR_UNAVAILABLE;
              }
              if (closeToFull(row))
              {
                return COLOR_CLOSEFULL;
              }
            }
        }
      }
      //If it is not a stand alone lecture that is unvailable or full and is just a class set it to dark blue.
      return COLOR_DARKBLUE;
    }
    else 
    {
      //This code should only execute when dealing with sections.
      if (classUnavailable(row)) {
        return COLOR_UNAVAILABLE;
      }
      if (closeToFull(row))
      {
        return COLOR_CLOSEFULL;
      }
      return COLOR_LIGHTBLUE;
    }
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
