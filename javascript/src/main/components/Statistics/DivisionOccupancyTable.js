import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const DivisionOccupancyTable = ( {data} ) => {
  
  const columns = [{
    dataField: 'quarter',
    text: 'Quarter'
  },{
    dataField: 'title',
    text: 'Course Name'
  },{
    dataField: 'enrolled',
    text: 'Enrolled'
  }, {
    dataField: 'maxEnrolled',
    text: 'Maximum Enrollment'
  }
];
  
  return (
    <BootstrapTable keyField='title' striped hover condensed data={data} columns={columns} />
  );
};

export default DivisionOccupancyTable;
