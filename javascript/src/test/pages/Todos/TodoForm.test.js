import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoForm } from "main/pages/Todos/TodoForm";

describe("TodoForm tests", () => {
  test("renders without crashing", () => {
    render(<TodoForm />);
  });

  test("can type and submit form", () => {
    const addTask = jest.fn();
    render(<TodoForm addTask={addTask} />);
    const input = screen.getByPlaceholderText("add todo");
    const submit = screen.getByText("Submit");
    userEvent.type(input, "new todo");
    userEvent.click(submit);
    expect(addTask).toHaveBeenCalledTimes(1);
  });
});
