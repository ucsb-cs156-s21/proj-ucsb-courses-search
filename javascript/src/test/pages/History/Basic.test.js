import React from "react";
import { render,fireEvent } from "@testing-library/react";
import Basic from "main/pages/History/Basic";
import { useToasts } from 'react-toast-notifications'

jest.mock("react-toast-notifications", () => ({
  useToasts: jest.fn()
}));


describe("History Basic Course Search page tests", () => {

  const addToast = jest.fn();
  beforeEach(() => {
      useToasts.mockReturnValue({
          addToast: addToast
        })
  });
  
  test("renders without crashing", () => {
    const { getByText } =  render(<Basic/>);
    expect(getByText("Data on this page is accurate for past quarters, but may be incomplete or out of date for current and future quarters. Course information is not immediately updated.")).toBeInTheDocument();
    expect(getByText("Search Archived Course Data")).toBeInTheDocument();
  });

  test("Test for checkbox Cancelled,Closed,Full", () => {
    const { getByTestId } =  render(<Basic/>);

    const checkboxCancelled = getByTestId("inline-checkbox-cancelled");
    expect(checkboxCancelled.checked).toEqual(false);
    fireEvent.click(checkboxCancelled);
    expect(checkboxCancelled.checked).toEqual(true);

    const checkboxClosed = getByTestId("inline-checkbox-closed");
    expect(checkboxClosed.checked).toEqual(false);
    fireEvent.click(checkboxClosed);
    expect(checkboxClosed.checked).toEqual(true);

    const checkboxFull = getByTestId("inline-checkbox-full");
    expect(checkboxFull.checked).toEqual(false);
    fireEvent.click(checkboxFull);
    expect(checkboxFull.checked).toEqual(true);
  });
});