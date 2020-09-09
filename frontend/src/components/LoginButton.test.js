import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginButton from "./LoginButton";
import * as auth0 from "@auth0/auth0-react";

describe("Login Button tests", () => {
  test("it renders without crashing", () => {
    const { getByText } = render(<LoginButton />);
    const button = getByText(/Log In/);
    expect(button).toBeInTheDocument();
  });

  test("it calls the redirect function when clicked", () => {
    const useAuth0Spy = jest.spyOn(auth0, "useAuth0");
    const loginWithRedirectSpy = jest.fn();
    useAuth0Spy.mockReturnValueOnce({
      loginWithRedirect: loginWithRedirectSpy,
    });
    render(<LoginButton />);

    userEvent.click(screen.getByText(/Log In/));
    expect(loginWithRedirectSpy).toHaveBeenCalledTimes(1);
  });
});
