import React from "react";
import { render } from "@testing-library/react";
import AppNavbar from "./AppNavbar";
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");

describe("AppNavbar tests", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
  });
  test("should render the correct brand text", () => {
    const { getByText } = render(<AppNavbar />);
    const brandElement = getByText(/Demo Spring React App/);
    expect(brandElement).toBeInTheDocument();
  });

  test("should have the correct links in the navbar", () => {
    const { getByText } = render(<AppNavbar />);

    const todosLink = getByText(/Todos/);
    expect(todosLink.href).toMatch("/r/todos");

    const userInfoLink = getByText(/Profile/);
    expect(userInfoLink.href).toMatch("/r/profile");
  });
});
