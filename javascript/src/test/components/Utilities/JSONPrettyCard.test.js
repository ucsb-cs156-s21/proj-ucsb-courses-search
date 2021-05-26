import React from "react";
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

});
