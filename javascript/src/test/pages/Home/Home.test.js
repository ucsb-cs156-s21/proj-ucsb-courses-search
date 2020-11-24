import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "main/pages/Home/Home";

// import { fetchBasicCourseJSON } from "main/services/courseSearches";
// jest.mock("main/services/courseSearches");

describe("Home tests", () => {
  test("renders without crashing", () => {
    render(<Home/>);
  });
});
