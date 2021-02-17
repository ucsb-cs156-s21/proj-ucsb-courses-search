import React from "react";
import { render } from "@testing-library/react";
import ClassSize from "main/pages/Statistics/ClassSize";
import userEvent from "@testing-library/user-event";

import { fetchClassSize } from "main/services/statisticsService";
jest.mock("main/services/statisticsService");

describe("ClassSize page tests", () => {
  test("renders without crashing", () => {
    render(<ClassSize />);
  });

  test("ClassSize table appears with data after pressing submit", async () => {
    const { findByText } = render(<ClassSize />);
    const sampleReturnValue = [{
      "_id": "GRDIV",
      "avgClassSize": 14
    },
    {
      "_id": "MDVST",
      "avgClassSize": 12
    }];

    fetchClassSize.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("GRDIV");
  });

  test("ClassSize no results is displayed for empty results", async () => {
    const { findByText } = render(<ClassSize />);
    const sampleReturnValue = [];

    fetchClassSize.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("There are no results!");
  });
});