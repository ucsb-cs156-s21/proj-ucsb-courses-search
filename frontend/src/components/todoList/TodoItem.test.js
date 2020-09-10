import React from "react";
import { screen, render } from "@testing-library/react";
import { TodoItem } from "./TodoItem";
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
      toggleTodo: jest.fn(),
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
      toggleTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };
    const { getByText } = render(<TodoItem {...props} />);
    const item = getByText(props.item.value);
    expect(item).toBeInTheDocument();
  });

  test("clicking on item button triggers toggleTodo", () => {
    const props = {
      item: {
        value: "value",
        id: 1,
        done: false,
      },
      index: 0,
      toggleTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };
    render(<TodoItem {...props} />);
    userEvent.click(screen.getByText(props.item.value));
    expect(props.toggleTodo).toHaveBeenCalledTimes(1);
  });

  test("clicking on delete button triggers toggleTodo", () => {
    const props = {
      item: {
        value: "value",
        id: 1,
        done: false,
      },
      index: 0,
      toggleTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };
    render(<TodoItem {...props} />);
    userEvent.click(screen.getByText(/Delete/));
    expect(props.deleteTodo).toHaveBeenCalledTimes(1);
  });
});
