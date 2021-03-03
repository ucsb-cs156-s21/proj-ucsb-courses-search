import React from "react";
import { render } from "@testing-library/react";
import App from "main/App";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import { useToasts } from 'react-toast-notifications'
import { allTheSubjects } from "main/fixtures/Courses/subjectFixtures";

jest.mock("@auth0/auth0-react");
jest.mock("swr");
jest.mock("react-toast-notifications", () => ({
  useToasts: jest.fn()
}));

describe("App tests", () => {

  const addToast = jest.fn();

  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
      getAccessTokenSilently: jest.fn(),
    });
    useSWR.mockImplementation( 
      (key, _fetcher, _options) => {
        if ( Array.isArray(key) && key[0] === "/api/myRole") {
          return  { data: { role: "guest" } };
        }
        if (key==="/api/public/subjects") {
            return  { data: allTheSubjects }
        }
        return { data: "Unexpected key in mocked useSWR"}
    });
    useToasts.mockReturnValue({
      addToast: addToast
    })
  });

  test("renders without crashing", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    const brand = getByTestId("brand");
    expect(brand).toBeInTheDocument();
  });

  test("renders loading when loading", () => {
    useAuth0.mockReturnValueOnce({
      ...useAuth0(),
      isLoading: true,
    });
    const { getByAltText } = render(<App />);
    const loading = getByAltText("Loading");
    expect(loading).toBeInTheDocument();
  });

    // Unfortunately, there is no way to verify that the admin route is available or not. As a result, this test verifies another side-effect of being an admin.
  test("renders admin route when user is admin", async () => {
    useSWR.mockImplementation( 
      (key, _fetcher, _options) => {
        if ( Array.isArray(key) && key[0] === "/api/myRole") {
          return  { data: { role: "admin" } };
        }
        if (key==="/api/public/subjects") {
            return  { data: allTheSubjects }
        }
        return { data: "Unexpected key in mocked useSWR"}
    });

    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(getByText("Admin")).toBeInTheDocument();
  });
});
