import React from "react";
import { render } from "@testing-library/react";
import DivisionOccupancyTable from "main/components/Statistics/DivisionOccupancyTable";

describe("DivisionOccupancyTable tests", () => {
  test("renders without crashing", () => {
    render(<DivisionOccupancyTable data={[]} />);
  });
});
