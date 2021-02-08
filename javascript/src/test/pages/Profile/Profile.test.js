import React from "react";
import { render } from "@testing-library/react";
import Profile from "main/pages/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
jest.mock("@auth0/auth0-react");
jest.mock("swr");

describe("Profile tests", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      user: {
        name: "test user",
        email: "test@test.com",
        picture: "https://picsum.photos/200",
      },
    });
    useSWR.mockReturnValue({
      data: {
        role : "Admin"
      }
    })
  });
  test("renders without crashing", () => {
    render(<Profile />);
  });

  test("renders loading when role hasn't been retrieved", () => {
    useSWR.mockReturnValue({});
    const { getByText } =render(<Profile />);
    expect(getByText("Loading role...")).toBeInTheDocument();
  });

  test("renders role correctly", () => {
    const { getByText } =render(<Profile />);
    expect(getByText("Admin")).toBeInTheDocument();
  });
});
