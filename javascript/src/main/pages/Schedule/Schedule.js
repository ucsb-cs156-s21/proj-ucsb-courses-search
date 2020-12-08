import React from "react";
import { Jumbotron } from "react-bootstrap";
import ScheduleSearchForm from "main/components/Schedule/ScheduleSearchForm";
import ScheduleTable from "main/components/Schedule/ScheduleTable";
import ScheduleCoursesTable from "main/components/Schedule/ScheduleCoursesTable";

var data = new Array();
const Schedule = () => {
  return (
        <Jumbotron>
          <h1>Personal Schedule</h1>
        <ScheduleSearchForm/>
          <ScheduleTable courses={data} admin={true}/>

          <h1>Personal Schedule Courses List</h1>
          <ScheduleCoursesTable classes={data} /> 
          {/* delete courses in this table */}

        </Jumbotron>
  );
};

export default Schedule;
