import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "main/pages/Home/Home";
import { fetchBasicCourseJSON, fetchBasicCourseHistoryJSON, fetchCourseHistoryNameQtrJSON } from "main/services/courseSearches";

import fetch from "isomorphic-unfetch";
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


  test("fetchBasicCourseHistoryJSON", async () => {
    
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

    const result = await fetchBasicCourseHistoryJSON({},expectedFields);
    expect(result).toBe(sampleReturnValue);

  });

  test("fetchCourseHistoryNameQtrJSON", async () => {
    
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

    const result = await fetchCourseHistoryNameQtrJSON({},expectedFields);
    expect(result).toBe(sampleReturnValue);

  });
});
