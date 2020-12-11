import React from "react";
import { render } from "@testing-library/react";
import Schedule from "main/pages/Schedule/Schedule";
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import useSWR from "swr";
jest.mock("swr");

describe("Schedule tests", () => {
  
  test("renders without crashing", () => {
    render(<Schedule />);
  });


//   test("renders role correctly", () => {
//     const { getByText } =render(<Schedule />);
//     expect(getByText("Admin")).toBeInTheDocument();
//   });
  test("renders role correctly", () => {
    const { getByText } =render(<Schedule />);
    expect(getByText("Personal Schedule features coming soon")).toBeInTheDocument();
  });
});