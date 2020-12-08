import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
const BasicCourseTable = ( {classes} ) => {
  const sections = [];
/*  classes.forEach(
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
  );*/

  var numSections = 0;
  classes.slice().reverse().forEach(
    (course) => {
      course.classSections.slice().reverse().forEach(
        (section) => {
          if (section.section % 100 != 0){
            numSections++;
          }
          if(course.classSections.length <= 1 || (section.section % 100 == 0 && numSections == 0)) {
            section.course =
            {
              courseId: course.courseId,
              title: course.title,
              unitsFixed: course.unitsFixed,
              noSections: "true"
            };
          } else {
            section.course =
            {
              courseId: course.courseId,
              title: course.title,
              unitsFixed: course.unitsFixed,
              noSections: "false"
            };
          }
          if (section.section % 100 == 0){
            numSections = 0;
          }
         sections.push(section);
       }
      )
    }
  );
  sections.reverse();
  
const rowStyle = (row, rowIndex) => {
  // console.log(`row=`,row, `rowIndex`, rowIndex);
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
const renderAddCourseButton = (id,cell,row) => {
  console.log(`cell=${cell} row=`, row);
  const button = (row.section % 100 != 0 || row.course.noSections == "true")? 
    <Button data-testid="add-course-button" onClick={() => { console.log("To Be Implemented")}}>Add Course</Button>: "";
  return (
      button
  )
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
//if (member) {
  columns.push({
      text: "",
      isDummyField: true,
      dataField: "add-course",
      formatter: (cell, row) => renderAddCourseButton(row.id, cell, row)
  });
//}
  return (
    <BootstrapTable keyField='enrollCode' data={sections} columns={columns} rowStyle={rowStyle}/>
  );
};
export default BasicCourseTable;
