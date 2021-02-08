import React from "react";
import { render } from "@testing-library/react";
import Schedule from "main/pages/Schedule/Schedule";
import { useAuth0 } from "@auth0/auth0-react";
import userEvent from "@testing-library/user-event";
import useSWR from "swr";
import { waitFor } from "@testing-library/react";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import {
  buildCreateSchedule,
  buildDeleteSchedule,
  buildUpdateSchedule
} from "main/services/Schedule/scheduleServices";
jest.mock("@auth0/auth0-react");
jest.mock("swr");
jest.mock("main/utils/fetch");
jest.mock("react-toast-notifications", () => ({
  useToasts: jest.fn()
}));
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn()
}));
jest.mock("main/services/Schedule/scheduleServices", () => ({
  buildCreateSchedule: jest.fn(),
  buildDeleteSchedule: jest.fn(),
  buildUpdateSchedule: jest.fn()
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

  test("renders an error message when there is an error", () => {
    useSWR.mockReturnValue({
      data: schedules,
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: undefined,
      error: new Error("this is an error"),
      mutate: mutateSpy
    });
    const { getByText } = render(<Schedule />);
  });

  test("new button takes us to the new schedule page", async () => {
    useSWR.mockReturnValue({
      data: schedules,
      error: undefined,
      mutate: mutateSpy
    });
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getAllByTestId } = render(<Schedule />);
    const newButtons = getAllByTestId("new-schedule-button");
    userEvent.click(newButtons[0]);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });

});