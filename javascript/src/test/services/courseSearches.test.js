import { fetchBasicCourseJSON, fetchBasicCourseHistoryJSON, fetchCourseHistoryNameQtrJSON, fetchGeQtrJSON, fetchInstructorHistoryNameQtrJSON} from "main/services/courseSearches";
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
        "quarter": "20204"
    };

    fetch.mockImplementation( async () => {
      return {
        json : () => {
          return sampleReturnValue;
        }
      };
    }
    );

    const expectedFields = {
      startQuarter: "20204",
      endQuarter: "20204",
      subjectArea: "CMPSC   ",
      courseNumber: "130",
      courseSuf: "A "
    };

    const result = await fetchCourseHistoryNameQtrJSON({},expectedFields);
    expect(fetch).toHaveBeenCalledWith(`/api/public/history/coursesearch?startQtr=${expectedFields.startQuarter}&endQtr=${expectedFields.endQuarter}&subjectArea=${expectedFields.subject}&courseNumber=${expectedFields.courseNumber}&courseSuf=${expectedFields.courseSuf}`)
    expect(result).toBe(sampleReturnValue);

  });

  test("fetchGeQtrJSON", async () => {
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
      startQuarter: "20211",
      endQuarter: "20211",
      geCode: "A1 "
    };

    const result = await fetchGeQtrJSON({},expectedFields);
    expect(fetch).toHaveBeenCalledWith(`/api/public/history/gesearch?startQtr=${expectedFields.startQuarter}&endQtr=${expectedFields.endQuarter}&geCode=${expectedFields.geCode}`)
    expect(result).toBe(sampleReturnValue);
  });
  
  test("fetchInstructorHistoryNameQtrJSON", async () => {
    const sampleReturnValue = {
      "quarter": "20204"
  };

  fetch.mockImplementation( async () => {
    return {
      json : () => {
        return sampleReturnValue;
      }
    };
  }
  );

  const expectedFields = {
    startQuarter: "20204",
    endQuarter: "20204",
    instructorText:"KHARITONOVA"
  };

  const result = await fetchInstructorHistoryNameQtrJSON({},expectedFields);
  expect(fetch).toHaveBeenCalledWith(`/api/public/history/instructorsearch?startQtr=${expectedFields.startQuarter}&endQtr=${expectedFields.endQuarter}&instructorText=${expectedFields.instructorText}`)
  expect(result).toBe(sampleReturnValue);
  });
});
