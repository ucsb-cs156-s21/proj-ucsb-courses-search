import React from "react";
import { render } from "@testing-library/react";
import SingleCourseSearch from "main/pages/Statistics/SingleCourseSearch";
import userEvent from "@testing-library/user-event";

import { fetchSingleCourseSearch } from "main/services/statisticsService";
jest.mock("main/services/statisticsService");

describe("SingleCourseSearch page tests", () => {
  test("renders without crashing", () => {
    render(<SingleCourseSearch />);
  });

  test("SingleCourseSearch table appears with data after pressing submit", async () => {
    const { findByText } = render(<SingleCourseSearch />);
    const sampleReturnValue = [{
      "quarter": "20211",
      "courseId": "CMPSC 156",
      "title": "ADV APP PROG",
      "openSeats": "18"
    },
    {
        "quarter": "20211",
        "courseId": "CMPSC 32",
        "title": "OBJ ORIENT DESIGN",
        "openSeats": "9"
    }];
    {
        "Lokshtanov D" : "1", 
        "Agrawal D" : "1"
    }

    SingleCourseSearch.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("CMPSC 156");
  });

  test("SingleCourseSearch no results is displayed for empty results", async () => {
    const { findByText } = render(<SingleCourseSearch />);
    const sampleReturnValue = [];

    SingleCourseSearch.mockResolvedValue(sampleReturnValue);

    const submitButton = await findByText("Submit");
    userEvent.click(submitButton);

    await findByText("There are no results!");
  });
}); 