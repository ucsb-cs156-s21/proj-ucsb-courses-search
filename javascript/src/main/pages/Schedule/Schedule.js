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
  const { getAccessTokenSilently: getToken} = useAuth0();
  const initialScheduleJSON = {
    "pageNumber": 1,
    "pageSize": 1,
    "total": 0,
    "schedules": []
  };

  const initialClassJSON = {
    "classes": [
      {
        "courseId": "CMPSC     8  ",
        "title": "INTRO TO COMP SCI",
        "unitsFixed": 4,
        "days": " T R   ",
        "beginTime": "09:30",
        "endTime": "10:45"
      },
      {
        "courseId": "CMPSC    24  ",
        "title": "PROBLEM SOLVING II",
        "unitsFixed": 4,
        "days": "   R   ",
        "beginTime": "09:00",
        "endTime": "09:50"
      },
      {
        "courseId": "MATH      2B ",
        "title": "CALC W/ ALG & TRIG",
        "unitsFixed": 5, 
        "days": "M W    ",
        "beginTime": "19:00",
        "endTime": "19:50"
      }

    ]

  };

  const [scheduleJSON, setScheduleJSON] = useState(initialScheduleJSON);
  return (
    <Jumbotron>
      <h1>Create Personal Schedule</h1>


    </Jumbotron>
  );
};

export default Schedule;
