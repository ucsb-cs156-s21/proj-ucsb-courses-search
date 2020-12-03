import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const FullCourseTable = ( {data} ) => {

  const columns = [{
    dataField: 'index',
    text: '#'
  },{
    dataField: 'quarter',
    text: 'Quarter'
  },{
    dataField: 'title',
    text: 'Course Title'
  }
];

  return (
    <BootstrapTable keyField='index' data={data} columns={columns} />
  );
};

export default FullCourseTable;
