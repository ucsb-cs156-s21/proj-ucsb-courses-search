import React from "react";
import { render } from "@testing-library/react";
import AuthNav from "main/components/Nav/AuthNav";
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
describe("AuthNav tests", () => {
  const user = {
    name: "Test",
    picture: "http://placekitten.com/200/300"
  }

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
      user
    });
    const { getByText } = render(<AuthNav />);
    const loginButton = getByText(/Log Out/);
    expect(loginButton).toBeInTheDocument();
  });

  test("it renders a welcome message and profile picture when logged in", () => {

    useAuth0.mockReturnValueOnce({
      user
    });
    const { getByText, getByAltText } = render(<AuthNav />);
    const welcomeText = getByText("Hello, " + user.name);
    expect(welcomeText).toBeInTheDocument();
    const profileImage = getByAltText("Profile");
    expect(profileImage).toBeInTheDocument();
  });
});
