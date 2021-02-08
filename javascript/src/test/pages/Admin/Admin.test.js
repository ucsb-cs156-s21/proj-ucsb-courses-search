import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Admin from "main/pages/Admin/Admin";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import { fetchWithToken } from "main/utils/fetch";
jest.mock("@auth0/auth0-react");
jest.mock("swr");
jest.mock("main/utils/fetch");

describe("Admin tests", () => {
  const admins = [
    {
      id: 2,
      email: "cgaucho@ucsb.edu",
      isPermanentAdmin: true
    },
    {
      id: 3,
      email: "ldelplaya@usa.gov",
      isPermanentAdmin: false
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
      email: "cgaucho@ucsb.edu",
      firstName: "Chris",
      lastName: "Gaucho"
    },
    {
      id: 3,
      email: "ldelplaya@usa.gov",
      firstName: "Laura",
      lastName: "Del Playa"
    },
  ];
  const mutateSpy = jest.fn();
  beforeEach(() => {
    useAuth0.mockReturnValue({
      getAccessTokenSilently: jest.fn(),
    });
    useSWR.mockImplementation(([endpoint, getToken], fetch) => {
      if (endpoint === "/api/users")
        return {
          data: users,
        };
      else
        return {
          data: admins,
          mutate: mutateSpy,
        };
    });
  });
  test("renders without crashing", () => {
    const { getByText } = render(<Admin />);
    expect(getByText("Admin Panel")).toBeInTheDocument();
  });

  test("renders when no admins exist", () => {
    useSWR.mockImplementation(([endpoint, getToken], fetch) => {
      if (endpoint === "/api/users")
        return {
          data: users,
        };
      else
        return {
          data: null,
        };
    });
    const { getByText, queryByText } = render(<Admin />);
    expect(getByText("Admin Panel")).toBeInTheDocument();
    expect(queryByText("Admin")).not.toBeInTheDocument();
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

  test("clicking promote button should trigger user promotion", async () => {
    fetchWithToken.mockReturnValueOnce({
      id: 12,
      email: users[0].email,
      isPermanentAdmin: false
    });
    const { getByText } = render(<Admin />);
    userEvent.click(getByText("Promote"));
    await waitFor(() => expect(fetchWithToken).toHaveBeenCalledTimes(1));
    expect(mutateSpy).toHaveBeenCalledTimes(1);
  });

  test("clicking demote button should trigger user promotion", async () => {
    fetchWithToken.mockReturnValueOnce({});
    const { getByText } = render(<Admin />);
    userEvent.click(getByText("Demote"));
    await waitFor(() => expect(fetchWithToken).toHaveBeenCalledTimes(1));
    expect(mutateSpy).toHaveBeenCalledTimes(1);
  });
});
