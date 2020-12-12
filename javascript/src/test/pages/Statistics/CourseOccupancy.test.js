import React from "react";
import { render } from "@testing-library/react";
import CourseOccupancy from "main/pages/Statistics/CourseOccupancy";
import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';

import { fetchCourseOccupancy } from "main/services/statisticsService";
jest.mock("main/services/statisticsService");

describe("CourseOccupancy page tests", () => {
  test("renders without crashing", () => {
    render(<CourseOccupancy />);
  });

  test("CourseOccupancy table appears with data after pressing submit", async () => {
    const { findByText } = render(<CourseOccupancy />);
    const sampleReturnValue = [{
      "quarter": "20211",
      "enrolled": "100",
      "maxEnrolled": "200"
    },
    {
      "quarter": "20212",
      "enrolled": "100",
      "maxEnrolled": "200"
    }];

    fetchCourseOccupancy.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("WINTER 2021");
  });

  test("CourseOccupancy no results is displayed for empty results", async () => {
    const { findByText } = render(<CourseOccupancy />);
    const sampleReturnValue = [];

    fetchCourseOccupancy.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("There are no results!");
  });
});