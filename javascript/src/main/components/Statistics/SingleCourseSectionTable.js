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

const SingleCourseSectionTable = ( {data} ) => {

  const columns = [{
    dataField: 'professor',
    text: 'Professor Name',
    style: alternate,
    sort: true,
    headerStyle: headerStyleColor,
    footerStyle: footerStyleColor,
    //formatter: (cell, row) => renderInstructors(cell, row),
    //csvFormatter: (cell, row) => renderInstructors(cell, row)
  },{
    dataField: 'professorCount',
    text: 'Times Taught',
    style: alternate,
    sort: true,
    headerStyle: headerStyleColor,
    footerStyle: footerStyleColor
    // formatter: (cell, row) => renderInstructors(cell, row),
    // csvFormatter: (cell, row) => renderInstructors(cell, row)
  }
];

const renderInstructors = (_cell, row) => {
  console.log(row);
  const instructor = (row.classSections[0].instructors[0].instructor);
  return (instructor)
}

  return (
    <Container>
      <BootstrapTable keyField='index' data={data} columns={columns} />
    </Container>
  );
};

export default SingleCourseSectionTable;