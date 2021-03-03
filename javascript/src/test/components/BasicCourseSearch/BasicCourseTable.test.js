import React from "react";
import { render } from "@testing-library/react";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";
import * as courseFixtures from "main/fixtures/Courses/courseFixtures"

describe("BasicCourseTable tests", () => {

  test("renders without crashing", () => {
    render(<BasicCourseTable classes={[]} />);
  });

  function getBackgroundColor (getByText, text) {
  	return getByText(text).closest("tr")[Object.keys(getByText(text).closest("tr"))[1]].style.backgroundColor
  }
  
  // Testing Quarter column displays properly
  test("Checking that quarter column displays", () => {
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesLectureOnly} displayQuarter/>);
  	expect(queryByText("20211")).not.toBe(null);
  });
  test("Checking that quarter column does not display when not passed in true", () => {
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesLectureOnly}/>);
  	expect(queryByText("20211")).toBe(null);
  });
  // Testing Lectures
  test("check that lecture sections course number appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesLectureOnly} />);
  	expect(queryByText("CMPSC 8")).not.toBe(null);
  });

  test("check that lecture sections title appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesLectureOnly} />);
  	expect(queryByText("INTRO TO COMP SCI")).not.toBe(null);
  });

  test("check that lecture sections section number appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesLectureOnly} />);
  	expect(queryByText("0100")).not.toBe(null);
  });

  test("check that lecture sections instructor appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesLectureOnly} />);
  	expect(queryByText("KHARITONOVA Y")).not.toBe(null);
  });

  test("check that lecture sections enroll code appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesLectureOnly} />);
  	expect(queryByText("07492")).not.toBe(null);
  });

  test("check that lecture sections unit appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesLectureOnly} />);
  	expect(queryByText("4")).not.toBe(null);
  });

  test("check that lectures days appear", () => {
    const {queryByText} = render(<BasicCourseTable classes = {courseFixtures.classesLectureOnly} />);
    expect( queryByText("T R")).not.toBe(null);
  });

  test("check that lectures times appear", () => {
    const {queryByText} = render(<BasicCourseTable classes = {courseFixtures.classesLectureOnly} />);
    expect( queryByText("09:30 - 10:45")).not.toBe(null);
  });

  test("check that lectures times and days appear as TBD when they don't exist", () => {
    const {queryAllByText} = render(<BasicCourseTable classes = {courseFixtures.classesLectureOnlyTimeDaysTBD} />);
    expect( queryAllByText("TBD").length).toBe(2);
  });

  // Testing Sections
  test("check that sections course number does not appear", () => {
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesSectionOnly} />);
  	expect(queryByText("CMPSC 8")).toBe(null);
  });

  test("check that sections title does not appear", () => {
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesSectionOnly} />);
  	expect(queryByText("INTRO TO COMP SCI")).toBe(null);
  });

  test("check that sections section number appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesSectionOnly} />);
  	expect(queryByText("0101")).not.toBe(null);
  });

  test("check that sections instructor appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesSectionOnly} />);
  	expect(queryByText("CONRAD P")).not.toBe(null);
  });

  test("check that sections enroll code appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesSectionOnly} />);
  	expect(queryByText("07500")).not.toBe(null);
  });

  test("check that sections unit appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesSectionOnly} />);
  	expect(queryByText("4")).not.toBe(null);
  });

  test("check that instructors appear as TBD when there are none", () => {
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesSectionOnlyTBD} />);
  	expect(queryByText("TBD")).not.toBe(null);
  });

  test("check that sections days appear", () => {
    const {queryByText} = render(<BasicCourseTable classes = {courseFixtures.classesSectionOnly} />);
    expect( queryByText("W")).not.toBe(null);
  });

  test("check that sections times appear", () => {
    const {queryByText} = render(<BasicCourseTable classes = {courseFixtures.classesSectionOnly} />);
    expect( queryByText("09:00 - 09:50")).not.toBe(null);
  });

  test("check that sections times and days appear as TBD when they don't exist", () => {
    const {queryAllByText} = render(<BasicCourseTable classes = {courseFixtures.classesSectionOnlyTimeDaysTBD} />);
    expect( queryAllByText("TBD").length).toBe(2);
  });

  // Testing styling
  test("check that lectures have a blue background color", () => {
  	const {getByText} = render(<BasicCourseTable classes = {courseFixtures.classesLectureAndSections} />);
  	expect( getBackgroundColor(getByText, "0100") ).toBe("#CEDEFA");
  });

  test("check that sections have a light blue background color", () => {
  	const {getByText} = render(<BasicCourseTable classes = {courseFixtures.classesLectureAndSections} />);
  	expect( getBackgroundColor(getByText, "0101") ).toBe("#EDF3FE");
  });

  test("check that lectures are aligned to the left", () => {
  	const {getByText} = render(<BasicCourseTable classes = {courseFixtures.classesLectureAndSections} />);
  	expect( getByText("0100").style.textAlign).toBe("left");
  });

  test("check that sections are aligned to the right", () => {
  	const {getByText} = render(<BasicCourseTable classes = {courseFixtures.classesLectureAndSections} />);
  	expect( getByText("0101").style.textAlign).toBe("right");
  });


});



