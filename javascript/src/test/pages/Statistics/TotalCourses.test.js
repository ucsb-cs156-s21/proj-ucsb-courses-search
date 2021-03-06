import React from "react";
import { render } from "@testing-library/react";
import TotalCourses from "main/pages/Statistics/TotalCourses";
import userEvent from "@testing-library/user-event";

import { fetchTotalCoursesByDept } from "main/services/statisticsService";
jest.mock("main/services/statisticsService");

describe("TotalCourses page tests", () => {
  test("renders without crashing", () => {
    render(<TotalCourses />);
  });

  test("TotalCourses table appears with data after pressing submit", async () => {
    const { findByText } = render(<TotalCourses />);
    const sampleReturnValue = [{
      "_id": "ANTH",
      "totalCourses": 23
    },
    {
      "_id": "CMPSC",
      "totalCourses": 40
    }];

    fetchTotalCoursesByDept.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("ANTH");
  });

  test("TotalCourses no results is displayed for empty results", async () => {
    const { findByText } = render(<TotalCourses />);
    const sampleReturnValue = [];

    fetchTotalCoursesByDept.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("There are no results!");
  });
});