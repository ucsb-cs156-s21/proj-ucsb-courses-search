import React from "react";
import { render } from "@testing-library/react";
import PersonalSchedule from "main/pages/Schedule/PersonalSchedule";
import { useAuth0 } from "@auth0/auth0-react";
import userEvent from "@testing-library/user-event";
import useSWR from "swr";
import { waitFor } from "@testing-library/react";
import { useToasts } from "react-toast-notifications";
import { useParams } from "react-router-dom";
import { fetchWithToken } from "main/utils/fetch";
jest.mock("@auth0/auth0-react");
jest.mock("swr");
jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useHistory: jest.fn()
}));
jest.mock("main/utils/fetch", () => ({
  fetchWithToken: jest.fn()
}));
jest.mock("react-toast-notifications", () => ({
  useToasts: jest.fn()
}));

const schedules = {
  "id": 1,
  "name": "first",
  "description": "first schedule",
  "quarter": "fall 2020",
  "userId": "123456"
};



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
    useParams.mockReturnValue({
      id: '1'
    });
    useToasts.mockReturnValue({
      addToast: addToast
    });
  });

  test("renders without crashing", () => {
    useSWR.mockReturnValue({
      data: schedules,
      error: undefined,
      mutate: mutateSpy,

    });
    render(<PersonalSchedule />);
  });

  test("renders an error message when there is an error response in delete", async () => {
    useSWR.mockReturnValue({
      data: schedules,
      error: undefined,
      mutate: mutateSpy
    });
    fetchWithToken.mockReturnValue({ error: "An error occured!" });
    const { findByTestId } = render(<PersonalSchedule />);
    const deleteButton = await findByTestId("delete-button-1");
    userEvent.click(deleteButton);
    await waitFor(() => expect(addToast).toHaveBeenCalledTimes(1));
  });

  test("test an error message appears when a response code is not 200 ok when deleting", async () => {
    useSWR.mockReturnValue({
      data: schedules,
      error: undefined,
      mutate: mutateSpy,
      id: '1'
    });
    fetchWithToken.mockImplementation(() => { throw new Error("An error occured!") });
    const { findByTestId } = render(<PersonalSchedule />);
    const deleteButton = await findByTestId("delete-button-1");
    userEvent.click(deleteButton);
    await waitFor(() => expect(addToast).toHaveBeenCalledTimes(1));
  });

  test("test deleting a schedule successfully", async () => {
    useSWR.mockReturnValue({
      data: schedules,
      error: undefined,
      mutate: mutateSpy
    });
    fetchWithToken.mockReturnValue({});
    const { findByTestId } = render(<PersonalSchedule />);
    const deleteButton = await findByTestId("delete-button-1");
    userEvent.click(deleteButton);
    await waitFor(() => expect(mutateSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(addToast).toHaveBeenCalledTimes(1));
  });

});