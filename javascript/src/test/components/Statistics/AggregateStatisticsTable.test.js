import React from "react";
import { render } from "@testing-library/react";
import AggregateStatisticsTable from "main/components/Statistics/AggregateStatisticsTable";

describe("AggregateStatisticsTable tests", () => {
  test("renders without crashing", () => {
    render(<AggregateStatisticsTable data={[]} />);
  });
});