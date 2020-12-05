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
    dataField: 'courseCount',
    text: 'Occupancy'
  }
];
  
  return (
    <BootstrapTable keyField='quarter' striped hover condensed data={data} columns={columns} />
  );
};

export default DivisionOccupancyTable;
