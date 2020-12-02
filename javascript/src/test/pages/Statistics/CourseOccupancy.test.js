import React from "react";
import { render } from "@testing-library/react";
import CourseOccupancy from "main/pages/Statistics/CourseOccupancy";

describe("CourseOccupancy page tests", () => {
  test("renders without crashing", () => {
    render(<CourseOccupancy />);
  });
});