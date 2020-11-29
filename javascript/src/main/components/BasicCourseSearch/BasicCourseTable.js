import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const BasicCourseTable = ( {classes} ) => {
  
  const columns = [{
    dataField: 'courseId',
    text: 'Course Number'
  },{
    dataField: 'title',
    text: 'Title'
  },{
    dataField: 'unitsFixed',
    text: 'Unit'
  }
];
  
  return (
    <BootstrapTable keyField='courseId' data={classes} columns={columns} />
  );
};

export default BasicCourseTable;
