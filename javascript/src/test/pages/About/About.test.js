import React from "react";
import { render } from "@testing-library/react";
import About from "main/pages/About/About";

describe("About tests", () => {
  test("renders without crashing", () => {
    render(<About />);
  });
});
