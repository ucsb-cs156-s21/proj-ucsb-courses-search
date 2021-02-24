import React from "react";
import { render } from "@testing-library/react";
import FullCourseTable from "main/components/Statistics/FullCourseTable";

describe("FullCourseTable tests", () => {
    test("renders without crashing", () => {
      render(<FullCourseTable data={[]} />);
    });
  });