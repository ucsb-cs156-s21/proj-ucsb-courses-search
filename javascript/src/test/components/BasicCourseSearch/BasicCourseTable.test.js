import React from "react";
import { render, cleanup } from "@testing-library/react";
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

  function getBackgroundColor (text) {
  	const {getByText} = render(<BasicCourseTable classes = {classes} />);
  	return getByText(text).closest("tr")[Object.keys(getByText(text).closest("tr"))[1]].style.backgroundColor
  }
  
  test("lecture course row is displayed as blue", () => {
  	expect(getBackgroundColor("0100")).toBe("#CEDEFA");
  });

  test("lecture sections with space displayed as light blue", () => {
  	expect(getBackgroundColor("0101")).toBe("#EDF3FE");
  });

  test("lecture sections that are full displayed as light orange", () => {
  	expect(getBackgroundColor("0102")).toBe("#D5BF80");
  });

  test("lecture sections that are cancelled only are red", () => {
  	expect(getBackgroundColor("0103")).toBe("#C97373");
  });

  test("lecture sections that are closed only are red", () => {
  	expect(getBackgroundColor("0104")).toBe("#C97373");
  });

  test("lecture sections that are cancelled and closed are red", () => {
  	expect(getBackgroundColor("0105")).toBe("#C97373");
  });

  const classes = [{
    "quarter": "20211",
    "courseId": "CMPSC     8  ",
    "title": "INTRO TO COMP SCI",
    "contactHours": 30,
    "description": "Introduction to computer program development for students with little to no programming experience. Basic programming concepts, variables and express ions, data and control structures, algorithms, debugging, program design, a nd documentation.",
    "college": "ENGR",
    "objLevelCode": "U",
    "subjectArea": "CMPSC   ",
    "unitsFixed": 4,
    "unitsVariableHigh": null,
    "unitsVariableLow": null,
    "delayedSectioning": null,
    "inProgressCourse": null,
    "gradingOption": "L",
    "instructionType": "LEC",
    "onLineCourse": false,
    "deptCode": "CMPSC",
    "generalEducation": [
      {
        "geCode": "C  ",
        "geCollege": "L&S "
      },
      {
        "geCode": "QNT",
        "geCollege": "L&S "
      },
      {
        "geCode": "QNT",
        "geCollege": "CRST"
      }
    ],
    "classSections": [
      {
        "enrollCode": "07492",
        "section": "0100",
        "session": null,
        "classClosed": null,
        "courseCancelled": null,
        "gradingOptionCode": null,
        "enrolledTotal": 69,
        "maxEnroll": 125,
        "secondaryStatus": "R",
        "departmentApprovalRequired": false,
        "instructorApprovalRequired": false,
        "restrictionLevel": null,
        "restrictionMajor": "+CMPEN+PRFMS+PRMTH+PRMSC+STATS+STSDS+ACTSC+MATCS+STSCI+PRAMA",
        "restrictionMajorPass": "12",
        "restrictionMinor": null,
        "restrictionMinorPass": null,
        "concurrentCourses": [],
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
        ],
        "course": {
          "courseId": "CMPSC     8  ",
          "title": "INTRO TO COMP SCI",
          "unitsFixed": 4
        }
      },
      {
        "enrollCode": "07500",
        "section": "0101",
        "session": null,
        "classClosed": null,
        "courseCancelled": null,
        "gradingOptionCode": null,
        "enrolledTotal": 20,
        "maxEnroll": 25,
        "secondaryStatus": null,
        "departmentApprovalRequired": false,
        "instructorApprovalRequired": false,
        "restrictionLevel": null,
        "restrictionMajor": "+CMPEN+PRFMS+PRMTH+PRMSC+STATS+STSDS+ACTSC+MATCS+STSCI+PRAMA",
        "restrictionMajorPass": "12",
        "restrictionMinor": null,
        "restrictionMinorPass": null,
        "concurrentCourses": [],
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
        "instructors": [],
        "course": {
          "courseId": "CMPSC     8  ",
          "title": "INTRO TO COMP SCI",
          "unitsFixed": 4
        }
      },
      {
        "enrollCode": "07518",
        "section": "0102",
        "session": null,
        "classClosed": null,
        "courseCancelled": null,
        "gradingOptionCode": null,
        "enrolledTotal": 25,
        "maxEnroll": 25,
        "secondaryStatus": null,
        "departmentApprovalRequired": false,
        "instructorApprovalRequired": false,
        "restrictionLevel": null,
        "restrictionMajor": "+CMPEN+PRFMS+PRMTH+PRMSC+STATS+STSDS+ACTSC+MATCS+STSCI+PRAMA",
        "restrictionMajorPass": "12",
        "restrictionMinor": null,
        "restrictionMinorPass": null,
        "concurrentCourses": [],
        "timeLocations": [
          {
            "room": "LINE",
            "building": "ON",
            "roomCapacity": 999,
            "days": "  W    ",
            "beginTime": "10:00",
            "endTime": "10:50"
          }
        ],
        "instructors": [],
        "course": {
          "courseId": "CMPSC     8  ",
          "title": "INTRO TO COMP SCI",
          "unitsFixed": 4
        }
      },
      {
        "enrollCode": "07526",
        "section": "0103",
        "session": null,
        "classClosed": null,
        "courseCancelled": "C         ",
        "gradingOptionCode": null,
        "enrolledTotal": null,
        "maxEnroll": 25,
        "secondaryStatus": null,
        "departmentApprovalRequired": false,
        "instructorApprovalRequired": false,
        "restrictionLevel": null,
        "restrictionMajor": "+CMPEN+PRFMS+PRMTH+PRMSC+STATS+STSDS+ACTSC+MATCS+STSCI+PRAMA",
        "restrictionMajorPass": "12",
        "restrictionMinor": null,
        "restrictionMinorPass": null,
        "concurrentCourses": [],
        "timeLocations": [
          {
            "room": "LINE",
            "building": "ON",
            "roomCapacity": 999,
            "days": "  W    ",
            "beginTime": "11:00",
            "endTime": "11:50"
          }
        ],
        "instructors": [],
        "course": {
          "courseId": "CMPSC     8  ",
          "title": "INTRO TO COMP SCI",
          "unitsFixed": 4
        }
      },
      {
        "enrollCode": "07534",
        "section": "0104",
        "session": null,
        "classClosed": "Y",
        "courseCancelled": null,
        "gradingOptionCode": null,
        "enrolledTotal": 24,
        "maxEnroll": 25,
        "secondaryStatus": null,
        "departmentApprovalRequired": false,
        "instructorApprovalRequired": false,
        "restrictionLevel": null,
        "restrictionMajor": "+CMPEN+PRFMS+PRMTH+PRMSC+STATS+STSDS+ACTSC+MATCS+STSCI+PRAMA",
        "restrictionMajorPass": "12",
        "restrictionMinor": null,
        "restrictionMinorPass": null,
        "concurrentCourses": [],
        "timeLocations": [
          {
            "room": "LINE",
            "building": "ON",
            "roomCapacity": 999,
            "days": "  W    ",
            "beginTime": "12:00",
            "endTime": "12:50"
          }
        ],
        "instructors": [],
        "course": {
          "courseId": "CMPSC     8  ",
          "title": "INTRO TO COMP SCI",
          "unitsFixed": 4
        }
      },
      {
        "enrollCode": "63404",
        "section": "0105",
        "session": null,
        "classClosed": "Y",
        "courseCancelled": "C         ",
        "gradingOptionCode": null,
        "enrolledTotal": null,
        "maxEnroll": 25,
        "secondaryStatus": null,
        "departmentApprovalRequired": false,
        "instructorApprovalRequired": false,
        "restrictionLevel": null,
        "restrictionMajor": "+CMPEN+PRFMS+PRMTH+PRMSC+STATS+STSDS+ACTSC+MATCS+STSCI+PRAMA",
        "restrictionMajorPass": "12",
        "restrictionMinor": null,
        "restrictionMinorPass": null,
        "concurrentCourses": [],
        "timeLocations": [
          {
            "room": "LINE",
            "building": "ON",
            "roomCapacity": 999,
            "days": "  W    ",
            "beginTime": "13:00",
            "endTime": "13:50"
          }
        ],
        "instructors": [],
        "course": {
          "courseId": "CMPSC     8  ",
          "title": "INTRO TO COMP SCI",
          "unitsFixed": 4
        }
      }]}];

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

});