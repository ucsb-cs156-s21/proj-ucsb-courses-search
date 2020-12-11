import React from "react";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";
import { waitFor, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useHistory } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");

describe("BasicCourseTable tests", () => {
  test("renders without crashing when logged in", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,}); 
    render(<BasicCourseTable classes={[]} />);
  });
  test("renders an add course button for every course section in the table when logged in", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});    
    const { getAllByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
    const addCourseButtons = getAllByText("Add Course")
    expect(addCourseButtons.length).toBe(5);
  });
  test("renders an add course button for a lecture section without sections when logged in", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const { getAllByText} = render(<BasicCourseTable classes = {classesOneLectureOnly} />);
    const addCourseButtons = getAllByText("Add Course")
    expect(addCourseButtons.length).toBe(1);
  });
  test("renders an add course button for every lecture section without sections under the same course when logged in", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const { getAllByText} = render(<BasicCourseTable classes = {classesManyLecturesNoSections} />);
    const addCourseButtons = getAllByText("Add Course")
    expect(addCourseButtons.length).toBe(3);
  });
  test("does not render without crashing when not logged in", () => {
    useAuth0.mockReturnValue({isAuthenticated: false,}); 
    render(<BasicCourseTable classes={[]} />);
  });
  test("does not render an add course button for every course section in the table when not logged in", () => {
    useAuth0.mockReturnValue({isAuthenticated: false,});    
    const { queryAllByText} = render(<BasicCourseTable classes = {classesLectureAndSections} />);
    const addCourseButtons = queryAllByText("Add Course")
    expect(addCourseButtons.length).toBe(0);
  });
  test("does not render an add course button for a lecture section without sections when not logged in", () => {
    useAuth0.mockReturnValue({isAuthenticated: false,});
    const { queryAllByText} = render(<BasicCourseTable classes = {classesOneLectureOnly} />);
    const addCourseButtons = queryAllByText("Add Course")
    expect(addCourseButtons.length).toBe(0);
  });
  test("does not render an add course button for every lecture section without sections under the same course when not logged in", () => {
    useAuth0.mockReturnValue({isAuthenticated: false,});
    const { queryAllByText} = render(<BasicCourseTable classes = {classesManyLecturesNoSections} />);
    const addCourseButtons = queryAllByText("Add Course")
    expect(addCourseButtons.length).toBe(0);
  });

  test("can click to add a course", async () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(<BasicCourseTable classes = {classesOneLectureOnly} />);
    const addCourseButton = getByText("Add Course");
    userEvent.click(addCourseButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });


    function getBackgroundColor (getByText, text) {
    return getByText(text).closest("tr")[Object.keys(getByText(text).closest("tr"))[1]].style.backgroundColor
  }

  // Testing Lectures
  test("check that lecture sections course number appears", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes={classesLectureOnly} />);
    expect(queryByText("CMPSC 8")).not.toBe(null);
  });

  test("check that lecture sections title appears", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes={classesLectureOnly} />);
    expect(queryByText("INTRO TO COMP SCI")).not.toBe(null);
  });

  test("check that lecture sections section number appears", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes={classesLectureOnly} />);
    expect(queryByText("0100")).not.toBe(null);
  });

  test("check that lecture sections instructor appears", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes={classesLectureOnly} />);
    expect(queryByText("KHARITONOVA Y")).not.toBe(null);
  });

  test("check that lecture sections enroll code appears", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes={classesLectureOnly} />);
    expect(queryByText("07492")).not.toBe(null);
  });

  test("check that lecture sections unit appears", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes={classesLectureOnly} />);
    expect(queryByText("4")).not.toBe(null);
  });

  test("check that lectures days appear", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes = {classesLectureOnly} />);
    expect( queryByText("T R")).not.toBe(null);
  });

  test("check that lectures times appear", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes = {classesLectureOnly} />);
    expect( queryByText("09:30 - 10:45")).not.toBe(null);
  });

  test("check that lectures times and days appear as TBD when they don't exist", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryAllByText} = render(<BasicCourseTable classes = {classesLectureOnlyTimeDaysTBD} />);
    expect( queryAllByText("TBD").length).toBe(2);
  });

  // Testing Sections
  test("check that sections course number does not appear", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes={classesSectionOnly} />);
    expect(queryByText("CMPSC 8")).toBe(null);
  });

  test("check that sections title does not appear", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes={classesSectionOnly} />);
    expect(queryByText("INTRO TO COMP SCI")).toBe(null);
  });

  test("check that sections section number appears", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes={classesSectionOnly} />);
    expect(queryByText("0101")).not.toBe(null);
  });

  test("check that sections instructor appears", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes={classesSectionOnly} />);
    expect(queryByText("CONRAD P")).not.toBe(null);
  });

  test("check that sections enroll code appears", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes={classesSectionOnly} />);
    expect(queryByText("07500")).not.toBe(null);
  });

  test("check that sections unit appears", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes={classesSectionOnly} />);
    expect(queryByText("4")).not.toBe(null);
  });

  test("check that instructors appear as TBD when there are none", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes={classesSectionOnlyTBD} />);
    expect(queryByText("TBD")).not.toBe(null);
  });

  test("check that sections days appear", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes = {classesSectionOnly} />);
    expect( queryByText("W")).not.toBe(null);
  });

  test("check that sections times appear", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryByText} = render(<BasicCourseTable classes = {classesSectionOnly} />);
    expect( queryByText("09:00 - 09:50")).not.toBe(null);
  });

  test("check that sections times and days appear as TBD when they don't exist", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {queryAllByText} = render(<BasicCourseTable classes = {classesSectionOnlyTimeDaysTBD} />);
    expect( queryAllByText("TBD").length).toBe(2);
  });

  // Testing styling
  test("check that lectures have a blue background color", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections1} />);
    expect( getBackgroundColor(getByText, "0100") ).toBe("#CEDEFA");
  });

  test("check that sections have a light blue background color", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections1} />);
    expect( getBackgroundColor(getByText, "0101") ).toBe("#EDF3FE");
  });

  test("check that lectures are aligned to the left", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections1} />);
    expect( getByText("0100").style.textAlign).toBe("left");
  });

  test("check that sections are aligned to the right", () => {
    useAuth0.mockReturnValue({isAuthenticated: true,});
    const {getByText} = render(<BasicCourseTable classes = {classesLectureAndSections1} />);
    expect( getByText("0101").style.textAlign).toBe("right");
  });

const classesLectureAndSections1 = 
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


    const classesLectureAndSections = [{
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
          "enrolledTotal": 99,
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
          "classClosed": null,
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
          "courseCancelled": null,
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

    const classesOneLectureOnly = [{
      "quarter": "20211",
      "courseId": "CMPSC   192  ",
      "title": "PROJECTS COMP SCI",
      "contactHours": 10,
      "description": "Projects in computer science for advanced undergraduate   students.",
      "college": "ENGR",
      "objLevelCode": "U",
      "subjectArea": "CMPSC   ",
      "unitsFixed": null,
      "unitsVariableHigh": 5,
      "unitsVariableLow": 1,
      "delayedSectioning": "I",
      "inProgressCourse": null,
      "gradingOption": "L",
      "instructionType": "TUT",
      "onLineCourse": false,
      "deptCode": "CMPSC",
      "generalEducation": [],
      "classSections": [
        {
          "enrollCode": "08334",
          "section": "0100",
          "session": null,
          "classClosed": null,
          "courseCancelled": null,
          "gradingOptionCode": null,
          "enrolledTotal": null,
          "maxEnroll": 20,
          "secondaryStatus": null,
          "departmentApprovalRequired": false,
          "instructorApprovalRequired": false,
          "restrictionLevel": null,
          "restrictionMajor": null,
          "restrictionMajorPass": null,
          "restrictionMinor": null,
          "restrictionMinorPass": null,
          "concurrentCourses": [],
          "timeLocations": [],
          "instructors": [],
          "course": {
            "courseId": "CMPSC   192  ",
            "title": "PROJECTS COMP SCI",
            "unitsFixed": null,
            "noSections": "true"
          }
        }
      ]
    }];

    const classesManyLecturesNoSections = [{
      "quarter": "20211",
      "courseId": "CMPSC   193  ",
      "title": "INTERN IN INDUSTRY",
      "contactHours": null,
      "description": "Special projects for selected students. Offered in conjunction with selected industrial and research firms and under direct faculty supervision. Written proposal and final report required.",
      "college": "ENGR",
      "objLevelCode": "U",
      "subjectArea": "CMPSC   ",
      "unitsFixed": null,
      "unitsVariableHigh": 4,
      "unitsVariableLow": 1,
      "delayedSectioning": "I",
      "inProgressCourse": null,
      "gradingOption": "P",
      "instructionType": "FLD",
      "onLineCourse": false,
      "deptCode": "CMPSC",
      "generalEducation": [],
      "classSections": [
        {
          "enrollCode": "08342",
          "section": "0100",
          "session": null,
          "classClosed": null,
          "courseCancelled": null,
          "gradingOptionCode": null,
          "enrolledTotal": null,
          "maxEnroll": 15,
          "secondaryStatus": null,
          "departmentApprovalRequired": false,
          "instructorApprovalRequired": false,
          "restrictionLevel": "U",
          "restrictionMajor": null,
          "restrictionMajorPass": null,
          "restrictionMinor": null,
          "restrictionMinorPass": null,
          "concurrentCourses": [],
          "timeLocations": [],
          "instructors": [],
          "course": {
            "courseId": "CMPSC   193  ",
            "title": "INTERN IN INDUSTRY",
            "unitsFixed": null,
            "noSections": "true"
          }
        },
        {
          "enrollCode": "74260",
          "section": "0200",
          "session": null,
          "classClosed": null,
          "courseCancelled": null,
          "gradingOptionCode": null,
          "enrolledTotal": 1,
          "maxEnroll": 15,
          "secondaryStatus": null,
          "departmentApprovalRequired": false,
          "instructorApprovalRequired": false,
          "restrictionLevel": "U",
          "restrictionMajor": null,
          "restrictionMajorPass": null,
          "restrictionMinor": null,
          "restrictionMinorPass": null,
          "concurrentCourses": [],
          "timeLocations": [],
          "instructors": [
            {
              "instructor": "KRINTZ C",
              "functionCode": "Teaching and in charge"
            }
          ],
          "course": {
            "courseId": "CMPSC   193  ",
            "title": "INTERN IN INDUSTRY",
            "unitsFixed": null,
            "noSections": "true"
          }
        },
        {
          "enrollCode": "77172",
          "section": "0300",
          "session": null,
          "classClosed": null,
          "courseCancelled": null,
          "gradingOptionCode": null,
          "enrolledTotal": 1,
          "maxEnroll": 15,
          "secondaryStatus": null,
          "departmentApprovalRequired": false,
          "instructorApprovalRequired": false,
          "restrictionLevel": "U",
          "restrictionMajor": null,
          "restrictionMajorPass": null,
          "restrictionMinor": null,
          "restrictionMinorPass": null,
          "concurrentCourses": [],
          "timeLocations": [],
          "instructors": [
            {
              "instructor": "YAN L",
              "functionCode": "Teaching and in charge"
            }
          ],
          "course": {
            "courseId": "CMPSC   193  ",
            "title": "INTERN IN INDUSTRY",
            "unitsFixed": null,
            "noSections": "true"
          }
        }
      ]
    }];
});



