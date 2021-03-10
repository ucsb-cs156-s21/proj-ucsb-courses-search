import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseSearchCourseStartEndQtr from "main/components/BasicCourseSearch/CourseSearchCourseStartEndQtr";
jest.mock("isomorphic-unfetch");
import { useToasts } from 'react-toast-notifications'

jest.mock("react-toast-notifications", () => ({
  useToasts: jest.fn()
}));

describe("CourseSearchCourseStartEndQtr tests", () => {

    const addToast = jest.fn();
    beforeEach(() => {
        useToasts.mockReturnValue({
            addToast: addToast
          })
    });

    test("renders without crashing", () => {
        render(<CourseSearchCourseStartEndQtr />);
    });

    test("when I select a start quarter, the state for the start quarter changes", () => {
        const { getByLabelText } = render(<CourseSearchCourseStartEndQtr />);
        const selectQuarter = getByLabelText("Start Quarter")
        userEvent.selectOptions(selectQuarter, "20204");
        expect(selectQuarter.value).toBe("20204");
    });

    test("when I select a end quarter, the state for the end quarter changes", () => {
        const { getByLabelText } = render(<CourseSearchCourseStartEndQtr />);
        const selectQuarter = getByLabelText("End Quarter")
        userEvent.selectOptions(selectQuarter, "20204");
        expect(selectQuarter.value).toBe("20204");
    });

    test("when I select a subject area, the state for subject area changes", () => {
        const { getByLabelText } = render(<CourseSearchCourseStartEndQtr />);
        const SelectSubject = getByLabelText("Subject Area")
        userEvent.selectOptions(SelectSubject, "MATH    ");
        expect(SelectSubject.value).toBe("MATH    ");
    });

    test("when I select a course number without suffix, the state for course number changes,", () => {
        const { getByLabelText } = render(<CourseSearchCourseStartEndQtr />);
        const selectCourseNumber = getByLabelText("Course Number")
        userEvent.type(selectCourseNumber, "16");
        expect(selectCourseNumber.value).toBe("16");
    });

    test("when I select a course number with suffix, the state for course number changes,", () => {
        const { getByLabelText } = render(<CourseSearchCourseStartEndQtr />);
        const selectCourseNumber = getByLabelText("Course Number")
        userEvent.type(selectCourseNumber, "130A");
        expect(selectCourseNumber.value).toBe("130A");
    });

    test("when I select a course number without number, the state for course number changes,", () => {
        const { getByLabelText } = render(<CourseSearchCourseStartEndQtr />);
        const selectCourseNumber = getByLabelText("Course Number")
        userEvent.type(selectCourseNumber, "A");
        expect(selectCourseNumber.value).toBe("A");
    });

    test("when I click submit, I get back the information about a specified course name between certain quarters", async () => {

        const sampleReturnValue = {
            "quarter": "20204"
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
            <CourseSearchCourseStartEndQtr setCourseJSON={setCourseJSONSpy} fetchJSON={fetchJSONSpy} />
        );

        const expectedFields = {
            startQuarter: "20204",
            endQuarter: "20204",
            subjectArea: "CMPSC   ",
            courseNumber: "130",
            courseSuf: "A"
        };

        const selectStartQuarter = getByLabelText("Start Quarter")
        userEvent.selectOptions(selectStartQuarter, "20204");
        const selectEndQuarter = getByLabelText("End Quarter")
        userEvent.selectOptions(selectEndQuarter, "20204");
        const SelectSubject = getByLabelText("Subject Area")
        userEvent.selectOptions(SelectSubject, "CMPSC   ");
        const selectCourseNumber = getByLabelText("Course Number")
        userEvent.type(selectCourseNumber, "130A  ");

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

    test("when I click submit and there is an empty JSON, setCourseJson is not called!", async () => {

        const sampleReturnValue = {
            "quarter": "20204",
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
            <CourseSearchCourseStartEndQtr setCourseJSON={setCourseJSONSpy} fetchJSON={fetchJSONSpy} />
        );

        const selectStartQuarter = getByLabelText("Start Quarter")
        userEvent.selectOptions(selectStartQuarter, "20204");
        const selectEndQuarter = getByLabelText("End Quarter")
        userEvent.selectOptions(selectEndQuarter, "20204");
        const SelectSubject = getByLabelText("Subject Area")
        userEvent.selectOptions(SelectSubject, "CMPSC   ");
        const selectCourseNumber = getByLabelText("Course Number")
        userEvent.type(selectCourseNumber, "130A  ");

        const submitButton = getByText("Submit");
        userEvent.click(submitButton);

        // we need to be careful not to assert this expectation
        // until all of the async promises are resolved
        await waitFor(() => expect(setCourseJSONSpy).toHaveBeenCalledTimes(0));
    });
      
    test("when I click submit, the previous data fields are cleared and I get back the information about a specified course name between certain quarters", async () => {
        // Search with suffix (130a)
        const sampleReturnValue = {
            "quarter": "20204"
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
            <CourseSearchCourseStartEndQtr setCourseJSON={setCourseJSONSpy} fetchJSON={fetchJSONSpy} />
        );

        const selectStartQuarter = getByLabelText("Start Quarter")
        userEvent.selectOptions(selectStartQuarter, "20204");
        const selectEndQuarter = getByLabelText("End Quarter")
        userEvent.selectOptions(selectEndQuarter, "20204");
        const SelectSubject = getByLabelText("Subject Area")
        userEvent.selectOptions(SelectSubject, "CMPSC   ");
        const selectCourseNumber = getByLabelText("Course Number")
        userEvent.type(selectCourseNumber, "130A  ");

        const submitButton = getByText("Submit");
        userEvent.click(submitButton);

        // we need to be careful not to assert this expectation
        // until all of the async promises are resolved
        await waitFor(() => expect(setCourseJSONSpy).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(fetchJSONSpy).toHaveBeenCalledTimes(1));

        // Search without suffix (138) to ensure that it clears the previous value
        const cs138Fields = {
            startQuarter: "20204",
            endQuarter: "20204",
            subjectArea: "CMPSC   ",
            courseNumber: "138",
            courseSuf: ""
        };

        // Clear previous selection before entering new
        userEvent.clear(selectCourseNumber);
        userEvent.type(selectCourseNumber, "138  ");

        userEvent.click(submitButton);

        // we need to be careful not to assert this expectation
        // until all of the async promises are resolved
        await waitFor(() => expect(setCourseJSONSpy).toHaveBeenCalledTimes(2));
        await waitFor(() => expect(fetchJSONSpy).toHaveBeenCalledTimes(2));

        // assert that ourSpy was called with the right value
        expect(setCourseJSONSpy).toHaveBeenCalledWith(sampleReturnValue);
        expect(fetchJSONSpy).toHaveBeenCalledWith(expect.any(Object), cs138Fields);
    });

});

