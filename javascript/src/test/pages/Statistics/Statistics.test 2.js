import React from "react";
import { render } from "@testing-library/react";
import Statistics from "main/pages/Statistics/Statistics";
describe("Statistics page tests", () => {
  test("renders without crashing", () => {
    render(<Statistics />);
  });
});