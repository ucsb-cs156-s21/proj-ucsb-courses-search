import React from "react";
import { render } from "@testing-library/react";
import AppFooter from "main/components/Footer/AppFooter";
import { buildCreateSchedule, buildDeleteSchedule, buildUpdateSchedule } from "main/services/Schedule/scheduleServices";

import { fetchWithToken } from "main/utils/fetch";

jest.mock("main/utils/fetch", () => ({
    fetchWithToken:  jest.fn()
}));

describe("ScheduleService tests", () => {

    const getToken = jest.fn();
    const onSuccess = jest.fn(); 
    const onError = jest.fn();

    beforeEach( () => {
        jest.clearAllMocks();
    });

    test("buildCreateSchedule and invoke createSchedule", async () => {
        const createSchedule = buildCreateSchedule(getToken, onSuccess, onError);
        await createSchedule();
        expect(onSuccess).toBeCalledTimes(1);
    });
    test("buildUpdateSchedule and invoke updateSchedule", async () => {
        const updateSchedule = buildUpdateSchedule(getToken, onSuccess, onError);
        await updateSchedule();
        expect(onSuccess).toBeCalledTimes(1);
    });
    test("buildDeleteSchedule and invoke deleteSchedule", async () => {
        const deleteSchedule = buildDeleteSchedule(getToken, onSuccess, onError);
        await deleteSchedule();        
        expect(onSuccess).toBeCalledTimes(1);
    });
    test("buildCreateSchedule where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const createSchedule = buildCreateSchedule(getToken, onSuccess, onError);
        await createSchedule();
        expect(onError).toBeCalledTimes(1);
    });

    test("buildUpdateSchedule where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const updateSchedule = buildUpdateSchedule(getToken, onSuccess, onError);
        await updateSchedule();
        expect(onError).toBeCalledTimes(1);
    });

    test("buildDeleteSchedule where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const deleteSchedule = buildDeleteSchedule(getToken, onSuccess, onError);
        await deleteSchedule();
        expect(onError).toBeCalledTimes(1);
    });
});
