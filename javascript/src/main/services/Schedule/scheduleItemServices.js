import { fetchWithToken } from "main/utils/fetch";

const buildCreateScheduleItem = (getToken, onSuccess, onError) => {
  const func = async scheduleItem => {
  const url = "/api/member/scheduleItems/new?" + new URLSearchParams(scheduleItem);
    try {
      const response = await fetchWithToken(url, getToken, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(scheduleItem)
      });
      onSuccess(response);
    } catch (err) {
      onError(err);
    }
  };
  return func;
};

export { buildCreateScheduleItem };
