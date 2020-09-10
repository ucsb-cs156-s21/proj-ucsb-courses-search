import React from "react";
import { render } from "@testing-library/react";
import Todos from "./Todos";

describe("Todos tests", () => {
  test("renders without crashing", () => {
    render(<Todos />);
  });
});
