
import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "main/pages/Home/Home";
import {fetchcreateScheduleJSON, fetchdeleteScheduleJSON, fetchgetScheduleJSON, fetchgetSchedulesJSON} from "main/services/scheduleAPI";

import {fetchWithToken} from "main/utils/fetch";
jest.mock("main/utils/fetch");
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");

describe("ScheduleAPI tests",  () => {
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
    await waitFor(() => expect(getToken).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onError).toHaveBeenCalledTimes(0));
  });

  test("fetchDeleteSchedule", async () => {

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

      const onError = jest.fn();
      const getToken = jest.fn();

      const result = fetchdeleteScheduleJSON(expectedFields,getToken,onError);
      await waitFor(() => expect(getToken).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(onError).toHaveBeenCalledTimes(0));
    });

test("fetchGetSchedule", async () => {

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

  const result = fetchgetScheduleJSON(expectedFields,getToken,onSuccess,onError);
  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(getToken).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(onError).toHaveBeenCalledTimes(0));
});

 test("fetchGetSchedules", async () => {

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

  const result = fetchgetSchedulesJSON(getToken,onSuccess,onError);
  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(getToken).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(onError).toHaveBeenCalledTimes(0));
});

test("fetchCreateScheduleError", async () => {

    const sampleReturnValue = {
        id: 1,
        name: "main",
        description: "test",
        userId: "123",
        quarter: "W20",
    };

    fetchWithToken.mockImplementation(() => {
          throw new Error();
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
    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(getToken).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1));
  });

  test("fetchDeleteScheduleError", async () => {

      const sampleReturnValue = {
          id: 1,
          name: "main",
          description: "test",
          userId: "123",
          quarter: "W20",
      };

      fetchWithToken.mockImplementation(() => {
            throw new Error();
          });


      const expectedFields = {
          name: "main",
          description: "test",
          userId: "123",
          quarter: "W20"
      };

      const onError = jest.fn();
      const getToken = jest.fn();

      const result = fetchdeleteScheduleJSON(expectedFields,getToken,onError);
      await waitFor(() => expect(getToken).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(onError).toHaveBeenCalledTimes(1));
    });

test("fetchGetScheduleError", async () => {

  const sampleReturnValue = {
      id: 1,
      name: "main",
      description: "test",
      userId: "123",
      quarter: "W20",
  };

  fetchWithToken.mockImplementation(() => {
        throw new Error();
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

  const result = fetchgetScheduleJSON(expectedFields,getToken,onSuccess,onError);
  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(0));
  await waitFor(() => expect(getToken).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(onError).toHaveBeenCalledTimes(1));
});

 test("fetchGetSchedulesError", async () => {

  const sampleReturnValue = {
      id: 1,
      name: "main",
      description: "test",
      userId: "123",
      quarter: "W20",
  };

  fetchWithToken.mockImplementation(() => {
        throw new Error();
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

  const result = fetchgetSchedulesJSON(getToken,onSuccess,onError);
  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(0));
  await waitFor(() => expect(getToken).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(onError).toHaveBeenCalledTimes(1));
});




});