import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetch from "isomorphic-unfetch";
jest.mock("isomorphic-unfetch");

import BasicCourseSearchForm from "main/components/BasicCourseSearch/BasicCourseSearchForm";
import JSONPretty from "react-json-pretty";

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

        const sampleReturnValue =  {
            "level": "U",
            "dept": "CMPSC",
            "qtr": "20211"
        };

        fetch.mockResolvedValue({
            json: async ()=>{
                return sampleReturnValue;
            } 
        });

        // Create a spy (aka jest function, magic function)
        // The function doesn't have any implementation unless
        // we specify one.  But it does keep track of whether 
        // it was called, how many times it was called,
        // and what it was passed.

        const ourSpy = jest.fn();

        const { getByText } = render(<BasicCourseSearchForm setCourseJSON={ourSpy}/>);
        const submitButton = getByText("Submit");
        userEvent.click(submitButton);

        // we need to be careful not to assert this expectation
        // until all of the async promises are resolved
        await waitFor( () => expect(ourSpy).toHaveBeenCalledTimes(1) );

        // assert that ourSpy was called with the right value
        expect(ourSpy).toHaveBeenCalledWith(sampleReturnValue);
    });


});
