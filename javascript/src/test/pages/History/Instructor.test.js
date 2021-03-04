import React from "react";
import { render,fireEvent } from "@testing-library/react";
import Instructor from "main/pages/History/Instructor";

describe("History Instructor Course Search page tests", () => {
  test("renders without crashing", () => {
    render(<Instructor/>);
  });

  test("Test for checkbox Cancelled,Closed,Full", () => {
    const { getByTestId } =  render(<Instructor/>);

    const checkbox1 = getByTestId(`inline-checkbox-1`);
    expect(checkbox1.checked).toEqual(false);
    fireEvent.click(checkbox1);
    expect(checkbox1.checked).toEqual(true);

    const checkbox2 = getByTestId(`inline-checkbox-2`);
    expect(checkbox2.checked).toEqual(false);
    fireEvent.click(checkbox2);
    expect(checkbox2.checked).toEqual(true);

    const checkbox3 = getByTestId(`inline-checkbox-3`);
    expect(checkbox3.checked).toEqual(false);
    fireEvent.click(checkbox3);
    expect(checkbox3.checked).toEqual(true);
  });

});
