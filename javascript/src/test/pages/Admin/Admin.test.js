import React from "react";
import { render } from "@testing-library/react";
import Admin from "main/pages/Admin/Admin";
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import useSWR from "swr";
jest.mock("swr");

describe("Admin tests", () => {
  const admins = [
    {
      id: 2,
      email: "biden@usa.gov",
      firstName: "Joe",
      lastName: "Biden"
    },
    {
      id: 3,
      email: "kamala@usa.gov",
      firstName: "Kamala",
      lastName: "Harris"
    },
  ];
  const users = [
    {
      id: 1,
      email: "test@example.com",
      firstName: "Test",
      lastName: "Person"
    },
    {
      id: 2,
      email: "biden@usa.gov",
      firstName: "Joe",
      lastName: "Biden"
    },
    {
      id: 3,
      email: "kamala@usa.gov",
      firstName: "Kamala",
      lastName: "Harris"
    },
  ];
  beforeEach(() => {
    useAuth0.mockReturnValue({
      getAccessTokenSilently: jest.fn(),
    });
    useSWR.mockReturnValue({
      data: users
    });
  });
  test("renders without crashing", () => {
    const { getByText } = render(<Admin />);
    expect(getByText("Admin Panel")).toBeInTheDocument();
  });

  test("renders all users in table", () => {
    const { getByText } = render(<Admin />);
    users.forEach(user => {
      expect(getByText(String(user.id))).toBeInTheDocument();
      expect(getByText(user.email)).toBeInTheDocument();
      expect(getByText(user.firstName)).toBeInTheDocument();
      expect(getByText(user.lastName)).toBeInTheDocument();
    });
  });

  test("renders all roles in table", () => {
    useSWR.mockImplementation(([endpoint, getToken], fetch) => {
      if (endpoint === "/api/users")
        return { data:users };
      else
        return { data: admins };
    });
    const { getByText, getAllByText } = render(<Admin />);
    users.forEach(user => {
      expect(getByText(String(user.id))).toBeInTheDocument();
      expect(getByText(user.email)).toBeInTheDocument();
      expect(getByText(user.firstName)).toBeInTheDocument();
      expect(getByText(user.lastName)).toBeInTheDocument();
    });
    expect(getByText("User")).toBeInTheDocument();
    expect(getAllByText("Admin").length).toBe(2);
  });
});
