import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import OpenCoursesForm from "main/components/Statistics/OpenCoursesForm";

describe("OpenCoursesForm tests", () => {

    test("renders without crashing", () => {
        render(<OpenCoursesForm />);
    });

    test("when I select a start quarter, the state for quarter changes", () => {
        const { getByTestId } = render(<OpenCoursesForm />);
        const selectQuarter = getByTestId("select-start-quarter")
        userEvent.selectOptions(selectQuarter, "3");
        expect(selectQuarter.value).toBe("3");
    });

    test("when I select a year, the state for year changes", () => {
        const { getByTestId } = render(<OpenCoursesForm />);
        const selectQuarter = getByTestId("select-start-year")
        userEvent.selectOptions(selectQuarter, "2021");
        expect(selectQuarter.value).toBe("2021");
    });

    test("when I select a department, the state for department changes", () => {
        const { getByTestId } = render(<OpenCoursesForm />);
        const selectDepartment = getByTestId("select-department")
        userEvent.selectOptions(selectDepartment, "CMPSC");
        expect(selectDepartment.value).toBe("CMPSC");
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

        const setCourseJSON = jest.fn();
        const fetchJSONSpy = jest.fn();

        fetchJSONSpy.mockResolvedValue(sampleReturnValue);

        const { getByText, _getByTestId } = render(
            <OpenCoursesForm setCourseJSON={setCourseJSON} fetchJSON={fetchJSONSpy} />
        );

        const expectedFields = {
            quarter: "20204",
            department: "CMPSC",
        };

        const submitButton = getByText("Submit");
        userEvent.click(submitButton);

        // we need to be careful not to assert this expectation
        // until all of the async promises are resolved
        await waitFor(() => expect(setCourseJSON).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(fetchJSONSpy).toHaveBeenCalledTimes(1));

        // assert that ourSpy was called with the right value
        expect(setCourseJSON).toHaveBeenCalledWith(sampleReturnValue);
        expect(fetchJSONSpy).toHaveBeenCalledWith(expectedFields);

    });

});