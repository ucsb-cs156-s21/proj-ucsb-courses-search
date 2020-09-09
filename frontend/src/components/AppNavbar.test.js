import React from "react";
import { render } from "@testing-library/react";
import AppNavbar from "./AppNavbar";

test("should render the correct brand text", () => {
  const { getByText } = render(<AppNavbar />);
  const brandElement = getByText(/Demo Spring React App/);
  expect(brandElement).toBeInTheDocument();
});
