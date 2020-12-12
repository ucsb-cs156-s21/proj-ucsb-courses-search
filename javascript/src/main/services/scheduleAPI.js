import { fetchWithToken } from "main/utils/fetch"



//schedule
const fetchCreateScheduleJSON = async (schedule, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/member/schedule/new?" + new URLSearchParams(schedule);
    try {
        const json = await fetchWithToken(url, getToken, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            }
        });
        onSuccess(json);
    } catch (e) {
        onError(e);
    }
}

const fetchDeleteScheduleJSON = async (id, getToken, onError) => {
    const token = await getToken();
    const url = "/api/member/schedule/delete?" + new URLSearchParams(id);
    
    try {
        const deleteSchedule = await fetchWithToken(url, getToken, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
            noJSON: true,
        });
    } catch (e) {
        onError(e);
    }
}

const fetchGetScheduleJSON = async (id, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/member/schedule/get?" + new URLSearchParams(id);
    console.log("Getting schedule...");
    try {
        const json = await fetchWithToken(url, getToken, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        });
        onSuccess(json);
        return json;
    } catch (e) {
        onError(e);
    }
}

const fetchGetSchedulesJSON = async (getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/member/schedule/getSchedules";
    
    try {
        const json = await fetchWithToken(url, getToken, {
            method: "GET",
            headers: {
                "content-type": "application/json"

            }
        });
        onSuccess(json);
    } catch (e) {
        onError(e);
    }
}

export { fetchCreateScheduleJSON, fetchDeleteScheduleJSON, fetchGetScheduleJSON, fetchGetSchedulesJSON};