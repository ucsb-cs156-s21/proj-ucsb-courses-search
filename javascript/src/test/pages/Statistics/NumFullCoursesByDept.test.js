import React from "react";
import { render } from "@testing-library/react";
import NumFullCoursesByDept from "main/pages/Statistics/NumFullCoursesByDept";
import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';

import { fetchFullCourses } from "main/services/statisticsService";
jest.mock("main/services/statisticsService");

describe("NumFullCoursesByDept page tests", () => {
  test("renders without crashing", () => {
    render(<NumFullCoursesByDept />);
  });

  test("NumFullCoursesByDept table appears with data after pressing submit", async () => {
    const { findByText } = render(<NumFullCoursesByDept />);
    const sampleReturnValue = [{
      "quarter": "20211",
      "title": "ADV APP PROG",
      "courseId": "CMPSC 156"
    },
    {
      "quarter": "20212",
      "title": "ADV APP PROG",
      "courseId": "CMPSC 156"
    }];

    fetchFullCourses.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("WINTER 2021");
  });

  test("NumFullCoursesByDept no results is displayed for empty results", async () => {
    const { findByText } = render(<NumFullCoursesByDept />);
    const sampleReturnValue = [];

    fetchFullCourses.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("There are no results!");
  });
}); 