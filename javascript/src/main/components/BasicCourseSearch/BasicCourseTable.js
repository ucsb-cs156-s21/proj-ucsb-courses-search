import React from "react";
import { Button } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import { reformatJSON } from 'main/utils/BasicCourseTableHelpers';



const buttonFormatter = (cell, row, rowIndex, formatExtraData) => {
  return(
    <Button onClick={()=> {}}> add </Button>  //add onClick funtion to add course to actual schedule
  );
};



const BasicCourseTable = ( {classes} ) => {

  const sections = reformatJSON(classes);

  const rowStyle = (row, rowIndex) => {
    return  (row.section % 100 == 0)? {backgroundColor: '#CEDEFA'}: {backgroundColor: '#EDF3FE'};
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
