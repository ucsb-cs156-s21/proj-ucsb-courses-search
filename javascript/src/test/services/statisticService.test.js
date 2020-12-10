import { fetchClassSize } from "main/services/statisticsService";

import fetch from "isomorphic-unfetch";
jest.mock("isomorphic-unfetch");

describe("ClassSize tests",  () => {
  test("fetchClassSize", async () => {
    
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
        startQuarter: "20201",
        endQuarter: "20204",
    };

    const result = await fetchClassSize(expectedFields);
    expect(result).toBe(sampleReturnValue);

  });
});