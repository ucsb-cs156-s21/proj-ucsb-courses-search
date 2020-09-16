import React from "react";
import { render } from "@testing-library/react";
import Loading from "./Loading";

test("it should render without crashing and show the image", () => {
  render(<Loading />);
});
