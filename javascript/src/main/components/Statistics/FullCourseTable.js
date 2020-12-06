import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'

const white = {
  backgroundColor: '#ffffff'
};

const d2d4d7 = {
  backgroundColor: '#d2d4d7'
}

const alternate = (cell, row, rowIndex, colIndex) => {
  if (rowIndex % 2 === 0) 
    return { backgroundColor: '#e9ecef' };
  else
    return { backgroundColor: '#edf0f2' };
};

const defaultSorted = [{
  dataField: 'index',
  order: 'desc'
}];

const FullCourseTable = ( {data} ) => {

  const columns = [{
    dataField: 'index',
    text: '#',
    style: alternate,
    headerStyle: white,
    footerStyle: d2d4d7,
    hidden: true
  },
  {
    dataField: 'quarter',
    text: 'Quarter',
    style: alternate,
    sort: true,
    headerStyle: white,
    footerStyle: d2d4d7,
  },{
    dataField: 'title',
    text: 'Course Title',
    style: alternate,
    sort: true,
    headerStyle: white,
    footerStyle: d2d4d7
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
