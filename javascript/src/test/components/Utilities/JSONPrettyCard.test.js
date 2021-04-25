import React from "react";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import JSONPrettyCard from "main/components/Utilities/JSONPrettyCard";

const mockExpression = "courseJSON";
const mockJSONValue = '{"course" : "cs148", "otherKey" : "other value"}';

describe("JSONPrettyCard render tests", () => {
  test("component renders without crashing", () => {
    render(
      <JSONPrettyCard expression={mockExpression} value={mockJSONValue} />
    );
  });

  test("initial state of accordion is collapsed", () => {
    const { getByTestId } = render(
      <JSONPrettyCard expression={mockExpression} value={mockJSONValue} />
    );
    const collapseContainer = getByTestId(
      `JSONPrettyPanel-${mockExpression}-collapse`
    );
    expect(collapseContainer.className).toEqual(
      expect.not.stringContaining("show")
    );
  });

  test("accordion shows collapsed content on click", async () => {
    const { getByTestId } = render(
      <JSONPrettyCard expression={mockExpression} value={mockJSONValue} />
    );
    const accordionToggle = getByTestId(
      `JSONPrettyPanel-${mockExpression}-toggle`
    );
    userEvent.click(accordionToggle);

    await new Promise((r) => setTimeout(r, 500));

    expect(
      getByTestId(`JSONPrettyPanel-${mockExpression}-collapse`).className
    ).toEqual(expect.stringContaining("show"));
  });
});
