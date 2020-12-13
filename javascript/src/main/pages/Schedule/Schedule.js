import React from "react";
import { useState } from "react";
import { Jumbotron, Form } from "react-bootstrap";
import ScheduleSearchForm from "main/components/Schedule/ScheduleSearchForm";
import ScheduleCoursesTable from "main/components/Schedule/ScheduleCoursesTable";
import ScheduleTable from "main/components/Schedule/ScheduleTable";
import JSONPrettyCard from "main/components/Utilities/JSONPrettyCard";
import AddSchedForm from "main/components/Schedule/AddSchedForm";
import { fetchGetScheduleJSON, fetchCreateScheduleJSON, fetchDeleteScheduleJSON, fetchGetSchedulesJSON} from "main/services/scheduleAPI";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import { fetchWithToken } from "main/utils/fetch";
import {
  buildCreateSchedule,
  buildDeleteSchedule,
  buildUpdateSchedule
} from "main/services/Schedule/scheduleServices";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'

var data = new Array();

const Schedule = () => {
  const { addToast } = useToasts();
  const { getAccessTokenSilently: getToken} = useAuth0();
  const { data: schedules } = useSWR(["/api/member/schedule/getSchedules", getToken], fetchWithToken);
  const history = useHistory();
  console.log("schedules=",schedules);

  const deleteSchedule = buildDeleteSchedule(
    getToken,
    (response) => {
      if (response.error) {
        console.log("error message: ", response.error);
        addToast(response.error, { appearance: 'error' });
      }
      else {
        history.push("/schedule");
        addToast("Schedule deleted", { appearance: 'success' });
      }
    },
    (err) => {
      console.log("error message: ", err);
      addToast("Error deleting schedule", { appearance: 'error' });
    }
  );

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

  const [scheduleJSON,setScheduleJSON] = useState("");

  return (
    <Jumbotron>
      <Button
          data-testid={`new-schedule-button`}
          onClick={() => history.push("/schedule/new")}
        >
          New Schedule
        </Button>
      {schedules && (<ScheduleTable data={schedules} deleteSchedule={deleteSchedule}/>)}
      <ScheduleCoursesTable classes={initialClassJSON} />

    </Jumbotron>
  );
};

export default Schedule;