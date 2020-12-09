import React from "react";
import { Jumbotron,Form } from "react-bootstrap";
import ScheduleSearchForm from "main/components/Schedule/ScheduleSearchForm";
import ScheduleTable from "main/components/Schedule/ScheduleTable";
import ScheduleCoursesTable from "main/components/Schedule/ScheduleCoursesTable";
import AddSchedForm from "main/components/Schedule/AddSchedForm";

var data = new Array();

const Schedule = () => {
  return (
        <Jumbotron>
          <h1>Create Personal Schedule</h1>
          <AddSchedForm/>
          <Form.Group> </Form.Group>

         <h1>Load Schedule</h1>
          <ScheduleSearchForm/>
          <Form.Group> </Form.Group>
          <h1>Personal Schedule</h1>
          <ScheduleTable courses={data} admin={true}/>
          <Form.Group> </Form.Group>
          <h1>Personal Schedule Courses List</h1>
          <ScheduleCoursesTable classes={data} /> 
          {/* delete courses in this table */}

        </Jumbotron>
  );
};

export default Schedule;
