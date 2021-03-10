import { reformatJSON } from 'main/utils/BasicCourseTableHelpers';
import * as helperFixtures from "main/fixtures/Courses/BasicCourseTableHelpersFixtures"

describe("BasicCourseTableHelpers tests", () => {
  const checks = [false,false,false];
  
  test("reformatJSON properly reformats the json", () => {
    const testOutput = reformatJSON(helperFixtures.classesInput,checks);
    expect(testOutput).toStrictEqual(helperFixtures.sectionsOutput);
  });
 
  const checks2 = [false,true,false];
  test("reformatJSON properly reformats the json while closed set to true and the lecture should be hided", () => {
    const testOutput = reformatJSON(helperFixtures.classesInputLectureClosed,checks2);
    expect(testOutput).toStrictEqual([]);
  });

  const checks3 = [true,false,false];
  test("reformatJSON properly reformats the json while cancelled set to true and the lecture should be hided", () => {
    const testOutput = reformatJSON(helperFixtures.classesInputLectureCancelled,checks3);
    expect(testOutput).toStrictEqual([]);
  });
  
  const checks4 = [false,false,true];
  test("reformatJSON properly reformats the json while full set to true and the lecture should be hided", () => {
    const testOutput = reformatJSON(helperFixtures.classesInputLectureFull,checks4);
    expect(testOutput).toStrictEqual([]);
  });
  
  const checks5 = [true,true,true];
  test("reformatJSON properly reformats the json while closed/cancelled/full set to true", () => {
    const testOutput = reformatJSON(helperFixtures.classesInputSectionCancelledClosedFull,checks5);
    expect(testOutput).toStrictEqual(helperFixtures.sectionsOutputCancelledClosedFull);
  });

});