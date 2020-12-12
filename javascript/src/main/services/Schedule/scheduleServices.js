import { fetchWithToken } from "main/utils/fetch";

const buildCreateSchedule = (getToken, onSuccess, onError) => {
  const func = async schedule => {
  const url = "/api/member/schedule/new?" + new URLSearchParams(schedule);
    try {
      await fetchWithToken(url, getToken, {
        method: "POST",
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

const buildUpdateSchedule = (getToken, onSuccess, onError) => {
  const func = async (item, id) => {
  const url = "/api/member/schedule/update?" + new URLSearchParams(schedule);
    try {
      await fetchWithToken(url, getToken, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(item)
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func;
};

const buildDeleteSchedule = (getToken, onSuccess, onError) => {
  const func = async id => {
  const url = "/api/member/schedule/delete?" + new URLSearchParams(schedule);
    try {
      await fetchWithToken(url, getToken, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        noJSON: true
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func;
};

export { buildCreateSchedule, buildDeleteSchedule, buildUpdateSchedule };
