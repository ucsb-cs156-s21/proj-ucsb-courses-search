import React from "react";
import { Jumbotron } from "react-bootstrap";
import ScheduleSearchForm from "main/components/Schedule/ScheduleSearchForm";
import ScheduleTable from "main/components/Schedule/ScheduleTable"

var data = new Array();
const Schedule = () => {
  return (
        <Jumbotron>
          <h1>Personal Schedule</h1>
        <ScheduleSearchForm/>
          <ScheduleTable courses={data} admin={true}/>
        </Jumbotron>
  );
};

export default Schedule;
