import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Router, useHistory, useParams } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import EditSchedule from "main/pages/Schedule/EditSchedule";
import userEvent from "@testing-library/user-event";

import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";

import { fetchWithToken } from "main/utils/fetch";

import { useToasts } from 'react-toast-notifications'
jest.mock("swr");
jest.mock("@auth0/auth0-react");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use real functions 
  useParams: jest.fn(), // except for just this one
  useHistory: jest.fn() // and this one too
}));
jest.mock("main/utils/fetch", () => ({
  fetchWithToken: jest.fn()
}));
jest.mock('react-toast-notifications', () => ({
  useToasts: jest.fn()
}));

const schedule = {
    "id":1,
    "name": "first",
    "description": "first schedule",
    "quarter": "fall 2020",
    "userId": "123456"
  };

describe("Edit Schedule page test", () => {
  const user = {
    name: "test user",
  };
  const getAccessTokenSilentlySpy = jest.fn();
  const mutateSpy = jest.fn();
  const addToast = jest.fn();

  beforeEach(() => {
    useAuth0.mockReturnValue({
      admin: undefined,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
      user: user
    });
    useParams.mockReturnValue({
      id: '1'
    });
    useToasts.mockReturnValue({
      addToast: addToast
    })
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Renders schedule with existing schedule", async () => {
    useSWR.mockReturnValue({
      data: schedule,
      error: undefined,
      mutate: mutateSpy,
    });
    const { getByText, getByLabelText } = render(
      <EditSchedule />
    );

    await waitFor(() => (
      expect(getByText("Schedule Name")).toBeInTheDocument() &&
      expect(getByLabelText("Schedule Name").value).toEqual(schedule.name)
    ));
    
  });

  test("Renders spinner with no existing schedule", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      mutate: mutateSpy,
    });
    const { getByTestId } = render(
      <EditSchedule />
    );
    const spinner = getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  test("With existing schedule, pressing submit routes back to Schedules page", async () => {
    useSWR.mockReturnValue({
      data: schedule,
      error: undefined,
      mutate: mutateSpy,
    });

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(
      <EditSchedule />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
    expect(pushSpy).toHaveBeenCalledWith("/schedule");

  });

  test("clicking submit button produces error toast on error", async () => {

    fetchWithToken.mockImplementation(() => {
      throw new Error();
    });

    useSWR.mockReturnValue({
      data: schedule,
      error: undefined,
      mutate: mutateSpy,
    });

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(
      <EditSchedule />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    expect(addToast).toHaveBeenCalledTimes(1);
    expect(addToast).toHaveBeenCalledWith("Error saving schedule", { appearance: 'error' });

  });


});