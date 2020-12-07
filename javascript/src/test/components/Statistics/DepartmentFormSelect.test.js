import React from "react";
import { render } from "@testing-library/react";
import DepartmentFormSelect from "main/components/Statistics/DepartmentFormSelect";
import userEvent from "@testing-library/user-event";

describe("QuarterFormSelect tests", () => {
  test("renders without crashing", () => {
    render(<DepartmentFormSelect />);
  });

  test("when i select a department, the handle select is called", () => {
    const handleSelect = jest.fn();
    const { getByTestId } = render(<DepartmentFormSelect handleSelect={handleSelect} value={"CMPSC"}/>);
    const selectDept = getByTestId("select-department");
    userEvent.selectOptions(selectDept, "MATH ");
    
    expect(handleSelect).toBeCalledWith("MATH ");
  });
});