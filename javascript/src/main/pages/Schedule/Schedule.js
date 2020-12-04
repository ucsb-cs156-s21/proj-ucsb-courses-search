import React from "react";
import { Jumbotron } from "react-bootstrap";
import ScheduleTable from "main/components/Schedule/ScheduleTable"

var temp = null

const fakeData = [
    {time:'8:00-9:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp,saturday:temp,sunday:temp},
    {time:'9:00-10:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp,saturday:temp,sunday:temp},
    {time:'10:00-11:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp,saturday:temp,sunday:temp},
    {time:'11:00-12:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp,saturday:temp,sunday:temp},
    {time:'12:00-13:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp,saturday:temp,sunday:temp},
    {time:'13:00-14:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp,saturday:temp,sunday:temp},
    {time:'13:00-14:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp,saturday:temp,sunday:temp},
    {time:'14:00-15:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp,saturday:temp,sunday:temp},
    {time:'15:00-16:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp,saturday:temp,sunday:temp},
    {time:'16:00-17:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp,saturday:temp,sunday:temp},
    {time:'17:00-18:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp,saturday:temp,sunday:temp},
    {time:'18:00-19:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp,saturday:temp,sunday:temp},
    {time:'19:00-20:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp,saturday:temp,sunday:temp},
    {time:'20:00-21:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp,saturday:temp,sunday:temp},
    {time:'21:00-22:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp,saturday:temp,sunday:temp}
]
const Schedule = () => {
  return (
        <Jumbotron>
          <h1>Personal Schedule features coming soon</h1>
          <ScheduleTable courses={fakeData} admin={true}/>
        </Jumbotron>
  );
};

export default Schedule;
