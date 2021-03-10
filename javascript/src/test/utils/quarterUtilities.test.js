import { fromFormat, toFormat, yyyyqToQyy } from "main/utils/quarterUtilities";

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
  });
