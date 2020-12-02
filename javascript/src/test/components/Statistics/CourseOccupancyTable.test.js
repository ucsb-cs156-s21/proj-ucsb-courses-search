import React from "react";
import { render } from "@testing-library/react";
import CourseOccupancyTable from "main/components/Statistics/CourseOccupancyTable";

describe("CourseOccupancyTable tests", () => {
  test("renders without crashing", () => {
    render(<CourseOccupancyTable data={[]} />);
  });
});
