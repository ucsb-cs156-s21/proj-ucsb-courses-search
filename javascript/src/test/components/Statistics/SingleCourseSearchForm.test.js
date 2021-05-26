import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SingleCourseSectionForm from "main/components/Statistics/SingleCourseSectionForm";

describe("SingleCourseSectionForm tests", () => {

    test("renders without crashing", () => {
        render(<SingleCourseSectionForm />);
    });

    test("when I select a start quarter, the state for quarter changes", () => {
        const { getByTestId } = render(<SingleCourseSectionForm />);
        const selectQuarter = getByTestId("select-start-quarter")
        userEvent.selectOptions(selectQuarter, "4");
        expect(selectQuarter.value).toBe("4");
    });

    test("when I select a end quarter, the state for end quarter changes", () => {
        const { getByTestId } = render(<SingleCourseSectionForm />);
        const selectQuarter = getByTestId("select-end-quarter")
        userEvent.selectOptions(selectQuarter, "1");
        expect(selectQuarter.value).toBe("1");
    });

    test("when I select a start quarter year, the state for year changes", () => {
        const { getByTestId } = render(<SingleCourseSectionForm />);
        const selectQuarter = getByTestId("select-start-year")
        userEvent.selectOptions(selectQuarter, "2020");
        expect(selectQuarter.value).toBe("2020");
    });

    test("when I select a end quarter year, the state for end quarter year changes", () => {
        const { getByTestId } = render(<SingleCourseSectionForm />);
        const selectQuarter = getByTestId("select-end-year")
        userEvent.selectOptions(selectQuarter, "2021");
        expect(selectQuarter.value).toBe("2021");
    });

    test("when I select a department, the state for department changes", () => {
        const { getByTestId } = render(<SingleCourseSectionForm />);
        const selectDepartment = getByTestId("select-department")
        userEvent.selectOptions(selectDepartment, "CMPSC");
        expect(selectDepartment.value).toBe("CMPSC");
    });

    test("when I select a course number without suffix, the state for course number changes,", () => {
        const { getByLabelText } = render(<SingleCourseSectionForm />);
        const selectCourseNumber = getByLabelText("Course Number (Try searching '16' or '130A')")
        userEvent.type(selectCourseNumber, "130");
        expect(selectCourseNumber.value).toBe("130");
    });

    test("when I select a course number without number, the state for course number changes,", () => {
        const { getByLabelText } = render(<SingleCourseSectionForm />);
        const selectCourseNumber = getByLabelText("Course Number (Try searching '16' or '130A')")
        userEvent.type(selectCourseNumber, "");
        expect(selectCourseNumber.value).toBe("");
    });

    test("when I select a course number with suffix, the state for course number changes,", () => {
        const { getByLabelText } = render(<SingleCourseSectionForm />);
        const selectCourseNumber = getByLabelText("Course Number (Try searching '16' or '130A')")
        userEvent.type(selectCourseNumber, "130A");
        expect(selectCourseNumber.value).toBe("130A");
    });

    test("when I select a course number with suffix, the state for course number changes,", () => {
        const { getByLabelText } = render(<SingleCourseSectionForm />);
        const selectCourseNumber = getByLabelText("Course Number (Try searching '16' or '130A')")
        userEvent.type(selectCourseNumber, );
        expect(selectCourseNumber.value).toBe("");
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
            <SingleCourseSectionForm setCourseJSON={setCourseJSON} fetchJSON={fetchJSONSpy} />
        );

        const expectedFields = {
            startQuarter: "20204",
            endQuarter: "20211",
            department: "CMPSC",
            courseNumber: "",
            courseSuf: ""
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