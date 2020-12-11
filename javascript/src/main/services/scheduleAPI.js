import { fetchWithToken } from "main/utils/fetch"



//schedule
const fetchcreateScheduleJSON = async (schedule, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/createSchedule?" + new URLSearchParams(schedule);
    try {
        const json = await fetchWithToken(url, getToken, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"

            }
        });
        onSuccess(json);
    } catch (e) {
        onError(e);
    }
}

const fetchdeleteScheduleJSON = async (id, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/deleteSchedule?" + new URLSearchParams(id);
    
    try {
        const deleteSchedule = await fetchWithToken(url, getToken, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            },
            noJSON: true,
        });
        onSuccess();
    } catch (e) {
        onError(e);
    }
}

const fetchgetScheduleJSON = async (id, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/getSchedule?" + new URLSearchParams(id);
    console.log("Getting schedule...");
    try {
        const json = await fetchWithToken(url, getToken, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            }
        });
        onSuccess(json);
        return json;
    } catch (e) {
        onError(e);
    }
}

const fetchgetSchedulesJSON = async (getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/getSchedules";
    
    try {
        const json = await fetchWithToken(url, getToken, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"

            }
        });
        onSuccess(json);
    } catch (e) {
        onError(e);
    }
}

//scheduleItem
const fetchaddScheduleItemJSON = async (scheduleItem, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/addScheduleItem?" + new URLSearchParams(scheduleItem);
    
    try {
        const json = await fetchWithToken(url, getToken, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            }
        });
        onSuccess(json);
    } catch (e) {
        onError(e);
    }
}

const fetchremoveScheduleItemJSON = async (id, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/removeScheduleItem?" + new URLSearchParams(id);
    
    try {
        const removeScheduleItem = await fetchWithToken(url, getToken, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            },
            noJSON: true,
        });
        onSuccess();
    } catch (e) {
        onError(e);
    }
}

const fetchgetScheduleItemsByScheduleIdJSON = async (id, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/getScheduleItemsByScheduleId?" + new URLSearchParams(id);
    
    try {
        const json = await fetchWithToken(url, getToken, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            }
        });
        onSuccess(json);
    } catch (e) {
        onError(e);
    }
}

const fetchgetScheduleItemByIdJSON = async (id, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/getScheduleItemsById?" + new URLSearchParams(id);
    
    try {
        const json = await fetchWithToken(url, getToken, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            }
        });
        onSuccess(json);
    } catch (e) {
        onError(e);
    }
}

const fetchremoveScheduleItemsByScheduleIdJSON = async (id, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/removeScheduleItemsByScheduleId?" + new URLSearchParams(id);
    
    try {
        const removeScheduleItemsByScheduleId = await fetchWithToken(url, getToken, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            },
            noJSON: true,
        });
        onSuccess();
    } catch (e) {
        onError(e);
    }
}

export { fetchcreateScheduleJSON, fetchdeleteScheduleJSON, fetchgetScheduleJSON, fetchgetSchedulesJSON, fetchaddScheduleItemJSON, fetchremoveScheduleItemJSON, fetchgetScheduleItemsByScheduleIdJSON, fetchgetScheduleItemByIdJSON, fetchremoveScheduleItemsByScheduleIdJSON};
    
