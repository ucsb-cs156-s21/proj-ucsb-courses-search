import React from "react";
import { render } from "@testing-library/react";
import Schedule from "main/pages/Schedule/Schedule";
import {fetchCreateScheduleJSON, fetchGetScheduleJSON, fetchDeleteScheduleJSON} from "main/services/scheduleAPI";
import { useAuth0 } from "@auth0/auth0-react";
import {fetchWithToken} from "main/utils/fetch";
import userEvent from "@testing-library/user-event";
jest.mock("@auth0/auth0-react");
import useSWR from "swr";
jest.mock("swr");
import { waitFor } from "@testing-library/react";
jest.mock("main/utils/fetch");
jest.mock("main/services/scheduleAPI")


describe("Schedule tests", () => {

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
    render(<Schedule />);
  });


  test("renders role correctly", () => {
    const { getByText } =render(<Schedule />);
    expect(getByText("Schedule Name")).toBeInTheDocument();
    expect(getByText("Get Schedule")).toBeInTheDocument();
  });

  test("create schedule clicks correctly", async () => {
      const { getByText } =render(<Schedule />);

      const sampleReturnValue = {
        "id":1,
        "name": "first",
        "description": "first schedule",
        "quarter": "fall 2020",
        "userId": "123456"
      };

      fetchCreateScheduleJSON.mockResolvedValue(sampleReturnValue);

      const submitButton = getByText("Create Schedule");
      userEvent.click(submitButton);
      await waitFor(() => expect(fetchCreateScheduleJSON).toHaveBeenCalledTimes(1));

    });

    test("Get Schedule clicks correctly", async () => {
        const { getByText } =render(<Schedule />);

        const sampleReturnValue = {
          "id":1,
          "name": "first",
          "description": "first schedule",
          "quarter": "fall 2020",
          "userId": "123456"
        };

        fetchGetScheduleJSON.mockResolvedValue(sampleReturnValue);
        const submitButton = getByText("Get Schedule");
        userEvent.click(submitButton);
        await waitFor(() => expect(fetchGetScheduleJSON).toHaveBeenCalledTimes(1));
    });

    test("Delete Schedule clicks correctly", async () => {
      const { getByText } =render(<Schedule />);

      const sampleReturnValue = {
        "id":1,
        "name": "first",
        "description": "first schedule",
        "quarter": "fall 2020",
        "userId": "123456"
      };

      const submitButton = getByText("Delete Schedule");
      userEvent.click(submitButton);
      await waitFor(() => expect(fetchDeleteScheduleJSON).toHaveBeenCalledTimes(1));
    });



});