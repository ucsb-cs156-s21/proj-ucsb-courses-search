import { fetchWithToken } from "main/utils/fetch"

//schedule
const fetchcreateScheduleJSON = async (schedule, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/createSchedule?" + new URLSearchParams(schedule);
    
    try {
        const createSchedule = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const json = await createSchedule.json();
        onSuccess(json);
    } catch (e) {
        onError(e);
    }
}

const fetchdeleteScheduleJSON = async (id, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/deleteSchedule?" + new URLSearchParams(id);
    
    try {
        const deleteSchedule = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
            noJSON: true,
        });
        onSuccess(json);
    } catch (e) {
        onError(e);
    }
}

const fetchgetScheduleJSON = async (id, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/getSchedule?" + new URLSearchParams(id);
    
    try {
        const getSchedule = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const json = await getSchedule.json();
        onSuccess(json);
    } catch (e) {
        onError(e);
    }
}

const fetchgetSchedulesJSON = async (getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/getSchedules";
    
    try {
        const getSchedules = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const json = await getSchedules.json();
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
        const addScheduleItem = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const json = await addScheduleItem.json();
        onSuccess(json);
    } catch (e) {
        onError(e);
    }
}

const fetchremoveScheduleItemJSON = async (id, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/removeScheduleItem?" + new URLSearchParams(id);
    
    try {
        const removeScheduleItem = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
            noJSON: true,
        });
        onSuccess(json);
    } catch (e) {
        onError(e);
    }
}

const fetchgetScheduleItemsByScheduleIdJSON = async (id, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/getScheduleItemsByScheduleId?" + new URLSearchParams(id);
    
    try {
        const getScheduleItemsByScheduleId = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const json = await getScheduleItemsByScheduleId.json();
        onSuccess(json);
    } catch (e) {
        onError(e);
    }
}

const fetchgetScheduleItemByIdJSON = async (id, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/getScheduleItemsById?" + new URLSearchParams(id);
    
    try {
        const getScheduleItemById = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const json = await getScheduleItemById.json();
        onSuccess(json);
    } catch (e) {
        onError(e);
    }
}

const fetchremoveScheduleItemsByScheduleIdJSON = async (id, getToken, onSuccess, onError) => {
    const token = await getToken();
    const url = "/api/public/removeScheduleItemsByScheduleId?" + new URLSearchParams(id);
    
    try {
        const removeScheduleItemsByScheduleId = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
            noJSON: true,
        });
        onSuccess(json);
    } catch (e) {
        onError(e);
    }
}

export { fetchcreateScheduleJSON, fetchdeleteScheduleJSON, fetchgetScheduleJSON, fetchgetSchedulesJSON, fetchaddScheduleItemJSON, fetchremoveScheduleItemJSON, fetchgetScheduleItemsByScheduleIdJSON, fetchgetScheduleItemByIdJSON, fetchremoveScheduleItemsByScheduleIdJSON};
    
