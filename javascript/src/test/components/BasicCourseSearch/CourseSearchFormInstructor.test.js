import React from "react";
import { render,  waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseSearchFormInstructor from "main/components/BasicCourseSearch/CourseSearchFormInstructor";
import { useToasts } from 'react-toast-notifications'
jest.mock("isomorphic-unfetch");
jest.mock("react-toast-notifications", () => ({
  useToasts: jest.fn()
}));

describe("CourseSearchFormInstructor tests", () => {

  const addToast = jest.fn();
  beforeEach(() => {
      useToasts.mockReturnValue({
          addToast: addToast
        })
  });

  test("renders without crashing", () => {
    render(<CourseSearchFormInstructor/>);
  });

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

// test("when I click submit, I get back the information about a specified instructor between certain quarters", async () => {

//   const sampleReturnValue = {
//       "sampleKey": "sampleValue"
//   };

//   // Create spy functions (aka jest function, magic function)
//   // The function doesn't have any implementation unless
//   // we specify one.  But it does keep track of whether 
//   // it was called, how many times it was called,
//   // and what it was passed.

//   const setCourseJSONSpy = jest.fn();
//   const fetchJSONSpy = jest.fn();

//   fetchJSONSpy.mockResolvedValue(sampleReturnValue);

//   const { getByText, getByLabelText } = render(
//       <CourseSearchFormInstructor setCourseJSON={setCourseJSONSpy} fetchJSON={fetchJSONSpy} />
//   );

//   const expectedFields = {
//       startQuarter: "20204",
//       endQuarter: "20204",
//       instructorText: "KHARITONOVA"
//   };

//   const selectStartQuarter = getByLabelText("Start Quarter")
//   userEvent.selectOptions(selectStartQuarter, "20204");
//   const selectEndQuarter = getByLabelText("End Quarter")
//   userEvent.selectOptions(selectEndQuarter, "20204");
//   const selectInstructor= getByLabelText("Instructor")
//   userEvent.type(selectInstructor, "KHARITONOVA");


//   const submitButton = getByText("Submit");
//   userEvent.click(submitButton);

//   // we need to be careful not to assert this expectation
//   // until all of the async promises are resolved
//   await waitFor(() => expect(setCourseJSONSpy).toHaveBeenCalledTimes(1));
//   await waitFor(() => expect(fetchJSONSpy).toHaveBeenCalledTimes(1));

//   // assert that ourSpy was called with the right value
//   expect(setCourseJSONSpy).toHaveBeenCalledWith(sampleReturnValue);
//   expect(fetchJSONSpy).toHaveBeenCalledWith(expect.any(Object), expectedFields);

// });

test("when I click submit with an EMPTY JSON, setcourseJSON is not called", async () => {

  const sampleReturnValue = {
      "sampleKey": "sampleValue",
      "total":0
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
      <CourseSearchFormInstructor setCourseJSON={setCourseJSONSpy} fetchJSON={fetchJSONSpy} />
  );


  const selectStartQuarter = getByLabelText("Start Quarter")
  userEvent.selectOptions(selectStartQuarter, "20204");
  const selectEndQuarter = getByLabelText("End Quarter")
  userEvent.selectOptions(selectEndQuarter, "20204");
  const selectInstructor= getByLabelText("Instructor")
  userEvent.type(selectInstructor, "KHARITONOVA");


  const submitButton = getByText("Submit");
  userEvent.click(submitButton);

  // we need to be careful not to assert this expectation
  // until all of the async promises are resolved
  await waitFor(() => expect(setCourseJSONSpy).toHaveBeenCalledTimes(1));

});

test("Instructor placeholder text correctly renders", async () => {
    const { findByText } = render(<CourseSearchFormInstructor />);

    await findByText("If there are multiple instructors with the same last name, do a search by last name first to determine how the instructor first name is abbreviated, e.g. WANG R K, WANG Y X, WANG Y F, etc. and then repeat the search.");
  });

});

