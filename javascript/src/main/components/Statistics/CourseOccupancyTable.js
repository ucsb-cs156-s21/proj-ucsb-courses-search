import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const white = {
  backgroundColor: '#ffffff'
};

const d2d4d7 = {
  backgroundColor: '#d2d4d7'
}

const average = (arr) => {
  return (arr.reduce((a, b) => parseInt(a) + parseInt(b), 0) / arr.length).toFixed(0);
};

const alternate = (cell, row, rowIndex, colIndex) => {
  if (rowIndex % 2 === 0) 
    return { backgroundColor: '#e9ecef' };
  else
    return { backgroundColor: '#edf0f2' };
};

const CourseOccupancyTable = ({ data }) => {

  const columns = [{
    dataField: 'quarter',
    text: 'Quarter',
    footer: 'Average',
    style: alternate,
    headerStyle: white,
    footerStyle: d2d4d7
  }, {
    dataField: 'enrolled',
    text: '# Enrolled',
    style: alternate,
    footer: average,
    headerStyle: white,
    footerStyle: d2d4d7
  }, {
    dataField: 'maxEnrolled',
    text: '# Total',
    style: alternate,
    footer: average,
    headerStyle: white,
    footerStyle: d2d4d7
  }, {
    dataField: 'occupancy',
    text: 'Occupancy',
    sort: true,
    style: alternate,
    formatter: (cell) => cell + "%",
    footer: data => average(data) + "%",
    headerStyle: white,
    footerStyle: d2d4d7
  }
  ];

  return (
    <BootstrapTable keyField='quarter' data={data} columns={columns} />
  );
};

export default CourseOccupancyTable;
