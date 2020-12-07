import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const DivisionOccupancyTable = ( {data} ) => {
  
  const columns = [{
    dataField: 'quarter',
    text: 'Quarter'
  },{
    dataField: 'courseId',
    text: 'Course ID'
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

  // need to clear the table each time, or it'll just append
  const clearTable = () => {
    ('#table').bootstrapTable('removeAll');
    console.log("bootstrapped removed");
  }

  return (
    <div>
      <h1></h1>
      <BootstrapTable id="table" keyField='_id' striped hover condensed data={data} columns={columns} />
    </div>
  );
};

export default DivisionOccupancyTable;
