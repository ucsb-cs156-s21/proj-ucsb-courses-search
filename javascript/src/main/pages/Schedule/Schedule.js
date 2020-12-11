import React from "react";
import { useState } from "react";
import { Jumbotron, Form } from "react-bootstrap";
import ScheduleSearchForm from "main/components/Schedule/ScheduleSearchForm";
import ScheduleTable from "main/components/Schedule/ScheduleTable";
import ScheduleCoursesTable from "main/components/Schedule/ScheduleCoursesTable";
import JSONPrettyCard from "main/components/Utilities/JSONPrettyCard";
import AddSchedForm from "main/components/Schedule/AddSchedForm";
import { fetchgetSchedulesJSON, fetchcreateScheduleJSON } from "main/services/scheduleAPI";
import { useAuth0 } from "@auth0/auth0-react";

var data = new Array();

const Schedule = () => {
  const [scheduleJSON, setScheduleJSON] = useState(initialScheduleJSON);
  return (
    <Jumbotron>
      <h1>Create Personal Schedule</h1>
    </Jumbotron>
  );
};

export default Schedule;
