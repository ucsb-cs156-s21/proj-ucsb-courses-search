import React from "react";
import { render } from "@testing-library/react";
import AggregateStatistics from "main/pages/Statistics/AggregateStatistics";
import userEvent from "@testing-library/user-event";

import { fetchAggregateStatistics } from "main/services/statisticsService";
jest.mock("main/services/statisticsService");

describe("AggregateStatistics page tests", () => {
  test("renders without crashing", () => {
    render(<AggregateStatistics />);
  });

  test("AggregateStatistics table appears with data after pressing submit", async () => {
    const { findByText } = render(<AggregateStatistics />);
    const sampleReturnValue = [{
      "_id": "ANTH",
      "numCourses": 29,
      "courseOccupancy": 87,
      "avgClassSize": 136
    },
    {
      "_id": "CMPSC",
      "numCourses": 78,
      "courseOccupancy": 78,
      "avgClassSize": 89
    }];

    fetchAggregateStatistics.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("ANTH");
  });

  test("AggregateStatistics no results is displayed for empty results", async () => {
    const { findByText } = render(<AggregateStatistics />);
    const sampleReturnValue = [];

    fetchAggregateStatistics.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("There are no results!");
  });
});