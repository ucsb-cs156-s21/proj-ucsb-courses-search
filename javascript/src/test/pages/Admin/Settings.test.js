import React from "react";
import { render } from "@testing-library/react";
import AdminSettings from "main/pages/Admin/AdminSettings";

describe("Admin Settings tests", () => {
  test("renders without crashing", () => {
    const { getByText } = render(<AdminSettings />);
    expect(getByText("Admin Settings")).toBeInTheDocument();
  });
});
