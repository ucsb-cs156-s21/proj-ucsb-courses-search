import React from "react";
import { render } from "@testing-library/react";
import Schedule from "main/pages/Schedule/Schedule";
import {fetchcreateScheduleJSON, fetchgetScheduleJSON} from "main/services/scheduleAPI";
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


//   test("renders role correctly", () => {
//     const { getByText } =render(<Schedule />);
//     expect(getByText("Admin")).toBeInTheDocument();
//   });
  test("renders role correctly", () => {
    const { getByText } =render(<Schedule />);
    expect(getByText("Create Personal Schedule")).toBeInTheDocument();
  });

  test("fetchCreateSchedule", async () => {
    
    const sampleReturnValue = {
        id: 1,
        name: "main",
        description: "test",
        userId: "123",
        quarter: "W20",
    };

    fetchWithToken.mockResolvedValue({
        status: 200,
        json: () => {
          return sampleReturnValue;
        },
      });


    const expectedFields = {
        name: "main",
        description: "test",
        userId: "123",
        quarter: "W20"
    };

    const onSuccess = jest.fn();
    const onError = jest.fn();
    const getToken = jest.fn();

    const result = fetchcreateScheduleJSON(expectedFields,getToken,onSuccess,onError);
    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onError).toHaveBeenCalledTimes(0));
  });

  test("fetchgetSchedule", async () => {
    
    const sampleReturnValue = {
        id: 1,
        name: "main",
        description: "test",
        userId: "123",
        quarter: "W20",
    };

    fetchWithToken.mockResolvedValue({
        status: 200,
        json: () => {
          return sampleReturnValue;
        },
      });


    const expectedFields = {
        id: "1",
    };

    const onSuccess = jest.fn();
    const onError = jest.fn();
    const getToken = jest.fn();

    const result = fetchgetScheduleJSON(expectedFields,getToken,onSuccess,onError);
    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onError).toHaveBeenCalledTimes(0));
  });  
});