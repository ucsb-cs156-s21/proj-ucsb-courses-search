import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetch from "isomorphic-unfetch";
jest.mock("isomorphic-unfetch");

import GeCourseSearchForm from "main/components/BasicCourseSearch/GeCourseSearchForm";
import JSONPretty from "react-json-pretty";

describe("GeCourseSearchForm tests", () => {

    test("renders without crashing", () => {
        render(<GeCourseSearchForm />);
    });

    test("when I select a quarter, the state for quarter changes", () => {
        const { getByTestId } = render(<GeCourseSearchForm />);
        const selectQuarter = getByTestId("Start Quarter")
        userEvent.selectOptions(selectQuarter, "20204");
        expect(selectQuarter.value).toBe("20204");
    });
    
    test("when I select a quarter, the state for quarter changes", () => {
        const { getByTestId } = render(<GeCourseSearchForm />);
        const selectQuarter = getByTestId("End Quarter")
        userEvent.selectOptions(selectQuarter, "20204");
        expect(selectQuarter.value).toBe("20204");
    });

    test("when I select a GE, the state for GE changes", () => {
        const { getByLabelText } = render(<GeCourseSearchForm />);
        const selectGeCode = getByLabelText("GE Code")
        userEvent.selectOptions(selectGeCode, "A1 ");
        expect(selectGeCode.value).toBe("A1 ");
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
            <GeCourseSearchForm setCourseJSON={setCourseJSONSpy} fetchJSON={fetchJSONSpy} />
        );

        const expectedFields = {
            startQuarter: "20204",
            endQuarter: "20204",
            geCode: "A1 "
        };

        const selectQuarter = getByLabelText("Start Quarter")
        userEvent.selectOptions(selectQuarter, "20204");
        const selectQuarter = getByLabelText("End Quarter")
        userEvent.selectOptions(selectQuarter, "20204");
        const selectQuarter = getByLabelText("GE Code")
        userEvent.selectOptions(selectQuarter, "A1 ");

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

