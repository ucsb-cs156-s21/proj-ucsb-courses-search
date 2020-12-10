import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'

<<<<<<< HEAD
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

const alternate = (cell, row, rowIndex, colIndex) => {
  if (rowIndex % 2 === 0) 
    return evenRows;
  else
    return oddRows;
=======
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
>>>>>>> 879ed3d54fa655e14fda87d74d849b8879ab3907
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
<<<<<<< HEAD
    headerStyle: headerStyleColor,
    footerStyle: footerStyleColor,
=======
    headerStyle: white,
    footerStyle: d2d4d7,
>>>>>>> 879ed3d54fa655e14fda87d74d849b8879ab3907
    hidden: true
  },{
    dataField: 'quarter',
    text: 'Quarter',
    style: alternate,
    sort: true,
<<<<<<< HEAD
    headerStyle: headerStyleColor,
    footerStyle: footerStyleColor
=======
    headerStyle: white,
    footerStyle: d2d4d7
>>>>>>> 879ed3d54fa655e14fda87d74d849b8879ab3907
  },{
    dataField: 'courseId',
    text: 'Course ID',
    style: alternate,
    sort: true,
<<<<<<< HEAD
    headerStyle: headerStyleColor,
    footerStyle: footerStyleColor
=======
    headerStyle: white,
    footerStyle: d2d4d7
>>>>>>> 879ed3d54fa655e14fda87d74d849b8879ab3907
  },{
    dataField: 'title',
    text: 'Course Title',
    style: alternate,
    sort: true,
<<<<<<< HEAD
    headerStyle: headerStyleColor,
    footerStyle: footerStyleColor
=======
    headerStyle: white,
    footerStyle: d2d4d7
>>>>>>> 879ed3d54fa655e14fda87d74d849b8879ab3907
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
