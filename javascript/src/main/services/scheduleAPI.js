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

const fetchdeleteScheduleJSON = async (event, fields) => {
    const url = `/api/public/deleteSchedule?authorization=${fields.authorization}&id=${fields.id}`;
    const deleteSchedule = await fetch(url);
    return deleteSchedule.json();
}

const fetchgetScheduleJSON = async (event, fields) => {
    const url = `/api/public/getSchedule?authorization=${fields.authorization}&id=${fields.id}`;
    const getSchedule = await fetch(url);
    return getSchedule.json();
}

const fetchgetSchedulesJSON = async (event, fields) => {
    const url = `/api/public/getSchedules?authorization=${fields.authorization}}`;
    console.log(fields.authorization);
    const getSchedules = await fetch("/api/public/getScheduleItem",{headers:{'Authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M"}});
    return getSchedules.json();
}
//scheduleItem
const fetchAddScheduleItemJSON = async (event, fields) => {
    const url = `/api/public/addScheduleItem?authorization=${fields.authorization}&scheduleId=${fields.scheduleId}&enrollCode=${fields.enrollCode}&courseId=${fields.courseId}`;
    const addScheduleItem = await fetch(url);
    return addScheduleItem.json();
}

const fetchRemoveScheduleItemJSON = async (event, fields) => {
    const url = `/api/public/removeScheduleItem?authorization=${fields.authorization}&id=${fields.id}`;
    const removeScheduleItem = await fetch(url);
    return removeScheduleItem.json();
}

const fetchgetScheduleItemsByScheduleIdJSON = async (event, fields) => {
    const url = `/api/public/getScheduleItemsByScheduleId?authorization=${fields.authorization}&scheduleId=${fields.scheduleId}`;
    const getScheduleItemsByScheduleId = await fetch(url);
    return getScheduleItemsByScheduleId.json();
}

const fetchgetScheduleItemByIdJSON = async (event, fields) => {
    const url = `/api/public/getScheduleItemById?authorization=${fields.authorization}&id=${fields.id}`;
    const getScheduleItemById = await fetch(url);
    return getScheduleItemById.json();
}

const fetchremoveScheduleItemsByScheduleIdJSON = async (event, fields) => {
    const url = `/api/public/removeScheduleItemsByScheduleId?authorization=${fields.authorization}&scheduleId=${fields.scheduleId}`;
    const removeScheduleItemsByScheduleId = await fetch(url);
    return removeScheduleItemsByScheduleId.json();
}

export { fetchcreateScheduleJSON, fetchdeleteScheduleJSON, fetchgetScheduleJSON, fetchgetSchedulesJSON, fetchAddScheduleItemJSON, fetchRemoveScheduleItemJSON, fetchgetScheduleItemsByScheduleIdJSON, fetchgetScheduleItemByIdJSON, fetchremoveScheduleItemsByScheduleIdJSON};
    
