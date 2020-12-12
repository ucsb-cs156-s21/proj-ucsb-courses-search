import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetch from "isomorphic-unfetch";
jest.mock("isomorphic-unfetch");

import ScheduleSearchForm from "main/components/Schedule/ScheduleSearchForm";
import JSONPretty from "react-json-pretty";


describe("ScheduleSearchForm tests", () => {

    test("renders without crashing", () => {
        render(<ScheduleSearchForm />);
    });

    test("when I type an id, the state for id changes", () => {
        const { getByTestId } = render(<ScheduleSearchForm />);
        const schedName = getByTestId("schedule-id")
        userEvent.type(schedName, "123");
        expect(schedName.value).toBe("123");
    });


    test("when I click Get Schedule, the right stuff happens", async () => {

        const sampleReturnValue = {
            "sampleKey": "sampleValue"
        };

        // Create spy functions (aka jest function, magic function)
        // The function doesn't have any implementation unless
        // we specify one.  But it does keep track of whether
        // it was called, how many times it was called,
        // and what it was passed.


        const getSpy = jest.fn();
        const deleteSpy = jest.fn();
        const token = "token";
        const success = "success";
        const error = "error";

        getSpy.mockResolvedValue(sampleReturnValue);

        const { getByTestId } = render(
            <ScheduleSearchForm  deleteSchedule={deleteSpy} getSchedule={getSpy} getToken={token} onSuccess={success} onError={error} />
        );

        const expectedFields = {
            id: "123",
        };

        const schedId = getByTestId("schedule-id")
        userEvent.type(schedId, "123");


        const submitButton = getByTestId("schedule-get");
        userEvent.click(submitButton);

        // we need to be careful not to assert this expectation
        // until all of the async promises are resolved
        await waitFor(() => expect(getSpy).toHaveBeenCalledTimes(1));

        // assert that ourSpy was called with the right value
        expect(getSpy).toHaveBeenCalledWith(expectedFields, "token", "success", "error");

    });

    test("when I click Get Schedule, the right stuff happens", async () => {

        const sampleReturnValue = {
            "sampleKey": "sampleValue"
        };

        // Create spy functions (aka jest function, magic function)
        // The function doesn't have any implementation unless
        // we specify one.  But it does keep track of whether
        // it was called, how many times it was called,
        // and what it was passed.


        const getSpy = jest.fn();
        const deleteSpy = jest.fn();
        const token = "token";
        const success = "success";
        const error = "error";

        getSpy.mockResolvedValue(sampleReturnValue);

        const { getByTestId } = render(
            <ScheduleSearchForm  deleteSchedule={deleteSpy} getSchedule={getSpy} getToken={token} onSuccess={success} onError={error} />
        );

        const expectedFields = {
            id: "123",
        };

        const schedId = getByTestId("schedule-id")
        userEvent.type(schedId, "123");


        const submitButton = getByTestId("schedule-delete");
        userEvent.click(submitButton);

        // we need to be careful not to assert this expectation
        // until all of the async promises are resolved
        await waitFor(() => expect(deleteSpy).toHaveBeenCalledTimes(1));



        // assert that ourSpy was called with the right value
        expect(deleteSpy).toHaveBeenCalledWith(expectedFields, "token", "error");

    });

});