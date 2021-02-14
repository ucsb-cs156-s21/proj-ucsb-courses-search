import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DivisionOccupancyForm from "main/components/Statistics/DivisionOccupancyForm";
jest.mock("isomorphic-unfetch");

describe("DivisionOccupancyForm tests", () => {

    test("renders without crashing", () => {
        render(<DivisionOccupancyForm />);
    });

    test("when I select a start quarter, the state for start quarter changes", () => {
        const { getByTestId } = render(<DivisionOccupancyForm />);
        const selectQuarter = getByTestId("select-start-quarter")
        userEvent.selectOptions(selectQuarter, "4");
        expect(selectQuarter.value).toBe("4");
    });

    test("when I select an end quarter, the state for end quarter changes", () => {
        const { getByTestId } = render(<DivisionOccupancyForm />);
        const selectQuarter = getByTestId("select-end-quarter")
        userEvent.selectOptions(selectQuarter, "1");
        expect(selectQuarter.value).toBe("1");
    });

    test("when I select a department, the state for department changes", () => {
        const { getByLabelText } = render(<DivisionOccupancyForm />);
        const selectDepartment = getByLabelText("Department")
        userEvent.selectOptions(selectDepartment, "MATH ");
        expect(selectDepartment.value).toBe("MATH ");
    });

    test("when I select a level, the state for level changes", () => {
        const { getByLabelText } = render(<DivisionOccupancyForm />);
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

        const setCourseJSON = jest.fn();
        const fetchJSONSpy = jest.fn();

        fetchJSONSpy.mockResolvedValue(sampleReturnValue);

        const { getByText, getByLabelText } = render(
            <DivisionOccupancyForm setCourseJSON={setCourseJSON} fetchJSON={fetchJSONSpy} />
        );

        const expectedFields = {
            startQuarter: "20204",
            endQuarter: "20211",
            department: "MATH ",
            level: "G"
        };

        const selectStartQuarter = getByLabelText("Start Quarter")
        userEvent.selectOptions(selectStartQuarter, "4");
        const selectEndQuarter = getByLabelText("End Quarter")
        userEvent.selectOptions(selectEndQuarter, "1");
        const selectDepartment = getByLabelText("Department")
        userEvent.selectOptions(selectDepartment, "MATH ");
        const selectLevel = getByLabelText("Course Level")
        userEvent.selectOptions(selectLevel, "G");

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

