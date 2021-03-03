import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const AgggregateStatisticsTable = ( {data} ) => {

  const columns = [{
    dataField: '_id',
    text: 'Department'
  },{
    dataField: 'numCourses',
    text: 'Number of Courses'
  },{
    dataField: 'courseOccupancy',
    text: 'Course Occupancy'
  }, {
    dataField: 'avgClassSize',
    text: 'Average Class Size'
  }
];


  return (
    <BootstrapTable keyField='_id' data={data} columns={columns} />
  );
};

export default AgggregateStatisticsTable;
