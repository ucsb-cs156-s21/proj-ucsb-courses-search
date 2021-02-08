import React from "react";
import { render, waitFor } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import NewSchedule from "main/pages/Schedule/NewSchedule";
import userEvent from "@testing-library/user-event";
import useSWR from "swr";
import { useHistory } from 'react-router-dom';

import { fetchWithToken } from "main/utils/fetch";

import { useToasts } from 'react-toast-notifications'
jest.mock("@auth0/auth0-react");
jest.mock("swr");
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn() // and this one too
}));
jest.mock("main/utils/fetch", () => ({
  fetchWithToken: jest.fn()
}));
jest.mock('react-toast-notifications', () => ({
  useToasts: jest.fn()
}));

describe("New Schedule page test", () => {
  const user = {
    name: "test user",
  };
  const getAccessTokenSilentlySpy = jest.fn();
  const schedule = {
    "id":1,
    "name": "first",
    "description": "first schedule",
    "quarter": "fall 2020",
    "userId": "123456"
  };

  const addToast = jest.fn();
  beforeEach(() => {
    useAuth0.mockReturnValue({
      admin: undefined,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
      user: user
    });
    useToasts.mockReturnValue({
      addToast: addToast
    })
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<NewSchedule />);
  });

  test("clicking submit button redirects to Schedules page", async () => {
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });
    fetchWithToken.mockResolvedValue({
        error: "My error message"
    });

    const { getByText } = render(
      <NewSchedule />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);
    
  });

  test("clicking submit button produces error toast on error message returned from controller", async () => {

    fetchWithToken.mockResolvedValue(schedule);

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(
      <NewSchedule />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

  });

  test("clicking submit button produces error toast when onError function called", async () => {

    fetchWithToken.mockImplementation(() => {
        throw new Error();
    });

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(
      <NewSchedule />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    expect(addToast).toHaveBeenCalledTimes(1);
    expect(addToast).toHaveBeenCalledWith("Error saving schedule", { appearance: 'error' });

  });

});