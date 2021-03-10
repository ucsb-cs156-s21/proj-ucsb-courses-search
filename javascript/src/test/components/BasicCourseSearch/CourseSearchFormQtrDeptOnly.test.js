import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseSearchFormQtrDeptOnly from "main/components/BasicCourseSearch/CourseSearchFormQtrDeptOnly";
jest.mock("isomorphic-unfetch");
import { useToasts } from 'react-toast-notifications'

jest.mock("react-toast-notifications", () => ({
  useToasts: jest.fn()
}));

describe("CourseSearchFormQtrDeptOnly tests", () => {

    const addToast = jest.fn();
    beforeEach(() => {
        useToasts.mockReturnValue({
            addToast: addToast
          })
    });

    test("renders without crashing", () => {
        render(<CourseSearchFormQtrDeptOnly />);
    });

    test("when I select a quarter, the state for quarter changes", () => {
        const { getByLabelText } = render(<CourseSearchFormQtrDeptOnly />);
        const selectQuarter = getByLabelText("Quarter")
        userEvent.selectOptions(selectQuarter, "20204");
        expect(selectQuarter.value).toBe("20204");
    });

    test("when I select a department, the state for department changes", () => {
        const { getByLabelText } = render(<CourseSearchFormQtrDeptOnly />);
        const selectDepartment = getByLabelText("Department")
        userEvent.selectOptions(selectDepartment, "MATH");
        expect(selectDepartment.value).toBe("MATH");
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
            <CourseSearchFormQtrDeptOnly setCourseJSON={setCourseJSONSpy} fetchJSON={fetchJSONSpy} />
        );

        const expectedFields = {
            quarter: "20204",
            department: "MATH"
        };

        const selectQuarter = getByLabelText("Quarter")
        userEvent.selectOptions(selectQuarter, "20204");
        const selectDepartment = getByLabelText("Department")
        userEvent.selectOptions(selectDepartment, "MATH");
    

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

    test("when I click submit with an EMPTY JSON file, setCourseJSON is not called", async () => {

        const sampleReturnValue = {
            "sampleKey": "sampleValue",
            "total": 0
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
            <CourseSearchFormQtrDeptOnly setCourseJSON={setCourseJSONSpy} fetchJSON={fetchJSONSpy} />
        );

        const selectQuarter = getByLabelText("Quarter")
        userEvent.selectOptions(selectQuarter, "20204");
        const selectDepartment = getByLabelText("Department")
        userEvent.selectOptions(selectDepartment, "MATH");
    

        const submitButton = getByText("Submit");
        userEvent.click(submitButton);

        // we need to be careful not to assert this expectation
        // until all of the async promises are resolved
        await waitFor(() => expect(setCourseJSONSpy).toHaveBeenCalledTimes(0));

    });

});

