import React from "react";
import { render } from "@testing-library/react";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";

describe("BasicCourseTable tests", () => {
  test("renders without crashing", () => {
    render(<BasicCourseTable classes={[]} />);
  });


  function getBackgroundColor (getByText, text) {
  	return getByText(text).closest("tr")[Object.keys(getByText(text).closest("tr"))[1]].style.backgroundColor
  }

  // Testing Lectures
  test("check that lecture sections course number appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={classesLectureOnly} />);
  	expect(queryByText("CMPSC 8")).not.toBe(null);
  });

  test("check that lecture sections title appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={classesLectureOnly} />);
  	expect(queryByText("INTRO TO COMP SCI")).not.toBe(null);
  });

  test("check that lecture sections section number appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={classesLectureOnly} />);
  	expect(queryByText("0100")).not.toBe(null);
  });

  test("check that lecture sections instructor appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={classesLectureOnly} />);
  	expect(queryByText("KHARITONOVA Y")).not.toBe(null);
  });

  test("check that lecture sections enroll code appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={classesLectureOnly} />);
  	expect(queryByText("07492")).not.toBe(null);
  });

  test("check that lecture sections unit appears", () => {
  	const {queryAllByText} = render(<BasicCourseTable classes={classesLectureOnly} />);
  	expect(queryAllByText("4").length).toBe(1);
  });

  // Testing Sections
  test("check that sections course number does not appear", () => {
  	const {queryByText} = render(<BasicCourseTable classes={classesSectionOnly} />);
  	expect(queryByText("CMPSC 8")).toBe(null);
  });

  test("check that sections title does not appear", () => {
  	const {queryByText} = render(<BasicCourseTable classes={classesSectionOnly} />);
  	expect(queryByText("INTRO TO COMP SCI")).toBe(null);
  });

  test("check that sections section number appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={classesSectionOnly} />);
  	expect(queryByText("0101")).not.toBe(null);
  });

  test("check that sections instructor appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={classesSectionOnly} />);
  	expect(queryByText("CONRAD P")).not.toBe(null);
  });

  test("check that sections enroll code appears", () => {
  	const {queryByText} = render(<BasicCourseTable classes={classesSectionOnly} />);
  	expect(queryByText("07500")).not.toBe(null);
  });

  test("check that sections unit appears", () => {
  	const {queryAllByText} = render(<BasicCourseTable classes={classesSectionOnly} />);
  	expect(queryAllByText("4").length).toBe(1);
  });

  test("check that instructors appear as TBD when there are none", () => {
  	const {queryByText} = render(<BasicCourseTable classes={classesSectionOnlyTBD} />);
  	expect(queryByText("TBD")).not.toBe(null);
  });  

  // Testing styling
  test("check that lectures have a blue background color", () => {
  	const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
  	expect( getBackgroundColor(getByText, "0100") ).toBe("#CEDEFA");
  });

  test("check that sections have a light blue background color", () => {
  	const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
  	expect( getBackgroundColor(getByText, "0101") ).toBe("#EDF3FE");
  });

  test("check that lectures are aligned to the left", () => {
  	const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
  	expect( getByText("0100").style.textAlign).toBe("left");
  });

  test("check that sections are aligned to the right", () => {
  	const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
  	expect( getByText("0101").style.textAlign).toBe("right");
  });

  test("check that lectures days appear", () => {
  	const {queryAllByText} = render(<BasicCourseTable classes = {classesLectureOnly} />);
  	expect( queryAllByText("T R").length).toBe(1);
  });

const classesLectureAndSections = 
    [
      {
      "quarter": "20211",
      "courseId": "CMPSC     8  ",
      "title": "INTRO TO COMP SCI",
      "unitsFixed": 4,
      "classSections": [
        {
          "enrollCode": "07492",
          "section": "0100",
          "classClosed": null,
          "courseCancelled": null,
          "enrolledTotal": 25,
          "maxEnroll": 25,
          "timeLocations": [
            {
              "room": "LINE",
              "building": "ON",
              "roomCapacity": 999,
              "days": " T R   ",
              "beginTime": "09:30",
              "endTime": "10:45"
            }
          ],
          "instructors": [
            {
              "instructor": "KHARITONOVA Y",
              "functionCode": "Teaching and in charge"
            }
          ]
        },
        {
          "enrollCode": "07500",
          "section": "0101",
          "classClosed": null,
          "courseCancelled": null,
          "enrolledTotal": 25,
          "maxEnroll": 25,
          "timeLocations": [
            {
              "room": "LINE",
              "building": "ON",
              "roomCapacity": 999,
              "days": "  W    ",
              "beginTime": "09:00",
              "endTime": "09:50"
            }
          ],
          "instructors": []
        }
      ]
    }
  ];

  const classesLectureOnly = 
    [
      {
      "quarter": "20211",
      "courseId": "CMPSC     8  ",
      "title": "INTRO TO COMP SCI",
      "unitsFixed": 4,
      "classSections": [
        {
          "enrollCode": "07492",
          "section": "0100",
          "classClosed": null,
          "courseCancelled": null,
          "enrolledTotal": 25,
          "maxEnroll": 25,
          "timeLocations": [
            {
              "room": "LINE",
              "building": "ON",
              "roomCapacity": 999,
              "days": " T R   ",
              "beginTime": "09:30",
              "endTime": "10:45"
            }
          ],
          "instructors": [
            {
              "instructor": "KHARITONOVA Y",
              "functionCode": "Teaching and in charge"
            }
          ]
        }
      ]
    }
  ];

    const classesSectionOnly = 
    [
      {
      "quarter": "20211",
      "courseId": "CMPSC     8  ",
      "title": "INTRO TO COMP SCI",
      "unitsFixed": 4,
      "classSections": [
        {
          "enrollCode": "07500",
          "section": "0101",
          "classClosed": null,
          "courseCancelled": null,
          "enrolledTotal": 25,
          "maxEnroll": 25,
          "timeLocations": [
            {
              "room": "LINE",
              "building": "ON",
              "roomCapacity": 999,
              "days": "  W    ",
              "beginTime": "09:00",
              "endTime": "09:50"
            }
          ],
          "instructors": [
            {
              "instructor": "CONRAD P",
              "functionCode": "Teaching but not in charge"
            }
          ]
        }
      ]
    }
  ];

  const classesSectionOnlyTBD =
  [
     {
      "quarter": "20211",
      "courseId": "CMPSC     8  ",
      "title": "INTRO TO COMP SCI",
      "unitsFixed": 4,
      "classSections": [
        {
          "enrollCode": "07500",
          "section": "0101",
          "classClosed": null,
          "courseCancelled": null,
          "enrolledTotal": 25,
          "maxEnroll": 25,
          "timeLocations": [
            {
              "room": "LINE",
              "building": "ON",
              "roomCapacity": 999,
              "days": "  W    ",
              "beginTime": "09:00",
              "endTime": "09:50"
            }
          ],
          "instructors": []
        }
      ]
    }
  ];

});



