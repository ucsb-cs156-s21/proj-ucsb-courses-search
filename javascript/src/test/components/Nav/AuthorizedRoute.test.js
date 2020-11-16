import React from "react";
import { render } from "@testing-library/react";
import AuthorizedRoute from "main/components/Nav/AuthorizedRoute";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import useSWR from "swr";
jest.mock("swr");

describe("Authorized Route tests", () => {
  const component = () => {
    return (<div>Hello</div>);
  }

  beforeEach(() => {
    useAuth0.mockReturnValue({
      isLoading: false,
      getAccessTokenSilently: jest.fn(),
    });
    useSWR.mockReturnValue({
      data: {
        role: "guest"
      }
    });
  });

  test("if data not yet retrieved, render loading", () => {
    useAuth0.mockReturnValue({
      isLoading: true
    });
    const {getByAltText} = render(
    <Router history={createMemoryHistory()}>
      <AuthorizedRoute component={component} authorizedRoles={[]}/>
    </Router>);
    expect(getByAltText("Loading")).toBeInTheDocument();
  });
  test("if role doesn't match authorized role, component should not render", () => {
    const {queryByText} = render(
    <Router history={createMemoryHistory()}>
      <AuthorizedRoute component={component} authorizedRoles={["admin"]} />
    </Router>);
    expect(queryByText("Hello")).toBe(null);
  });

  test("if condition is true, component should", () => {
    const {getByText} = render(
    <Router history={createMemoryHistory()}>
      <AuthorizedRoute component={component} authorizedRoles={["guest"]} />
    </Router>);
    expect(getByText("Hello")).toBeInTheDocument();
  });
});