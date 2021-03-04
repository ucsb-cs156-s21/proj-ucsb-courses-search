import React from "react";
import { render } from "@testing-library/react";
import Basic from "main/pages/History/Basic";

describe("History Basic Course Search page tests", () => {
  test("renders without crashing", () => {
    const { getByText } =  render(<Basic/>);
    expect(getByText("Data on this page is accurate for past quarters, but may be incomplete or out of date for current and future quarters. Course information is not immediately updated.")).toBeInTheDocument();
    expect(getByText("Search Archived Course Data")).toBeInTheDocument();
  });
});