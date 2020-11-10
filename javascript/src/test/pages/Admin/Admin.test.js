import React from "react";
import { render } from "@testing-library/react";
import Admin from "main/pages/Admin/Admin";
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import useSWR from "swr";
jest.mock("swr");

describe("Admin tests", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      getAccessTokenSilently: jest.fn(),
    });
    useSWR.mockReturnValue({
      data: {
        role: "admin"
      }
    })
  })
  test("renders without crashing", () => {
    const { getByText } = render(<Admin />);
    expect(getByText("Admin Panel")).toBeInTheDocument();
  });
});
