import React from "react";
import { render } from "@testing-library/react";
import AppNavbar from "main/components/Nav/AppNavbar";
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

describe("AppNavbar tests", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
  });
  test("should render the correct brand text", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <AppNavbar />
      </Router>
    );
    const brandElement = getByText(/Demo Spring React App/);
    expect(brandElement).toBeInTheDocument();
  });
  test("should have the correct links in the navbar", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <AppNavbar />
      </Router>
    );

    const todosLink = getByText(/Todos/);
    expect(todosLink.href).toMatch("/todos");

    const userInfoLink = getByText(/Profile/);
    expect(userInfoLink.href).toMatch("/profile");
  });
});
