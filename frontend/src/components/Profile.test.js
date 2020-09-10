import React from "react";
import { render } from "@testing-library/react";
import Profile from "./Profile";

describe("Profile tests", () => {
  test("renders without crashing", () => {
    render(<Profile />);
  });
});
