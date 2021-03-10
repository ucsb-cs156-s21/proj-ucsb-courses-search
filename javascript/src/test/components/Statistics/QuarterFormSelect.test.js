import React from "react";
import { render } from "@testing-library/react";
import QuarterFormSelect from "main/components/Statistics/QuarterFormSelect";
import { fromFormat, toFormat } from "main/components/Statistics/QuarterFormSelect";
import userEvent from "@testing-library/user-event";

describe("QuarterFormSelect tests", () => {
  test("renders without crashing", () => {
    render(<QuarterFormSelect />);
  });

  test("handle select works when I choose a quarter and then a year", () => {
    const handleSelect = jest.fn();
    const { getByTestId } = render(<QuarterFormSelect handleSelect={handleSelect} testId={"select"} />);
    const selectQuarter = getByTestId("select-quarter")
    userEvent.selectOptions(selectQuarter, "1");
    const selectYear = getByTestId("select-year");
    userEvent.selectOptions(selectYear, "2021");

    expect(handleSelect).toHaveBeenCalledWith("20211");
  });

  test("handle select works when I choose year and then a quarter", () => {
    const handleSelect = jest.fn();
    const { getByTestId } = render(<QuarterFormSelect handleSelect={handleSelect} testId={"select"} />);
    const selectYear = getByTestId("select-year");
    userEvent.selectOptions(selectYear, "2021");
    const selectQuarter = getByTestId("select-quarter")
    userEvent.selectOptions(selectQuarter, "1");

    expect(handleSelect).toHaveBeenCalledWith("20211");
  });
});


