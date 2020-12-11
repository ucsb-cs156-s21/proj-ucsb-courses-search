import React from "react";
import { render } from "@testing-library/react";
import Ge from "main/pages/History/Ge";

describe("History Ge Course Search page tests", () => {
  test("renders without crashing", () => {
    render(<Ge/>);
  });
});
