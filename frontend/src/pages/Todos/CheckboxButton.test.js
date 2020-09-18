import React from "react";
import userEvent from "@testing-library/user-event";
import CheckboxButton from "./CheckboxButton";
import { render, screen } from "@testing-library/react";

describe("Checkbox tests", () => {
  const item = {
    done: false,
    id: 1,
    userId: 1,
    value: "todo",
  };

  test("renders without crashing", () => {
    render(<CheckboxButton item={item} />);
  });

  test("clicking the button invokes the provided toggle method with correct arguments", () => {
    const toggleSpy = jest.fn();
    const { getByAltText } = render(
      <CheckboxButton item={item} index={0} toggle={toggleSpy} />
    );
    userEvent.click(getByAltText("checkbox"));
    expect(toggleSpy).toHaveBeenCalledTimes(1);
    expect(toggleSpy).toHaveBeenCalledWith(0, item.id);
  });
});
