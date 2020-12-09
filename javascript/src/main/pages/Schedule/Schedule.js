import React from "react";
import { useState } from "react";
import { Jumbotron, Form } from "react-bootstrap";
import ScheduleSearchForm from "main/components/Schedule/ScheduleSearchForm";
import ScheduleTable from "main/components/Schedule/ScheduleTable";
import ScheduleCoursesTable from "main/components/Schedule/ScheduleCoursesTable";
import JSONPrettyCard from "main/components/Utilities/JSONPrettyCard";
import AddSchedForm from "main/components/Schedule/AddSchedForm";
import { fetchgetSchedulesJSON } from "main/services/scheduleAPI";

var data = new Array();

const Schedule = () => {
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
      <AddSchedForm />
      <Form.Group> </Form.Group>

      <h1>Load Schedule</h1>
      <ScheduleSearchForm setScheduleJSON={setScheduleJSON} fetchJSON={fetchgetSchedulesJSON} />
      <Form.Group> </Form.Group>
      <h1>Personal Schedule</h1>
      <ScheduleTable courses={initialClassJSON} admin={true} />
      <JSONPrettyCard
        expression={"scheduleJSON"}
        value={scheduleJSON}
      />
      <Form.Group> </Form.Group>
      <h1>Personal Schedule Courses List</h1>
      <ScheduleCoursesTable classes={initialClassJSON} />
      {/* delete courses in this table */}

    </Jumbotron>
  );
};

export default Schedule;
