import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const CourseCountTable = ( {data} ) => {
  
  const columns = [{
    dataField: 'quarter',
    text: 'Quarter'
  },{
    dataField: 'deptCode',
    text: 'Department'
  },{
    dataField: 'courseCount',
    text: 'Course Count'
  }
];
  
  return (
    <BootstrapTable keyField='quarter' data={data} columns={columns} />
  );
};

export default CourseCountTable;
