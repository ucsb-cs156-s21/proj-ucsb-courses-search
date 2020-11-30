import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const BasicCourseTable = ( {classes} ) => {

  function InstructorFormatter(cell, row){
    if (cell==null){
      return(
          <span>T.B.A.</span>
      );
    }
    return (
        <span> { cell }</span>
    );
  }

  const columns = [{
    dataField: 'courseId',
    text: 'Course Number'
  },{
    dataField: 'title',
    text: 'Title'
  },{
    dataField: 'unitsFixed',
    text: 'Unit'
  },{
    dataField: 'classSections[0].instructors[0].instructor',
    text: 'Instructor',
    formatter: InstructorFormatter
  }
  ];
  
  return (
    <BootstrapTable keyField='courseId' data={classes} columns={columns} />
  );
};

export default BasicCourseTable;
