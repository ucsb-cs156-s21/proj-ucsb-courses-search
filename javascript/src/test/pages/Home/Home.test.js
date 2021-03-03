import React from "react";
import { render } from "@testing-library/react";
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
});
