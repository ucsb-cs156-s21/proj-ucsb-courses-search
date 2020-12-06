import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const CourseOccupancyTable = ({ data }) => {

  const columns = [{
    dataField: 'quarter',
    text: 'Quarter'
  }, {
    dataField: 'enrolled',
    text: '# Enrolled'
  }, {
    dataField: 'maxEnrolled',
    text: '# Total'
  }, {
    dataField: 'occupancy',
    text: 'Occupancy'
  }
  ];

  return (
    <BootstrapTable keyField='quarter' data={data} columns={columns} />
  );
};

export default CourseOccupancyTable;
