import React from "react";
import { screen, render } from "@testing-library/react";
import { TodoItem } from "main/pages/Todos/TodoItem";
import userEvent from "@testing-library/user-event";

describe("TodoItem tests", () => {
  test("renders without crashing", () => {
    const props = {
      item: {
        value: "value",
        id: 1,
        done: false,
      },
      index: 0,
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };
    render(<TodoItem {...props} />);
  });

  test("renders complete item correctly", () => {
    const props = {
      item: {
        value: "value",
        id: 1,
        done: true,
      },
      index: 0,
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };
    const { getByDisplayValue } = render(<TodoItem {...props} />);
    const item = getByDisplayValue(props.item.value);
    expect(item).toBeInTheDocument();
  });

  test("clicking on checkbox button triggers updateTodo", () => {
    const props = {
      item: {
        value: "value",
        id: 1,
        done: false,
      },
      index: 0,
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };
    render(<TodoItem {...props} />);
    userEvent.click(screen.getByAltText("checkbox"));
    expect(props.updateTodo).toHaveBeenCalledTimes(1);
  });

  test("clicking on delete button triggers deleteTodo", () => {
    const props = {
      item: {
        value: "value",
        id: 1,
        done: false,
      },
      index: 0,
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };
    render(<TodoItem {...props} />);
    userEvent.click(screen.getByText(/Delete/));
    expect(props.deleteTodo).toHaveBeenCalledTimes(1);
  });
});
