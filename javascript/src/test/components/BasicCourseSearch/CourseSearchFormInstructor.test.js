import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseSearchFormInstructor from "main/components/BasicCourseSearch/CourseSearchFormInstructor";

describe("CourseSearchFormInstructor tests", () => {
  test("renders without crashing", () => {
    render(<CourseSearchFormInstructor/>);
  });
/*
  test("form inputs update correctly", () => {
    const { getByDisplayValue, getAllByDisplayValue } = render(<CourseSearchFormInstructor/>);
    const quarterInputs = getAllByDisplayValue("W21");
    //const instructorInputs=getAllByDisplayValue("KHARITONOVA");

    expect(instructorInputs.length).toBe(1);

    expect(quarterInputs.length).toBe(2);

    const startingQuarterInput = quarterInputs[0];
    userEvent.selectOptions(startingQuarterInput, ["20201"]);
    expect(startingQuarterInput).toHaveValue("20201");

    const endingQuarterInput = quarterInputs[1];
    userEvent.selectOptions(endingQuarterInput, ["20201"]);
    expect(endingQuarterInput).toHaveValue("20201");

  });
*/

test("when I select a start quarter, the state for the start quarter changes", () => {
  const { getByLabelText } = render(<CourseSearchFormInstructor />);
  const selectQuarter = getByLabelText("Start Quarter")
  userEvent.selectOptions(selectQuarter, "20204");
  expect(selectQuarter.value).toBe("20204");
});

test("when I select a end quarter, the state for the end quarter changes", () => {
  const { getByLabelText } = render(<CourseSearchFormInstructor />);
  const selectQuarter = getByLabelText("End Quarter")
  userEvent.selectOptions(selectQuarter, "20204");
  expect(selectQuarter.value).toBe("20204");
});

  test("when I type a instructor's name, form updates", () => {
    const { getByLabelText } = render(<CourseSearchFormInstructor />);
    const instructorInputs=getByLabelText("Instructor");
    userEvent.type(instructorInputs, "KHARITONOVA");
    expect(instructorInputs.value).toBe("KHARITONOVA");
});


});
