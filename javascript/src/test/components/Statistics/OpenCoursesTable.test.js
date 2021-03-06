import React from "react";
import { render } from "@testing-library/react";
import OpenCoursesTable from "main/components/Statistics/OpenCoursesTable";

describe("OpenCoursesTable tests", () => {
    test("renders without crashing", () => {
      render(<OpenCoursesTable data={[]} />);
    });
  });