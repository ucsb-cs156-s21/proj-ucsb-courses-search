import React from "react";
import { render } from "@testing-library/react";
import ClassSizeTable from "main/components/Statistics/ClassSizeTable";

describe("ClassSizeTable tests", () => {
  test("renders without crashing", () => {
    render(<ClassSizeTable data={[]} />);
  });
});