import React from "react";
import { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import ScheduleTable from "main/components/Schedule/ScheduleTable";

import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import { fetchWithToken } from "main/utils/fetch";
import {
  buildDeleteSchedule
} from "main/services/Schedule/scheduleServices";
import { useParams } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'

const PersonalSchedule = () => {
  const { addToast } = useToasts();
  const { getAccessTokenSilently: getToken} = useAuth0();
  const { scheduleId } = useParams();
  const { data: schedule } = useSWR([`/api/member/schedule/get/${scheduleId}`, getToken], fetchWithToken);
  const { mutate: mutateSchedules } = useSWR(["/api/member/schedule/getSchedules", getToken], fetchWithToken);
  console.log("schedule=", schedule);

  useEffect(() => {
    mutateSchedules();
  }, [mutateSchedules]);

  const deleteSchedule = buildDeleteSchedule(
    getToken,
    (response) => {
      if (response.error) {
        console.log("error message: ", response.error);
        addToast(response.error, { appearance: 'error' });
      }
      else {
        mutateSchedules();
        addToast("Schedule deleted", { appearance: 'success' });
      }
    },
    (err) => {
      console.log("error message: ", err);
      addToast("Error deleting schedule", { appearance: 'error' });
    }
  );

  console.log("schedule=", schedule);
  return (
    <Jumbotron>
      {schedule && (<ScheduleTable data={[schedule]} deleteSchedule={deleteSchedule}/>)}
    </Jumbotron>

    // course tables go here
  );
};

export default PersonalSchedule;