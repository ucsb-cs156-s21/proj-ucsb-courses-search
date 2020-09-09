import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { useAuth0 } from "@auth0/auth0-react";
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
    const { getByText } = render(<App />);
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
