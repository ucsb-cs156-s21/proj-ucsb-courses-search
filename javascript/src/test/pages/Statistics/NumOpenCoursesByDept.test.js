import React from "react";
import { render } from "@testing-library/react";
import NumOpenCoursesByDept from "main/pages/Statistics/NumOpenCoursesByDept";
import userEvent from "@testing-library/user-event";

import { fetchOpenCoursesByDept } from "main/services/statisticsService";
jest.mock("main/services/statisticsService");

describe("NumOpenCoursesByDept page tests", () => {
  test("renders without crashing", () => {
    render(<NumOpenCoursesByDept />);
  });

  test("NumOpenCoursesByDept table appears with data after pressing submit", async () => {
    const { findByText } = render(<NumOpenCoursesByDept />);
    const sampleReturnValue = [{
      "quarter": "20211",
      "courseId": "CMPSC 156",
      "title": "ADV APP PROG",
      "openSeats": "18"
    },
    {
        "quarter": "20211",
        "courseId": "CMPSC 32",
        "title": "OBJ ORIENT DESIGN",
        "openSeats": "9"
    }];

    fetchOpenCoursesByDept.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("CMPSC 156");
  });

  test("NumOpenCoursesByDept no results is displayed for empty results", async () => {
    const { findByText } = render(<NumOpenCoursesByDept />);
    const sampleReturnValue = [];

    fetchOpenCoursesByDept.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("There are no results!");
  });
}); 