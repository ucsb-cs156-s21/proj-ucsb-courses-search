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
const rowStyle = (row, rowIndex) => {
  console.log(`row=`,row, `rowIndex`, rowIndex);
  return (row.section % 100 == 0)? {backgroundColor: '#CEDEFA'}: (rowIndex % 2 == 1)? {backgroundColor: '#EDF3FE'}: {backgroundColor: '#FFFFFF'}
}
const dataAlignment = (cell, row) => {
  // console.log(`cell=${cell} row=`, row);
  const alignmnet = (row.section % 100 == 0)? 'left': 'right';
  return alignmnet
}
const renderCourseId = (cell, row) => {
  // console.log(`cell=${cell} row=`, row);
  const courseId = (row.section % 100 == 0)? row.course.courseId: "";
  return (  <span>{courseId}</span> )
}
const renderCourseTitle = (cell, row) => {
  const courseTitle = (row.section % 100 == 0)? row.course.title: "";
  return (  <span>{courseTitle}</span> )
}
const renderInstructors = (cell, row) => {
  // console.log(`cell=${cell} row=`, row);
  const instructor = (row.instructors.length > 0)? row.instructors[0].instructor: "TBD";
  return (  <span>{instructor}</span> )
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
