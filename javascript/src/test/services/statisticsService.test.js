import {
    fetchDivisionOccupancy,
    fetchCourseOccupancy,
    fetchFullCourses,
    fetchTotalCoursesByDept,
    fetchOpenCoursesByDept,
    fetchAggregateStatistics,
    fetchSingleCourseSearch
} from "main/services/statisticsService";

import fetch from "isomorphic-unfetch";
jest.mock("isomorphic-unfetch");

describe("courseCount tests",  () => {
  test("fetchDivisionOccupancy", async () => {

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
        department: "MATH ",
        level: "U"
    };

    const result = await fetchDivisionOccupancy(expectedFields);
    expect(result).toBe(sampleReturnValue);

  });
});

describe("courseCount tests",  () => {
  test("fetchCourseOccupancy", async () => {
    
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
        department: "MATH "
    };

    const result = await fetchCourseOccupancy(expectedFields);
    expect(result).toBe(sampleReturnValue);

  });
});

describe("courseCount tests",  () => {
  test("fetchFullCoursesByDept", async () => {
    
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
        department: "MATH "
    };
    
    const result = await fetchFullCourses(expectedFields);
    expect(result).toBe(sampleReturnValue);

  });
});

describe("totalCoursesByDept tests",  () => {
    test("totalCoursesByDept", async () => {

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
        };

        const result = await fetchTotalCoursesByDept(expectedFields);
        expect(result).toBe(sampleReturnValue);
    });
});

describe("aggregateStatistics tests",  () => {
  test("aggregateStatistics", async () => {

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
      };

      const result = await fetchAggregateStatistics(expectedFields);
      expect(result).toBe(sampleReturnValue);
  });
});
describe("openCoursesByDept tests",  () => {
    test("openCoursesByDept", async () => {

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
            department: "CMPSC"
        };

        const result = await fetchOpenCoursesByDept(expectedFields);
        expect(result).toBe(sampleReturnValue);
    });
});
describe("singleCourseSearch tests",  () => {
  test("singleCourseSearch", async () => {

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
        startQuarter: "20204",
        endQuarter: "20211",
        department: "CMPSC",
        courseNumber: "",
        courseSuf: ""
    };

      const result = await fetchSingleCourseSearch(expectedFields);
      expect(result).toBe(sampleReturnValue);
  });
});