import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const AgggregateStatisticsTable = ( {data} ) => {
  const columns = [{
    dataField: '_id',
    text: 'Department',
    sort: true
  },{
    dataField: 'numCourses',
    text: 'Number of Courses',
    sort: true
  },{
    dataField: 'courseOccupancy',
    text: 'Course Occupancy',
    sort: true,
    formatter: (cell) => cell + "%"
  }, {
    dataField: 'avgClassSize',
    text: 'Average Class Size',
    sort: true
  }
];


  return (
    <BootstrapTable keyField='_id' data={data} columns={columns} />
  );
};

export default AgggregateStatisticsTable;
