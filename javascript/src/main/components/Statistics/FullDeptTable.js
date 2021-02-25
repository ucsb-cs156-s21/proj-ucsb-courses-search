import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const FullDeptTable = ( {data} ) => {

  const columns = [{
    dataField: '_id',
    text: 'Department'
  },{
    dataField: 'numCourses',
    text: 'Total Number of Courses Offered'
  },{
    dataField: 'numFullCourses',
    text: 'Number of Full Courses'
  },{
    dataField: 'Percentage of Full Courses',
    text: 'percentFullCourses'
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

export default FullDeptTable;
