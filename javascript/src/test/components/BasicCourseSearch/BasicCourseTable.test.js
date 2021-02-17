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
  	const {queryByText} = render(<BasicCourseTable classes={classesLectureOnly} />);
  	expect(queryByText("4")).not.toBe(null);
  });

  test("check that lectures days appear", () => {
    const {queryByText} = render(<BasicCourseTable classes = {classesLectureOnly} />);
    expect( queryByText("T R")).not.toBe(null);
  });

  test("check that lectures times appear", () => {
    const {queryByText} = render(<BasicCourseTable classes = {classesLectureOnly} />);
    expect( queryByText("09:30 - 10:45")).not.toBe(null);
  });

  test("check that lectures times and days appear as TBD when they don't exist", () => {
    const {queryAllByText} = render(<BasicCourseTable classes = {classesLectureOnlyTimeDaysTBD} />);
    expect( queryAllByText("TBD").length).toBe(2);
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
  	const {queryByText} = render(<BasicCourseTable classes={classesSectionOnly} />);
  	expect(queryByText("4")).not.toBe(null);
  });

  test("check that instructors appear as TBD when there are none", () => {
  	const {queryByText} = render(<BasicCourseTable classes={classesSectionOnlyTBD} />);
  	expect(queryByText("TBD")).not.toBe(null);
  });

  test("check that sections days appear", () => {
    const {queryByText} = render(<BasicCourseTable classes = {classesSectionOnly} />);
    expect( queryByText("W")).not.toBe(null);
  });

  test("check that sections times appear", () => {
    const {queryByText} = render(<BasicCourseTable classes = {classesSectionOnly} />);
    expect( queryByText("09:00 - 09:50")).not.toBe(null);
  });

  test("check that sections times and days appear as TBD when they don't exist", () => {
    const {queryAllByText} = render(<BasicCourseTable classes = {classesSectionOnlyTimeDaysTBD} />);
    expect( queryAllByText("TBD").length).toBe(2);
  });

  // Testing styling
  test("check that lectures are aligned to the left", () => {
  	const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
  	expect( getByText("0100").style.textAlign).toBe("left");
  });

  test("check that sections are aligned to the right", () => {
  	const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
  	expect( getByText("0101").style.textAlign).toBe("right");
  });

  test("lecture course row is displayed as blue", () => {
  	const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
  	expect(getBackgroundColor(getByText,"0100")).toBe("#CEDEFA");
  });

  test("lecture sections with space displayed as light blue", () => {
  	const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
  	expect(getBackgroundColor(getByText,"0101")).toBe("#EDF3FE");
  });

  test("sections that are full displayed as light orange", () => {
  	const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
  	expect(getBackgroundColor(getByText,"0102")).toBe("#F0DC9E");
  });

  test("lecture sections that are cancelled only are red", () => {
    const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
  	expect(getBackgroundColor(getByText,"0103")).toBe("#E0AAAA");
  });

  test("lecture sections that are closed only are red", () => {
    const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
  	expect(getBackgroundColor(getByText,"0104")).toBe("#E0AAAA");
  });

  test("lecture sections that are cancelled and closed are red", () => {
    const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
  	expect(getBackgroundColor(getByText,"0105")).toBe("#E0AAAA");
  });

  test("enrolledTotal shows up correctly when the course is not closed or cancelled", () => {
    const {queryAllByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
    expect(queryAllByText('24').length).toBe(2);
  });

  test("maxEnroll shows up correctly when the course is not closed or cancelled", () => {
    const {queryAllByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
    expect(queryAllByText('25').length).toBe(2);
  });

  test("enrolledTotal shows closed when the course is closed", () => {
    const {queryAllByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
    expect(queryAllByText('Closed').length).toBe(1);
  });

  test("enrolledTotal shows 0 when there are no students enrolled", () => {
    const {queryAllByText} = render(<BasicCourseTable classes = {classesSectionOnlyTimeDaysTBD} />);
    expect(queryAllByText('0').length).toBe(1);
  });

  test("enrolledTotal shows up correctly when the course is cancelled", () => {
    const {queryAllByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
    expect(queryAllByText('Cancelled').length).toBe(2);
  });

  test("maxEnroll shows up correctly when the course is cancelled", () => {
    const {queryAllByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
    expect(queryAllByText('0').length).toBe(2);
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
          "enrolledTotal": 24,
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
          "enrolledTotal": 24,
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
        },
        {
          "enrollCode": "07518",
          "section": "0102",
          "classClosed": null,
          "courseCancelled": null,
          "enrolledTotal": 30,
          "maxEnroll": 30,
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
        },
        {
          "enrollCode": "07526",
          "section": "0103",
          "classClosed": null,
          "courseCancelled": "C         ",
          "enrolledTotal": null,
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
        },
        {
          "enrollCode": "07534",
          "section": "0104",
          "classClosed": "Y",
          "courseCancelled": null,
          "enrolledTotal": 24,
          "maxEnroll": 30,
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
        },
        {
          "enrollCode": "63404",
          "section": "0105",
          "classClosed": "Y",
          "courseCancelled": "C         ",
          "enrolledTotal": null,
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
  const classesLectureOnlyTimeDaysTBD = 
    [
      {
      "quarter": "20211",
      "courseId": "CMPSC     8  ",
      "title": "INTRO TO COMP SCI",
      "unitsFixed": 4,
      "classSections": [
        {
          "enrollCode": "07500",
          "section": "0100",
          "classClosed": null,
          "courseCancelled": null,
          "enrolledTotal": 25,
          "maxEnroll": 25,
          "timeLocations": [],
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

  const classesSectionOnlyTimeDaysTBD = 
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
          "enrolledTotal": null,
          "maxEnroll": 25,
          "timeLocations": [],
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

});



