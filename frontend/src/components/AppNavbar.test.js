import React from "react";
import { render } from "@testing-library/react";
import AppNavbar from "./AppNavbar";

describe("AppNavbar tests", () => {
  test("should render the correct brand text", () => {
    const { getByText } = render(<AppNavbar />);
    const brandElement = getByText(/Demo Spring React App/);
    expect(brandElement).toBeInTheDocument();
  });

  test("should have the correct links in the navbar", () => {
    const { getByText } = render(<AppNavbar />);

    const todosLink = getByText(/Todos/);
    expect(todosLink.href).toMatch(/#home/);

    const userInfoLink = getByText(/User Info/);
    expect(userInfoLink.href).toMatch(/#profile/);
  });

  test("should show log in button", () => {
    const { getByText } = render(<AppNavbar />);

    const loginButton = getByText(/Log In/);
    expect(loginButton).toBeInTheDocument();
  });
});
