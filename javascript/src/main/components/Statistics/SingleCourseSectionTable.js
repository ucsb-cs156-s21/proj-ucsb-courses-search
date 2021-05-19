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
    dataField: 'instructors',
    text: 'Professor Name',
    style: alternate,
    sort: true,
    headerStyle: headerStyleColor,
    footerStyle: footerStyleColor,
    formatter: (cell, row) => renderInstructors(cell, row),
    csvFormatter: (cell, row) => renderInstructors(cell, row)
  },{
    dataField: 'timesTaught',
    text: 'Times Taught',
    style: alternate,
    sort: true,
    headerStyle: headerStyleColor,
    footerStyle: footerStyleColor
    formatter: (cell, row) => renderInstructors(cell, row),
    csvFormatter: (cell, row) => renderInstructors(cell, row)
  }
];

const renderInstructors = (_cell, row) => {
  const instructor = (row.instructors.length > 0) ? row.instructors[0].instructor : "TBD";
  return (instructor)
}

  return (
    <Container>
      <BootstrapTable keyField='index' data={data} columns={columns} />
    </Container>
  );
};

export default SingleCourseSectionTable;