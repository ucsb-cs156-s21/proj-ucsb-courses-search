import React from "react";
import { render } from "@testing-library/react";
import Schedule from "main/pages/Schedule/Schedule";
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import useSWR from "swr";
jest.mock("swr");

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

  test("renders AddSchedForm", () => {
      const {getByTestId} = render(<Schedule />);
      expect(getByTestId("schedule-name")).toBeInTheDocument();
    });

  test("renders ScheduleSearchForm", () => {
        const {getByTestId} = render(<Schedule />);
        expect(getByTestId("schedule-id")).toBeInTheDocument();
      });


  test("renders role correctly", () => {
    const { getByText } =render(<Schedule />);
    expect(getByText("Create Personal Schedule")).toBeInTheDocument();
  });
});