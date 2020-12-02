import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const BasicCourseTable = ( {classes} ) => {
  
  const sections = [];

  classes.forEach(
    (course) => { 
      course.classSections.forEach(
        (section) => {
          section.course = 
          {
          courseId: course.courseId,
          title: course.title,
          unitsFixed: course.unitsFixed
          };
         sections.push(section);
       }
      )
    }
  );


const rowStyle = (cell, row) => {
  //console.log(`cell=`,cell);
  return (cell.section % 100 == 0)? {backgroundColor: '#cedefa'}: {backgroundColor: '#edf3fe'} 
}

const renderInstructors = (cell, row) => {
  // console.log(`cell=${cell} row=`, row);
  const instructor = (row.instructors.length > 0)? row.instructors[0].instructor: "";
  return (  <span>{instructor}</span> )
}

const renderCourseNumber = (cell, row) => {
  //console.log(`cell=${cell} row=`, row);
  const courseNumber = (row.section % 100 == 0)? row.course.courseId: "";
  return (  <span>{courseNumber}</span> )
}

const renderTitle = (cell, row) => {
  console.log(`cell=${cell} row=`, row);
  const courseTitle = (row.section % 100 == 0)? row.course.title: "";
  return (  <span>{courseTitle}</span> )
}

  const columns = [{
    dataField: 'course.courseId',
    text: 'Course Number',
    formatter: (cell,row) => renderCourseNumber(cell,row)
  },{
    dataField: 'course.title',
    text: 'Title',
    dataAlign: "left",
    formatter: (cell,row) => renderTitle(cell,row)
  },{
    dataField: 'section',
    text: 'Section'
  },{
    text: "Instructor",
    isDummyField: true,
    dataField: "instructors",
    formatter: (cell, row) => renderInstructors(cell, row)
  },{
    dataField: 'enrollCode',
    text: 'Enroll Code'
  },{
    dataField: 'course.unitsFixed',
    text: 'Unit'
  }
];
  
  return (
    <BootstrapTable keyField='enrollCode' data={sections} columns={columns} rowStyle={rowStyle} />
  );
};

export default BasicCourseTable;
/*


*/