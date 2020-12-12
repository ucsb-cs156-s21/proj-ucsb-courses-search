import React from "react";
import { render } from "@testing-library/react";
import Instructor from "main/pages/History/Instructor";

describe("History Instructor Course Search page tests", () => {
  test("renders without crashing", () => {
    render(<Instructor/>);
  });
});
