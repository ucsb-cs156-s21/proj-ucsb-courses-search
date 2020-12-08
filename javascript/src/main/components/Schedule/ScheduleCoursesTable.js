import React from "react";
import { Button } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';

const buttonFormatter = (cell, row, rowIndex, formatExtraData) => {
    return(
      <Button onClick={()=> {}}> add </Button>  //add onClick funtion to add course to actual schedule
    );
  };
  
const ScheduleCoursesTable = ( {classes} ) => {
  
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
    dataField: 'deleteFromSched',
    text: 'Delete Course',
    formatter: buttonFormatter,
  }
];
  
  return (
    <BootstrapTable keyField='courseId' data={classes} columns={columns} />
  );
};

export default ScheduleCoursesTable;
