import React from "react";
import { render } from "@testing-library/react";
import Schedule from "main/pages/Schedule/Schedule";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithToken } from "main/utils/fetch";
import userEvent from "@testing-library/user-event";
jest.mock("@auth0/auth0-react");
import useSWR from "swr";
jest.mock("swr");
import { waitFor } from "@testing-library/react";
jest.mock("main/utils/fetch");
jest.mock("main/services/scheduleAPI")
import { useToasts } from "react-toast-notifications";
jest.mock("react-toast-notifications", () => ({
  useToasts: jest.fn()
}));
import { useHistory } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn()
}));
import {
  buildCreateSchedule,
  buildDeleteSchedule,
  buildUpdateSchedule
} from "main/services/Schedule/scheduleServices";
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

  // test("can delete a schedule", async () => {
  //   useSWR.mockReturnValue({
  //     data: schedules,
  //     error: undefined,
  //     mutate: mutateSpy
  //   });
  //   const fakeDeleteFunction = jest.fn();
  //   buildDeleteSchedule.mockReturnValue(fakeDeleteFunction);
  //   const { getAllByTestId } = render(<Schedule />);
  //   const deleteButtons = getAllByTestId("delete-button-1");
  //   userEvent.click(deleteButtons[0]);
  //   await waitFor(() => expect(fakeDeleteFunction).toHaveBeenCalledTimes(1));
  // });

  // test("an error when deleting a schedule produces an error message toast", async () => {
  //   useSWR.mockReturnValue({
  //     data: schedules,
  //     error: undefined,
  //     mutate: mutateSpy
  //   });
  //   const fakeDeleteFunction = jest.fn();
  //   buildDeleteSchedule.mockReturnValue(fakeDeleteFunction);
  //   fakeDeleteFunction.mockImplementation
  //   const { getAllByTestId } = render(<Schedule />);
  //   const deleteButtons = getAllByTestId("delete-button-1");
  //   userEvent.click(deleteButtons[0]);
  //   await waitFor(() => expect(addToast).toHaveBeenCalledTimes(1));
  //   expect(addToast).toHaveBeenCalledWith("Error deleting schedule", { appearance: 'error' });
  // });
});