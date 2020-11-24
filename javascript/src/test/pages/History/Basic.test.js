import React from "react";
import { render } from "@testing-library/react";
import Basic from "main/pages/History/Basic";

describe("History Basic Course Search page tests", () => {
  test("renders without crashing", () => {
    render(<Basic/>);
  });
});
