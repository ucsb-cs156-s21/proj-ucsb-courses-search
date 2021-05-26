import React from "react";
import { render } from "@testing-library/react";
import Schedule from "main/pages/Schedule/Schedule";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import { useToasts } from "react-toast-notifications";
jest.mock("@auth0/auth0-react");
jest.mock("swr");
jest.mock("main/utils/fetch");
jest.mock("react-toast-notifications", () => ({
  useToasts: jest.fn()
}));
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn()
}));

const schedules = [{
  "id": 1,
  "name": "first",
  "description": "first schedule",
  "quarter": "fall 2020",
  "userId": "123456"
}];

describe("Schedule tests", () => {

  const getAccessTokenSilentlySpy = jest.fn();
  const mutateSpy = jest.fn();
  const addToast = jest.fn();
  beforeEach(() => {
    useAuth0.mockReturnValue({
      user: {
        name: "test user",
        email: "test@test.com",
        picture: "https://picsum.photos/200",
      },
      getAccessTokenSilently: getAccessTokenSilentlySpy
    });
    useToasts.mockReturnValue({
      addToast: addToast
    });
  });

  test("renders without crashing", () => {
    useSWR.mockReturnValue({
      data: schedules,
      error: undefined,
      mutate: mutateSpy
    });
    render(<Schedule />);
  });

});