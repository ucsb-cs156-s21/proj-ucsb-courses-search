import React from "react";
import { render } from "@testing-library/react";
import Home from "main/pages/Home/Home";

describe("Home tests", () => {
  test("renders without crashing", () => {
    render(<Home />);
  });
});
