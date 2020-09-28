import React from "react";
import { render } from "@testing-library/react";
import AuthNav from "main/components/Nav/AuthNav";
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
describe("AuthNav tests", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  });
  test("it renders without crashing", () => {
    render(<AuthNav />);
  });

  test("it renders a login button when logged out", () => {
    useAuth0.mockReturnValueOnce({
      isAuthenticated: false,
    });
    const { getByText } = render(<AuthNav />);
    const loginButton = getByText(/Log In/);
    expect(loginButton).toBeInTheDocument();
  });

  test("it renders a logout button when logged out", () => {
    useAuth0.mockReturnValueOnce({
      isAuthenticated: true,
    });
    const { getByText } = render(<AuthNav />);
    const loginButton = getByText(/Log Out/);
    expect(loginButton).toBeInTheDocument();
  });
});
