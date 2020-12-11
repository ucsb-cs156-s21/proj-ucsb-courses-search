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

  const options = {
    noDataText: 'There are no results!'
  };

  return (
    <div>
      <BootstrapTable id="table" keyField='_id' striped hover condensed data={data} columns={columns} options={options}/>
    </div>
  );
};

export default DivisionOccupancyTable;
