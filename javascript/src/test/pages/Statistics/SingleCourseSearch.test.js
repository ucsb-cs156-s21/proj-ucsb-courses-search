import React from "react";
import { render } from "@testing-library/react";
import SingleCourseSearch from "main/pages/Statistics/SingleCourseSearch";
import userEvent from "@testing-library/user-event";

import { fetchFullCourses } from "main/services/statisticsService";
jest.mock("main/services/statisticsService");

describe("SingleCourseSearch page tests", () => {
  test("renders without crashing", () => {
    render(<SingleCourseSearch />);
  });

  test("SingleCourseSearch table appears with data after pressing submit", async () => {
    const { findByText } = render(<SingleCourseSearch />);
    const sampleReturnValue = {"AGRAWAL D": "1",
    "LOKSHTANOV D": "1"};

    fetchFullCourses.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("WINTER 2021");
  });

  test("SingleCourseSearch no results is displayed for empty results", async () => {
    const { findByText } = render(<SingleCourseSearch />);
    const sampleReturnValue = [];

    fetchFullCourses.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("There are no results!");
  });
}); 