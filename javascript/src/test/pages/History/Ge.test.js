import React from "react";
import { render,fireEvent } from "@testing-library/react";
import Ge from "main/pages/History/Ge";

describe("History Ge Course Search page tests", () => {
  test("renders without crashing", () => {
    render(<Ge/>);
  });

  test("Test for checkbox Cancelled,Closed,Full", () => {
    const { getByTestId } =  render(<Ge/>);

    const checkbox1 = getByTestId("inline-checkbox-cancelled");
    expect(checkbox1.checked).toEqual(false);
    fireEvent.click(checkbox1);
    expect(checkbox1.checked).toEqual(true);

    const checkbox2 = getByTestId("inline-checkbox-closed");
    expect(checkbox2.checked).toEqual(false);
    fireEvent.click(checkbox2);
    expect(checkbox2.checked).toEqual(true);

    const checkbox3 = getByTestId("inline-checkbox-full");
    expect(checkbox3.checked).toEqual(false);
    fireEvent.click(checkbox3);
    expect(checkbox3.checked).toEqual(true);
  });
  
});
