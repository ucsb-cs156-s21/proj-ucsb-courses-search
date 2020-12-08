import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const GeCourseTable = ( {classes} ) => {
  
  const columns = [{
    dataField: 'qtr',
    text: 'Start Quarter'
  },{
    dataField: 'qtr',
    text: 'End Quarter'
  },{
    dataField: 'geCode',
    text: 'Area'
  }
];
  
  return (
    <BootstrapTable keyField='geCode' data={classes} columns={columns} />
  );
};

export default GeCourseTable;
