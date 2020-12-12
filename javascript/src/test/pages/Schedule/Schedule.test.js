import React from "react";
import { render } from "@testing-library/react";
import Schedule from "main/pages/Schedule/Schedule";
import {fetchCreateScheduleJSON, fetchGetScheduleJSON} from "main/services/scheduleAPI";
import { useAuth0 } from "@auth0/auth0-react";
import {fetchWithToken} from "main/utils/fetch";
jest.mock("@auth0/auth0-react");
import useSWR from "swr";
jest.mock("swr");
import { waitFor } from "@testing-library/react";
jest.mock("main/utils/fetch");


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

});