import React from "react";
import { render } from "@testing-library/react";
import AppFooter, {space} from "main/components/Footer/AppFooter";

describe("AppFooter tests", () => {

  test("space stands for a space", () => {
    expect(space).toBe(" ");
  });


  test("renders without crashing", () => {
    render(<AppFooter />);
  });

  test("Links are correct", async () => {
    const { getByText } = render(<AppFooter />);
    expect(getByText("CMPSC 156").closest("a")).toHaveAttribute(
      "href",
      "https://ucsb-cs156.github.io"
    );
    expect(getByText("UCSB").closest("a")).toHaveAttribute(
      "href",
      "https://ucsb.edu"
    );
    expect(getByText(/GitHub/i).closest("a")).toHaveAttribute(
      "href",
      "https://github.com/ucsb-cs156-s21/proj-ucsb-courses-search"
    );
  });
});
