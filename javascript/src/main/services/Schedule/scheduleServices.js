import { fetchWithToken } from "main/utils/fetch";

const buildCreateSchedule = (getToken, onSuccess, onError) => {
  const func = async schedule => {
  const url = "/api/member/schedule/new?" + new URLSearchParams(schedule);
    try {
      const response = await fetchWithToken(url, getToken, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(schedule)
      });
      onSuccess(response);
    } catch (err) {
      console.log("err=",err);
      onError(err);
    }
  };
  return func;
};

const buildUpdateSchedule = (getToken, onSuccess, onError) => {
  const func = async (schedule, id) => {
  const url = "/api/member/schedule/update/" + id;
    try {
      await fetchWithToken(url, getToken, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(schedule)
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func;
};

const buildDeleteSchedule = (getToken, onSuccess, onError) => {
  const func = async (id) => {
  const url = "/api/member/schedule/delete/" + id;
  console.log("delete schedule url =",url);
    try {
      const response = await fetchWithToken(url, getToken, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        noJSON: true
      });
      onSuccess(response);
    } catch (err) {
      onError(err);
    }
  };
  return func;
};

export { buildCreateSchedule, buildDeleteSchedule, buildUpdateSchedule };
