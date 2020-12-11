import React from "react";
import { render } from "@testing-library/react";
import DivisionOccupancy from "main/pages/Statistics/DivisionOccupancy";
import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';

import { fetchDivisionOccupancy } from "main/services/statisticsService";
jest.mock("main/services/statisticsService");

describe("DivisionOccupancy page tests", () => {
  test("renders without crashing", () => {
    render(<DivisionOccupancy />);
  });

  test("DivisionOccupancy table appears with data after pressing submit", async () => {
    const { findByText } = render(<DivisionOccupancy />);
    const sampleReturnValue = [{
      "quarter": "4",
      "courseId": "CMPSC 156",
      "title": "ADV APP PROG",
      "enrolled": "66",
      "maxEnrolled": "62"
    },
    {
        "quarter": "1",
        "courseId": "CMPSC 156",
        "title": "ADV APP PROG",
        "enrolled": "37",
        "maxEnrolled": "72" 
    }];

    fetchDivisionOccupancy.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);
    await findByText("CMPSC");
  });

  test("DivisionOccupancy no results is displayed for empty results", async () => {
    const { findByText } = render(<DivisionOccupancy />);
    const sampleReturnValue = [];

    fetchDivisionOccupancy.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("There are no results!");
  });
}); 