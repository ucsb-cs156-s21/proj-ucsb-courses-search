import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "main/pages/Home/Home";
import fetch from "isomorphic-unfetch";
import { fetchBasicCourseJSON } from "main/services/courseSearches";

jest.mock("isomorphic-unfetch");

describe("courseSearches tests",  () => {
  test("fetchBasicCourseJSON", async () => {
    
    const sampleReturnValue = {
        "sampleKey": "sampleValue"
    };

    fetch.mockResolvedValue({
        status: 200,
        json: () => {
          return sampleReturnValue;
        },
      });

    const expectedFields = {
        quarter: "20204",
        department: "MATH",
        level: "G"
    };

    const result = fetchBasicCourseJSON({},expectedFields);
    expect(await result).toBe(sampleReturnValue);

  });
});