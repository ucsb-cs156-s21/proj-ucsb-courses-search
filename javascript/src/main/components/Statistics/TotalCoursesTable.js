import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const headerStyleColor = {
  backgroundColor: '#ffffff'
};

const footerStyleColor = {
  backgroundColor: '#d2d4d7'
}

const evenRows = {
  backgroundColor: '#e9ecef'
}

const oddRows = {
  backgroundColor: '#edf0f2'
}

const alternate = (_cell, _row, rowIndex, _colIndex) => {
  if (rowIndex % 2 === 0) 
    return evenRows;
  else
    return oddRows;
};

const TotalCoursesTable = ( {data} ) => {

  const columns = [{
    dataField: '_id',
    text: 'Department',
    style: alternate,
    sort: true,
    headerStyle: headerStyleColor,
    footerStyle: footerStyleColor,
  },{
    dataField: 'totalCourses',
    text: 'Total Courses',
    style: alternate,
    sort: true,
    headerStyle: headerStyleColor,
    footerStyle: footerStyleColor
  }
];

  return (
    <BootstrapTable keyField='_id' data={data} columns={columns} />
  );
};

export default TotalCoursesTable;