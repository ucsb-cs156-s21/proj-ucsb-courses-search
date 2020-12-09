import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetch from "isomorphic-unfetch";
jest.mock("isomorphic-unfetch");

import CourseSearchCourseStartEndQtr from "main/components/BasicCourseSearch/CourseSearchCourseStartEndQtr";
import JSONPretty from "react-json-pretty";

describe("CourseSearchCourseStartEndQtr tests", () => {

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
        const selectSubjectArea = getByLabelText("Subject Area")
        userEvent.selectOptions(selectSubjectArea, "MATH    ");
        expect(selectSubjectArea.value).toBe("MATH    ");
    });
    
    test("when I select a course number area, the state for course number changes", () => {
        const { getByLabelText } = render(<CourseSearchCourseStartEndQtr />);
        const selectCourseNumber = getByLabelText("Course Number")
        userEvent.type(selectCourseNumber, "130");
        expect(selectCourseNumber.value).toBe("130");
    });

    test("when I select a course suffix, the state for subject area changes", () => {
        const { getByLabelText } = render(<CourseSearchCourseStartEndQtr />);
        const selectCourseSuffix = getByLabelText("Course Suffix (i.e. A, B, etc.)")
        userEvent.type(selectCourseSuffix, "A");
        expect(selectCourseSuffix.value).toBe("A");
    });

    test("when I click submit, I get back the information about a specified course name between certain quarters", async () => {

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
            <CourseSearchCourseStartEndQtr setCourseJSON={setCourseJSONSpy} fetchJSON={fetchJSONSpy} />
        );

        const expectedFields = {
            startQuarter: "20204",
            endQuarter: "20204",
            subjectArea: "CMPSC   ",
            courseNumber: "130",
            courseSuf: "A "
        };

        const selectStartQuarter = getByLabelText("Start Quarter")
        userEvent.selectOptions(selectStartQuarter, "20204");
        const selectEndQuarter = getByLabelText("End Quarter")
        userEvent.selectOptions(selectEndQuarter, "20204");
        const selectSubjectArea = getByLabelText("Subject Area")
        userEvent.selectOptions(selectSubjectArea, "CMPSC   ");
        const selectCourseNumber = getByLabelText("Course Number")
        userEvent.type(selectCourseNumber, "130");
        const selectCourseSuffix = getByLabelText("Course Suffix (i.e. A, B, etc.)")
        userEvent.type(selectCourseSuffix, "A ");

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

});

