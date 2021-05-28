import React from "react";
import { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import AddToScheduleTable from "main/components/Schedule/AddToScheduleTable";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import {
  buildCreateScheduleItem
} from "main/services/Schedule/scheduleItemServices";
import { fetchWithToken } from "main/utils/fetch";
import { useToasts } from 'react-toast-notifications'

const AddToSchedule = () => {
  const { addToast } = useToasts();
  const { getAccessTokenSilently: getToken} = useAuth0();
  const { data: schedules, mutate: mutateSchedules } = useSWR(["/api/member/schedule/getSchedules", getToken], fetchWithToken);

  useEffect(() => {
    mutateSchedules();
  }, [mutateSchedules]);

  const createScheduleItem = buildCreateScheduleItem(
    getToken,
    (response) => {
      if (response.error) {
        addToast(response.error, { appearance: 'error' });
      }
      else {
        mutateSchedules();
        addToast("Schedule item created", { appearance: 'success' });
      }
    },
    (_err) => {
      addToast("Error creating schedule item", { appearance: 'error' });
    }
  );

  return (
    <Jumbotron>
      <h1>
      Choose the schedule to add the course to
      </h1>
      <p>
      The Add To Schedule page is intended as a place where students, faculty or staff can choose which schedule they want to add the course to.
      </p>
      {schedules && (<AddToScheduleTable data={schedules} createScheduleItem={createScheduleItem}/>)}
    </Jumbotron>
  );
};

export default AddToSchedule;