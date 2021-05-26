import React from "react";
import { render } from "@testing-library/react";
import SingleCourseSectionTable from "main/components/Statistics/SingleCourseSectionTable";

describe("SingleCourseSectionTable tests", () => {
    test("renders without crashing", () => {
      render(<SingleCourseSectionTable data={[]} />);
    });
  });