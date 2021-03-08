import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TotalCoursesForm from "main/components/Statistics/TotalCoursesForm";
jest.mock("isomorphic-unfetch"); 

describe("TotalCoursesForm tests", () => {

    test("renders without crashing", () => {
        render(<TotalCoursesForm />);
    });

    test("when I select a start quarter, the state for start quarter changes", () => {
        const { getByTestId } = render(<TotalCoursesForm />);
        const selectQuarter = getByTestId("select-start-quarter")
        userEvent.selectOptions(selectQuarter, "3");
        expect(selectQuarter.value).toBe("3");
    });

    test("when I select a start quarter year, the state for start quarter year changes", () => {
        const { getByTestId } = render(<TotalCoursesForm />);
        const selectQuarter = getByTestId("select-start-year")
        userEvent.selectOptions(selectQuarter, "2019");
        expect(selectQuarter.value).toBe("2019");
    });

    test("when I click submit, the right stuff happens", async () => {

        const sampleReturnValue = {
            "sampleKey": "sampleValue"
        };

        // Create spy functions (aka jest function, magic function)
        // The function doesn't have any implementation unless
        // we specify one.  But it does keep track of whether 
        // it was called, how many times it was called,
        // and what it was passed.

        const setTotalCoursesJSON = jest.fn();
        const fetchJSONSpy = jest.fn();

        fetchJSONSpy.mockResolvedValue(sampleReturnValue);

        const { getByText, _getByTestId } = render(
            <TotalCoursesForm setTotalCoursesJSON={setTotalCoursesJSON} fetchTotalCoursesByDept={fetchJSONSpy} />
        );

        const expectedFields = {
            quarter: "20211",
        };

        const submitButton = getByText("Submit");
        userEvent.click(submitButton);

        // we need to be careful not to assert this expectation
        // until all of the async promises are resolved
        await waitFor(() => expect(setTotalCoursesJSON).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(fetchJSONSpy).toHaveBeenCalledTimes(1));

        // assert that ourSpy was called with the right value
        expect(setTotalCoursesJSON).toHaveBeenCalledWith(sampleReturnValue);
        expect(fetchJSONSpy).toHaveBeenCalledWith(expectedFields);

    });

});