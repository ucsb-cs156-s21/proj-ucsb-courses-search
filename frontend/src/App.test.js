import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { useAuth0 } from "@auth0/auth0-react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
jest.mock("@auth0/auth0-react");
describe("App tests", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
  });

  test("renders without crashing", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    const brand = getByText(/Demo Spring React App/);
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
});
