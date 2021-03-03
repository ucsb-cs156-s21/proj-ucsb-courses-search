import React from "react";
import { render,fireEvent } from "@testing-library/react";
import Home from "main/pages/Home/Home";
import { useToasts } from 'react-toast-notifications'
jest.mock("react-toast-notifications", () => ({
  useToasts: jest.fn()
}));

describe("Home tests", () => {

  const addToast = jest.fn();

  beforeEach(() => {
    useToasts.mockReturnValue({
      addToast: addToast
    })
  });

  test("renders without crashing", () => {
    render(<Home/>);
  });

  test("Test for checkbox Cancelled,Closed,Full", () => {
    const { getByTestId } =  render(<Home/>);

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
