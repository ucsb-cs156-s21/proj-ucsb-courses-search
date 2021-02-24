import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'

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

const FullCourseTable = ( {data} ) => {

  const columns = [{
    dataField: 'index',
    text: '#',
    style: alternate,
    headerStyle: headerStyleColor,
    footerStyle: footerStyleColor,
    hidden: true
  },{
    dataField: 'quarter',
    text: 'Quarter',
    style: alternate,
    sort: true,
    headerStyle: headerStyleColor,
    footerStyle: footerStyleColor
  },{
    dataField: 'courseId',
    text: 'Course ID',
    style: alternate,
    sort: true,
    headerStyle: headerStyleColor,
    footerStyle: footerStyleColor
  },{
    dataField: 'title',
    text: 'Course Title',
    style: alternate,
    sort: true,
    headerStyle: headerStyleColor,
    footerStyle: footerStyleColor
  }
];

  return (
    <Container>
      <Badge variant="primary" style={{fontSize:"35px", height:"50px", width:"100%"}}>Number of full courses: {data.length}</Badge>
      <BootstrapTable keyField='index' data={data} columns={columns} />
    </Container>
  );
};

export default FullCourseTable;
