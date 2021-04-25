import {
  fromFormat,
  toFormat,
  yyyyqToQyy,
  fromNumericYYYYQ,
  toNumericYYYYQ,
  nextQuarter,
  quarterRange
} from "main/utils/quarterUtilities";

describe("QuarterFormSelect conversion tests", () => {
  test("fromFormat correctly converts", () => {
    expect(fromFormat("20211")).toBe("WINTER 2021");
  });

  test("toFormat correctly converts", () => {
    expect(toFormat("1", "2021")).toBe("20211");
  });

  test("yyyyqToQyy correctly converts", () => {
    expect(yyyyqToQyy("20211")).toBe("W21");
    expect(yyyyqToQyy("20202")).toBe("S20");
    expect(yyyyqToQyy("20193")).toBe("M19");
    expect(yyyyqToQyy("20184")).toBe("F18");
  });

  test("fromNumericYYYYQ correctly converts", () => {
    expect(fromNumericYYYYQ(20211)).toBe("20211");
    expect(fromNumericYYYYQ(20212)).toBe("20212");
    expect(fromNumericYYYYQ(20213)).toBe("20213");
    expect(fromNumericYYYYQ(20214)).toBe("20214");
  });

  test("fromNumericYYYYQ correctly throws errors", () => {
    expect(() => { fromNumericYYYYQ("20211"); }).toThrow("param should be a number");
    expect(() => { fromNumericYYYYQ(2021); }).toThrow("param should be five digits");
    expect(() => { fromNumericYYYYQ(20210); }).toThrow("param should end in 1,2,3 or 4");
    expect(() => { fromNumericYYYYQ(20215); }).toThrow("param should end in 1,2,3 or 4");
  });

  test("nextQuarter correctly increments", () => {
    expect(nextQuarter(20211)).toBe(20212);
    expect(nextQuarter(20212)).toBe(20213);
    expect(nextQuarter(20213)).toBe(20214);
    expect(nextQuarter(20214)).toBe(20221);
  });

  test("nextQuarter correctly throws errors", () => {
    expect(() => { nextQuarter("20211"); }).toThrow("param should be a number");
    expect(() => { nextQuarter(2021); }).toThrow("param should be five digits");
    expect(() => { nextQuarter(20210); }).toThrow("param should end in 1,2,3 or 4");
    expect(() => { nextQuarter(20215); }).toThrow("param should end in 1,2,3 or 4");
  });


  test("toNumericYYYYQ correctly converts", () => {
    expect(toNumericYYYYQ("20211")).toBe(20211);
    expect(toNumericYYYYQ("20212")).toBe(20212);
    expect(toNumericYYYYQ("20213")).toBe(20213);
    expect(toNumericYYYYQ("20214")).toBe(20214);
  });

  test("toNumericYYYYQ correctly throws errors", () => {
    expect(() => { toNumericYYYYQ(20211); }).toThrow("param should be a string");
    expect(() => { toNumericYYYYQ("2021"); }).toThrow("param should be five digits");
    expect(() => { toNumericYYYYQ("20210"); }).toThrow("param should end in 1,2,3 or 4");
    expect(() => { toNumericYYYYQ("20215"); }).toThrow("param should end in 1,2,3 or 4");
  });

  test("quarterRange correctly computes ranges", () => {
    expect(
      quarterRange("20211", "20222"))
      .toStrictEqual([
        {yyyyq: "20211", qyy: "W21"}, 
        {yyyyq: "20212", qyy: "S21"},
        {yyyyq: "20213", qyy: "M21"},
        {yyyyq: "20214", qyy: "F21"},
        {yyyyq: "20221", qyy: "W22"}, 
        {yyyyq: "20222", qyy: "S22"}, 
      ]);

    expect(
      quarterRange("20211", "20211"))
      .toStrictEqual([
        {yyyyq: "20211", qyy: "W21"}, 
      ]);
 
      expect(quarterRange("20221", "20212")).toStrictEqual([]);
  });

});
