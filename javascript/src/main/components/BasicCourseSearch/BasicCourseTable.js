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
  console.log(`cell=`,cell);
  return (cell.section % 100 == 0)? {backgroundColor: '#cedefa'}: {backgroundColor: '#edf3fe'} 
}

const renderInstructors = (cell, row) => {
  // console.log(`cell=${cell} row=`, row);
  const instructor = (row.instructors.length > 0)? row.instructors[0].instructor: "";
  return (  <span>{instructor}</span> )
}



  const columns = [{
    dataField: 'course.courseId',
    text: 'Course Number'
  },{
    dataField: 'course.title',
    text: 'Title',
    dataAlign: "left"
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