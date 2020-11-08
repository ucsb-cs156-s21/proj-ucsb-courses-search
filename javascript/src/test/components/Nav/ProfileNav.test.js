import React from "react";
import ProfileNav from "main/components/Nav/ProfileNav";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");

describe("Profile Nav tests", () => {
  test("it renders the link if user is authenticated", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <ProfileNav />
      </Router>
    );
    expect(getByText("Profile")).toBeInTheDocument();
  });

  test("it does not render the link if user is not authenticated", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
    });
    const history = createMemoryHistory();
    const { queryByText } = render(
      <Router history={history}>
        <ProfileNav />
      </Router>
    );
    expect(queryByText("Profile")).toBeNull();
  });
})