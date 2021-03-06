import React from "react";
import { reformatJSON } from 'main/utils/BasicCourseTableHelpers';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

const BasicCourseCSV = ({ classes }) => {
  const sections = reformatJSON(classes);

  const rowStyle = (row, _rowIndex) => {
    return (row.section % 100 === 0) ? { backgroundColor: '#CEDEFA' } : { backgroundColor: '#EDF3FE' };
  }

  const renderSectionTimes = (_cell, row) => {

    const times = (row.timeLocations.length > 0) ? (row.timeLocations[0].beginTime + " - " + row.timeLocations[0].endTime) : ("TBD");
    return times
  }
  const renderSectionDays = (_cell, row) => {

    const days = (row.timeLocations.length > 0) ? (row.timeLocations[0].days) : ("TBD");
    return days
  }
  const renderCourseId = (_cell, row) => {
    const courseId = (row.section % 100 === 0) ? row.course.courseId : "";
    return (courseId)
  }
  const renderCourseTitle = (_cell, row) => {
    const courseTitle = (row.section % 100 === 0) ? row.course.title : "";
    return (courseTitle)
  }
  const renderInstructors = (_cell, row) => {
    const instructor = (row.instructors.length > 0) ? row.instructors[0].instructor : "TBD";
    return (instructor)
  }


  const { ExportCSVButton } = CSVExport;
  const columns = [{
    dataField: 'course.courseId',
    text: 'Course Number',
    isDummyField: true,
    formatter: (cell, row) => renderCourseId(cell, row),
    csvFormatter: (cell, row) => renderCourseId(cell, row)
  }, {
    dataField: 'course.title',
    text: 'Title',
    isDummyField: true,
    formatter: (cell, row) => renderCourseTitle(cell, row),
    csvFormatter: (cell, row) => renderCourseTitle(cell, row)
  }, {
    dataField: 'section',
    text: 'Section'
  }, {
    dataField: "instructors",
    text: "Instructor",
    isDummyField: true,
    formatter: (cell, row) => renderInstructors(cell, row),
    csvFormatter: (cell, row) => renderInstructors(cell, row)
  }, {
    dataField: 'enrollCode',
    text: 'Enroll Code'
  }, {
    dataField: 'days',
    text: 'Days',
    formatter: (cell, row) => renderSectionDays(cell, row),
    csvFormatter: (cell, row) => renderSectionDays(cell, row)
  }, {
    dataField: 'times',
    text: 'Time',
    formatter: (cell, row) => renderSectionTimes(cell, row),
    csvFormatter: (cell, row) => renderSectionTimes(cell, row)
  }, {
    dataField: 'course.unitsFixed',
    text: 'Unit'
  }
  ];
  return (
    <ToolkitProvider
      keyField="enrollCode"
      data={sections}
      columns={columns}
      rowStyle={rowStyle}
      exportCSV
    >
      {
        props => (
          <div>
            <ExportCSVButton {...props.csvProps}>Export CSV!!</ExportCSVButton>

            <BootstrapTable { ...props.baseProps } />
          </div>
          
        )
      }
    </ToolkitProvider>
  );
};
export default BasicCourseCSV;
