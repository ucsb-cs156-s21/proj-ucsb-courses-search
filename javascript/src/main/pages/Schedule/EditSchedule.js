import React from "react";
import useSWR, { cache } from "swr";
import AddSchedForm from "main/components/Schedule/AddSchedForm";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import { useParams, useHistory } from "react-router-dom";
import { buildUpdateSchedule } from "main/services/Schedule/scheduleServices";
import { useToasts } from "react-toast-notifications";

const EditSchedule = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const { scheduleId } = useParams();
  const { getAccessTokenSilently: getToken } = useAuth0();
  const updateSchedule = buildUpdateSchedule(
    getToken,
    () => {
      history.push("/schedule");
      addToast("Schedule updated", { appearance: "success" });
    },
    () => {
      addToast("Error saving schedule", { appearance: "error" });
    }
  );

  cache.clear();
  const { data: schedule } = useSWR(
    [`/api/member/schedule/get/${scheduleId}`, getToken],
    fetchWithToken
  );

  return (
    <>
      <h1>Edit Schedule</h1>
      {schedule ? (
        <AddSchedForm updateSchedule={updateSchedule} existingSchedule={schedule} />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EditSchedule;