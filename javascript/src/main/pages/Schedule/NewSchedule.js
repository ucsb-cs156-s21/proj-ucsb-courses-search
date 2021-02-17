import React from "react";
//import CourseForm from "main/components/Courses/CourseForm";
import { useAuth0 } from "@auth0/auth0-react";
//import { buildCreateCourse } from "main/services/Courses/CourseService";
import { useHistory } from "react-router-dom";  
import { useToasts } from 'react-toast-notifications'
import { buildCreateSchedule } from "main/services/Schedule/scheduleServices";
import AddSchedForm from "main/components/Schedule/AddSchedForm";



const NewSchedule = () => {
  const history = useHistory();

  const { addToast } = useToasts();

  const { getAccessTokenSilently: getToken } = useAuth0();


  const createSchedule = buildCreateSchedule(
    getToken,
    (response) => {
      if (response.error) {
        addToast(response.error, { appearance: 'error' });
      }
      else {
        history.push("/schedule");
        addToast("New Schedule Saved", { appearance: 'success' });
      }
    },
    (_err) => {
      addToast("Error saving schedule", { appearance: 'error' });
    }
  );

  return (
    <>
      <h1>Add New Schedule</h1>
      <AddSchedForm createSchedule={createSchedule}/>
    </>
  );
};

export default NewSchedule;