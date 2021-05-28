import { buildCreateScheduleItem } from "main/services/Schedule/scheduleItemServices";

import { fetchWithToken } from "main/utils/fetch";

jest.mock("main/utils/fetch", () => ({
    fetchWithToken:  jest.fn()
}));

describe("ScheduleServiceItem tests", () => {

    const getToken = jest.fn();
    const onSuccess = jest.fn(); 
    const onError = jest.fn();

    beforeEach( () => {
        jest.clearAllMocks();
    });

    test("buildCreateScheduleItem and invoke createScheduleItem", async () => {
        const createScheduleItem = buildCreateScheduleItem(getToken, onSuccess, onError);
        await createScheduleItem();
        expect(onSuccess).toBeCalledTimes(1);
    });
    test("buildCreateScheduleItem where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const createScheduleItem = buildCreateScheduleItem(getToken, onSuccess, onError);
        await createScheduleItem();
        expect(onError).toBeCalledTimes(1);
    });
});
