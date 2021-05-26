import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
import { useAuth0 } from '@auth0/auth0-react';
import { reformatJSON } from 'main/utils/BasicCourseTableHelpers';
import { yyyyqToQyy } from 'main/utils/quarterUtilities';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { availabilityColors } from "main/utils/BasicCourseTableHelpers"


const BasicCourseTable = ({ classes, checks, displayQuarter, allowExport }) => {
  const { isAuthenticated } = useAuth0();
  const sections = reformatJSON(classes, checks);

  const COLOR_UNAVAILABLE = availabilityColors.UNAVAILABLE;
  const COLOR_CLOSEFULL = availabilityColors.CLOSEFULL;

  const COLOR_AVAILABLELECTUREORCLASSWITHSECTIONS = {backgroundColor: '#CEDEFA'};
  const COLOR_AVAILABLESECTION = {backgroundColor: '#EDF3FE', fontStyle: 'italic'};
  const COLOR_UNAVAILABLESECTION = {backgroundColor: '#FF8080', fontStyle: 'italic' };
  const COLOR_CLOSEFULLSECTION = {backgroundColor: '#FFD761', fontStyle: 'italic' };
  const CLOSEFULL_THRESHOLD=0.2;
  const classUnavailable = (row) => (row.enrolledTotal >= row.maxEnroll || row.courseCancelled === "Y" || row.classClosed ==="Y"); 

  const closeToFull = (row) => ((row.maxEnroll - row.enrolledTotal) < (CLOSEFULL_THRESHOLD * row.maxEnroll));

  const rowStyle = (row) => {
    if (row.section % 100 === 0) {
      //We interate through all the classes, for the first section (should be the mod 100 == 0 section) if it is equal to the section we are setting
      //the color to we do something.

      for (var i in classes) {
        if (classes[i].classSections.length > 0 && classes[i].classSections[0].enrollCode === row.enrollCode && classes[i].classSections[0].section === row.section) {
          if (classes[i].classSections.length === 1) {
            //This code should only execute when dealing with stand alone lectures.
            if (classUnavailable(row)) {
              return COLOR_UNAVAILABLE;
            }
            if (closeToFull(row)) {
              return COLOR_CLOSEFULL;
            }
          }
        }
      }
      //If it is not a stand alone lecture that is unavailable or full and is just a class set it to dark blue.
      return COLOR_AVAILABLELECTUREORCLASSWITHSECTIONS;
    }
    else {
      //This code should only execute when dealing with sections.
      if (classUnavailable(row)) {
        return COLOR_UNAVAILABLESECTION;
      }
      if (closeToFull(row)) {
        return COLOR_CLOSEFULLSECTION;
      }
      return COLOR_AVAILABLESECTION;
    }
  }
  const renderCourseEnrolled = (_cell, row) => {
    const enrolled = row.enrolledTotal;
    return (enrolled)
  }
  const renderCourseCapacity = (_cell, row) => {
    const capacity = row.maxEnroll;
    return (capacity)
  }
  const renderSectionTimes = (_cell, row) => {

    const times = ( (row.timeLocations.length > 0) && (row.timeLocations[0].days !== null) ) ? (row.timeLocations[0].beginTime + " - " + row.timeLocations[0].endTime) : ("TBD");
    
    if(times === "TBD"){
      return times
    }

    if (row.timeLocations.length > 0) {
      const startHours = (row.timeLocations[0].beginTime.substring(0, 1) !== "0") ? parseInt(row.timeLocations[0].beginTime.substring(0, 2)) : parseInt(row.timeLocations[0].beginTime.substring(1, 2));
      const endHours = (row.timeLocations[0].endTime.substring(0, 1) !== "0") ? parseInt(row.timeLocations[0].endTime.substring(0, 2)) : parseInt(row.timeLocations[0].endTime.substring(1, 2));
      const startDisplayHours = (startHours === 12) ? (startHours) : (startHours % 12);
      const endDisplayHours = (endHours === 12) ? (endHours) : (endHours % 12);
      const timeTypeStart = (startHours > 11) ? ("PM") : ("AM");
      const timeTypeEnd = (endHours > 11) ? ("PM") : ("AM");
      var resultStart = startDisplayHours.toString();
      var resultEnd = endDisplayHours.toString();
      if(startDisplayHours < 10) {
        resultStart = "0" + startDisplayHours.toString();
      }
      if(endDisplayHours < 10) {
        resultEnd = "0" + endDisplayHours.toString();
      }
      return (resultStart + row.timeLocations[0].beginTime.substring(2) + timeTypeStart + " - " + resultEnd + row.timeLocations[0].endTime.substring(2) + timeTypeEnd)
    }
    return ("TBD")
  }
  const renderSectionDays = (_cell, row) => {

    const days = ( (row.timeLocations.length > 0) && (row.timeLocations[0].days !== null) ) ? (row.timeLocations[0].days) : ("TBD");
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
  const renderQuarter = (_cell, row) => {
    const quarter = yyyyqToQyy(row.course.quarter);
    return (row.section % 100 === 0) ? quarter : "";
  }

  const RenderAddButton = (_cell, row, rowIndex) => {
    if (isAuthenticated) {
      if (!sections[rowIndex + 1]) {
        return (
          <Button variant="primary" data-testid={`add-button-${row.enrollCode}`} onClick={() => {
            //return addToSchedule(row.course.courseId);
          }}>Add</Button>
        )
      }
      else {
        if ((sections[rowIndex + 1]).section % 100 === 0 || row.section % 100 !== 0) {
          return (
            <Button variant="primary" data-testid={`add-button-${row.enrollCode}`} onClick={() => {
              //return addToSchedule(row.course.courseId);
            }}>Add</Button>
          )
        }
      }
    }
  }

  const columns = [{
    dataField: 'course.courseId',
    text: 'Course Number',
    formatter: (cell, row) => renderCourseId(cell, row),
    csvFormatter: (cell, row) => renderCourseId(cell, row)
  }, {
    dataField: 'course.title',
    text: 'Title',
    formatter: (cell, row) => renderCourseTitle(cell, row),
    csvFormatter: (cell, row) => renderCourseTitle(cell, row)
  }, {
    dataField: 'section',
    text: 'Section'
  }, {
    dataField: "instructors",
    text: "Instructor",
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
    dataField: 'enrolledTotal',
    text: 'Enrolled',
    formatter: (cell, row) => renderCourseEnrolled(cell, row),
    csvFormatter: (cell, row) => renderCourseEnrolled(cell, row)
  }, {
    dataField: 'maxEnroll',
    text: 'Course Capacity',
    formatter: (cell, row) => renderCourseCapacity(cell, row),
    csvFormatter: (cell, row) => renderCourseCapacity(cell, row)
  }, {
    dataField: 'course.unitsFixed',
    text: 'Unit',
    csvExport: false
  }, {
    dataField: "add",
    text: "Add",
    isDummyField: true,
    formatter: (cell, row, rowIndex) => RenderAddButton(cell, row, rowIndex),
    csvExport: false
  }
  ];

  if (displayQuarter) {
    columns.unshift(
      {
        dataField: 'course.quarter',
        text: 'Quarter',
        formatter: (cell, row) => renderQuarter(cell, row),
        csvFormatter: (cell, row) => renderQuarter(cell, row)
      }
    )
  }


  const ExportCSVButton = (props) => {
    const handleClick = () => {
      props.onExport();
    };
    if (allowExport) {
      return (
        <div>
          <Button onClick={handleClick}>
            Download as CSV
            </Button>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  };

  const csvColumns = columns;
  csvColumns.unshift(
    {
      dataField: 'course.quarter',
      text: 'YYYYQ'
    }
  );

  if ((sections.length === 0) || (sections===null)) {
    return (
      <div data-testid="no-course-data">
      </div>
    )
  }
  
  return (
    <ToolkitProvider
      keyField="uniqueKey"
      data={sections}
      columns={csvColumns}
      exportCSV={{
        fileName: 'CourseTable.csv',
        blobType: 'csv/text;charset=utf-8'
      }}
    >
      {
        props => (
          <div>
            <ExportCSVButton {...props.csvProps} />
            <hr />
            <BootstrapTable keyField="uniqueKey" columns={columns} rowStyle={rowStyle} {...props.baseProps} />
          </div>
        )
      }
    </ToolkitProvider>
  );
};
export default BasicCourseTable;