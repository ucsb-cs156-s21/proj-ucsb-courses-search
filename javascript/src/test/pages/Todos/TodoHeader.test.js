import React from "react";
import { render } from "@testing-library/react";
import { TodoHeader } from "main/pages/Todos/TodoHeader";

describe("TodoHeader tests", () => {
  test("renders without crashing", () => {
    render(<TodoHeader name={"test"} />);
  });
});
