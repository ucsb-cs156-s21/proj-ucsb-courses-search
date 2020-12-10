import React from "react";
import { render } from "@testing-library/react";
import CourseName from "main/pages/History/CourseName";

describe("History Course Name Course Search page tests", () => {
  test("renders without crashing", () => {
    render(<CourseName/>);
  });
});
