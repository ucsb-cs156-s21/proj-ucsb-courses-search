import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { reformatJSON } from 'main/utils/BasicCourseTableHelpers';

const BasicCourseTable = ( {classes} ) => {
  const sections = reformatJSON(classes);
  const COLOR_UNAVAILABLE = {backgroundColor: '#FF0000'};
  const COLOR_CLOSEFULL = {backgroundColor: '#FFBF00'};
  const COLOR_DARKBLUE = {backgroundColor: '#CEDEFA'};
  const COLOR_LIGHTBLUE = {backgroundColor: '#EDF3FE'};
  const COLOR_DEBUG = {backgroundColor: '#00FF00'};
  const classUnavailable = (row) => (row.enrolledTotal >= row.maxEnroll || row.courseCancelled === "Y" || row.classClosed ==="Y"); 
  const closeToFull = (row) => ((row.maxEnroll - row.enrolledTotal) < (.2 * row.maxEnroll));

    //This code creates the legend that describes what each color means
    <ColorLegend x={0} y={0}
		 title = "Color Legend"
		 centerTitle
		 orientation = "horizontal"
		 gutter={20}
		 style={{border: {stroke: "black"}, title: {fontSize: 20} }}
		 data={[
		     {name: "Class Unavailable", symbol {fill: COLOR_UNAVAILABLE, type: "square" }},
		     {name: "Class Almost Full", symbol {fill: COLOR_CLOSEFULL, type: "square" }},
		     {name: "Class Available", symbol {fill: COLOR_LIGHTBLUE, type: "square" }}
		 ]}
		 /> 

  const rowStyle = (row, rowIndex) => {
    if (row.section % 100 == 0)
    {
      //We interate through all the classes, for the first section (should be the mod 100 == 0 section) if it is equal to the section we are setting
      //the color to we do something.
      var i; 
      for (i in classes) 
      {
        if (classes[i].classSections[0].enrollCode == row.enrollCode && classes[i].classSections[0].section == row.section) 
        { 
            if (classes[i].classSections.length == 1)
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
  const dataAlignment = (cell, row) => {
    const alignmnet = (row.section % 100 == 0)? 'left': 'right';
    return alignmnet
  }
  const renderSectionTimes = (cell, row) => {

    const times = (row.timeLocations.length > 0)? (row.timeLocations[0].beginTime + " - " + row.timeLocations[0].endTime) : ("TBD");
    return times
  }
  const renderSectionDays = (cell, row) => {

    const days = (row.timeLocations.length > 0)? (row.timeLocations[0].days) : ("TBD");
    return days
  }
  const renderCourseId = (cell, row) => {
    const courseId = (row.section % 100 == 0)? row.course.courseId: "";
    return (  courseId )
  }
  const renderCourseTitle = (cell, row) => {
    const courseTitle = (row.section % 100 == 0)? row.course.title: "";
    return (  courseTitle )
  }
  const renderInstructors = (cell, row) => {
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
      text: 'Section',
      align: (cell, row) => dataAlignment(cell, row)
    },{
      dataField: "instructors",
      text: "Instructor",
      isDummyField: true,
      formatter: (cell, row) => renderInstructors(cell, row),
      align: (cell, row) => dataAlignment(cell, row)
    },{
      dataField: 'enrollCode',
      text: 'Enroll Code',
      align: (cell, row) => dataAlignment(cell, row)
    },{
      dataField: 'days',
      text: 'Days',
      formatter: (cell, row) => renderSectionDays(cell, row),
      align: (cell, row) => dataAlignment(cell, row)
    },{
      dataField: 'times',
      text: 'Time',
      formatter: (cell, row) => renderSectionTimes(cell, row),
      align: (cell, row) => dataAlignment(cell, row)
    },{
      dataField: 'course.unitsFixed',
      text: 'Unit',
      align: (cell, row) => dataAlignment(cell, row)
    }
  ];
    return (
      <BootstrapTable keyField='enrollCode' data={sections} columns={columns} rowStyle={rowStyle}/>
    );
};
export default BasicCourseTable;
