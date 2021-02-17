import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BasicCourseSearchForm from "main/components/BasicCourseSearch/BasicCourseSearchForm";
jest.mock("isomorphic-unfetch");

describe("BasicCourseSearchForm tests", () => {

    test("renders without crashing", () => {
        render(<BasicCourseSearchForm />);
    });

    test("when I select a quarter, the state for quarter changes", () => {
        const { getByTestId } = render(<BasicCourseSearchForm />);
        const selectQuarter = getByTestId("select-quarter")
        userEvent.selectOptions(selectQuarter, "20204");
        expect(selectQuarter.value).toBe("20204");
    });

    test("when I select a department, the state for department changes", () => {
        const { getByLabelText } = render(<BasicCourseSearchForm />);
        const selectDepartment = getByLabelText("Department")
        userEvent.selectOptions(selectDepartment, "MATH");
        expect(selectDepartment.value).toBe("MATH");
    });

    test("when I select a level, the state for level changes", () => {
        const { getByLabelText } = render(<BasicCourseSearchForm />);
        const selectLevel = getByLabelText("Course Level")
        userEvent.selectOptions(selectLevel, "G");
        expect(selectLevel.value).toBe("G");
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

        const setCourseJSONSpy = jest.fn();
        const fetchJSONSpy = jest.fn();

        fetchJSONSpy.mockResolvedValue(sampleReturnValue);

        const { getByText, getByLabelText } = render(
            <BasicCourseSearchForm setCourseJSON={setCourseJSONSpy} fetchJSON={fetchJSONSpy} />
        );

        const expectedFields = {
            quarter: "20204",
            department: "MATH",
            level: "G"
        };

        const selectQuarter = getByLabelText("Quarter")
        userEvent.selectOptions(selectQuarter, "20204");
        const selectDepartment = getByLabelText("Department")
        userEvent.selectOptions(selectDepartment, "MATH");
        const selectLevel = getByLabelText("Course Level")
        userEvent.selectOptions(selectLevel, "G");

        const submitButton = getByText("Submit");
        userEvent.click(submitButton);

        // we need to be careful not to assert this expectation
        // until all of the async promises are resolved
        await waitFor(() => expect(setCourseJSONSpy).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(fetchJSONSpy).toHaveBeenCalledTimes(1));

        // assert that ourSpy was called with the right value
        expect(setCourseJSONSpy).toHaveBeenCalledWith(sampleReturnValue);
        expect(fetchJSONSpy).toHaveBeenCalledWith(expect.any(Object), expectedFields);

    });

    test("the download csv button seems to work", async () => {

        const sampleReturnValue = {
            "sampleKey": "sampleValue"
        };

        // Create spy functions (aka jest function, magic function)
        // The function doesn't have any implementation unless
        // we specify one.  But it does keep track of whether 
        // it was called, how many times it was called,
        // and what it was passed.

        const setCourseJSONSpy = jest.fn();
        const fetchJSONSpy = jest.fn();

        fetchJSONSpy.mockResolvedValue(sampleReturnValue);

        const { getByText, getByLabelText } = render(
            <BasicCourseSearchForm setCourseJSON={setCourseJSONSpy} fetchJSON={fetchJSONSpy} />
        );

        const expectedFields = {
            quarter: "20204",
            department: "MATH",
            level: "G"
        };

        const selectQuarter = getByLabelText("Quarter")
        userEvent.selectOptions(selectQuarter, "20204");
        const selectDepartment = getByLabelText("Department")
        userEvent.selectOptions(selectDepartment, "MATH");
        const selectLevel = getByLabelText("Course Level")
        userEvent.selectOptions(selectLevel, "G");

        const submitButton = getByText("Submit");
        userEvent.click(submitButton);

        // we need to be careful not to assert this expectation
        // until all of the async promises are resolved
        await waitFor(() => expect(setCourseJSONSpy).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(fetchJSONSpy).toHaveBeenCalledTimes(1));

        // assert that ourSpy was called with the right value
        expect(setCourseJSONSpy).toHaveBeenCalledWith(sampleReturnValue);
        expect(fetchJSONSpy).toHaveBeenCalledWith(expect.any(Object), expectedFields);

        // lets try the download csv now
        // const csvButton = getByText("Download CSV");
        // userEvent.click(csvButton);
    });
});

