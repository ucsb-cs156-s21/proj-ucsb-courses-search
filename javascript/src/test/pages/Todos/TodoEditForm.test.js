import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoEditForm from "main/pages/Todos/TodoEditForm";

describe("Todo Edit Form tests", () => {
  const item = {
    value: "todo",
    id: 1,
    userId: "123456",
    done: false,
  };
  const update = jest.fn();

  const props = {
    item,
    update,
  };

  test("renders without crashing", () => {
    render(<TodoEditForm {...props} />);
  });

  test("there should be an edit button on the form", () => {
    const { getByText } = render(<TodoEditForm {...props} />);
    const editButton = getByText("Edit");
    expect(editButton).toBeInTheDocument();
  });

  test("clicking on the edit button should change the button to show done instead", () => {
    const { getByText } = render(<TodoEditForm {...props} />);
    const editButton = getByText("Edit");
    userEvent.click(editButton);
  });

  test("going into edit mode, updating the value, and clicking done behaves correctly", () => {
    const { getByText, getByDisplayValue } = render(
      <TodoEditForm {...props} />
    );
    const updatedItem = {
      ...item,
      value: "updated todo",
    };

    const editButton = getByText("Edit");
    userEvent.click(editButton);
    const input = getByDisplayValue(item.value);
    userEvent.clear(input);
    userEvent.type(input, updatedItem.value);

    const doneButton = getByText("Done");
    userEvent.click(doneButton);

    const editButtonAfterDone = getByText("Edit");
    expect(editButtonAfterDone).toBeInTheDocument();

    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(updatedItem, updatedItem.id);
  });

  test("should not be able to update the todo with an empty string for the value", () => {
    const { getByText, getByDisplayValue } = render(
      <TodoEditForm {...props} />
    );
    const updatedItem = {
      ...item,
      value: "updated todo",
    };

    const editButton = getByText("Edit");
    userEvent.click(editButton);
    const input = getByDisplayValue(item.value);
    userEvent.clear(input);

    const doneButton = getByText("Done");
    userEvent.click(doneButton);

    expect(getByText("Done")).toBeInTheDocument();
    expect(update).toHaveBeenCalledTimes(0);
  });

  test("should not be able to update the todo with an whitespace for the value", () => {
    const { getByText, getByDisplayValue } = render(
      <TodoEditForm {...props} />
    );
    const updatedItem = {
      ...item,
      value: "updated todo",
    };

    const editButton = getByText("Edit");
    userEvent.click(editButton);
    const input = getByDisplayValue(item.value);
    userEvent.clear(input);
    userEvent.type(input, "     ");

    const doneButton = getByText("Done");
    userEvent.click(doneButton);

    expect(getByText("Done")).toBeInTheDocument();
    expect(update).toHaveBeenCalledTimes(0);
  });
});
