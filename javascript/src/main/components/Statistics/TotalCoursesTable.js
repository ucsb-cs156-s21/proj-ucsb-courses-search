import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const TotalCoursesTable = ( {data} ) => {

  const columns = [{
    dataField: '_id',
    text: 'Department'
  },{
    dataField: 'totalCourses',
    text: 'Total Courses'
  },
];

  return (
    <BootstrapTable keyField='_id' data={data} columns={columns} />
  );
};

export default TotalCoursesTable;