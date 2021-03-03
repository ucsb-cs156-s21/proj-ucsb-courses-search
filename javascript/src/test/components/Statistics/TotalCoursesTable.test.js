import React from "react";
import { render } from "@testing-library/react";
import TotalCoursesTable from "main/components/Statistics/TotalCoursesTable";

describe("TotalCoursesTable tests", () => {
  test("renders without crashing", () => {
    render(<TotalCoursesTable data={[]} />);
  });
});