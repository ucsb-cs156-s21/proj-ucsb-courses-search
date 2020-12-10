import React from "react";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";
import { waitFor, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useHistory } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

describe("BasicCourseTable tests", () => {
  test("renders without crashing", () => {
    render(<BasicCourseTable classes={[]} />);
  });
  test ("renders an add buttons if the user is login in",()=>{
    const classes = [{
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
    const user={
      email: "jianlyu@ucsb.edu",
      email_verified: true,
      family_name: "Mao",
      given_name: "Gordon",
      locale: "en",
      name: "Gordon Mao",
      nickname: "jianlyu",
      picture: "https://lh4.googleusercontent.com/-bhI7X9hDfZQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnCKE2itkFidS6-kKlG7g5GvjChyA/s96-c/photo.jpg",
      updated_at: "2020-12-10T08:13:08.675Z"
    };
    const { container} = render(<BasicCourseTable classes = {classes}/>);
    container.user=user;
    expect(container.user.email_verified).toBe(true);
  });

  test("do not render an add button if user is not log in",()=>{
    const classes = [{
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
    const user=false;
    const { container} = render(<BasicCourseTable classes = {classes}/>);
    container.user=user;
    expect(container.user).toBe(false);
  });

  test("renders an add course button for every course section in the table", () => {
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
    const { getAllByText} = render(<BasicCourseTable classes = {classes} />);
    const addCourseButtons = getAllByText("Add Course")
    expect(addCourseButtons.length).toBe(5);
  });
  test("renders an add course button for a lecture section without sections", () => {
    const classes = [{
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
    const { getAllByText} = render(<BasicCourseTable classes = {classes} />);
    const addCourseButtons = getAllByText("Add Course")
    expect(addCourseButtons.length).toBe(1);
  });
  test("renders an add course button for every lecture section without sections under the same course", () => {
    const classes = [{
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
    const { getAllByText} = render(<BasicCourseTable classes = {classes} />);
    const addCourseButtons = getAllByText("Add Course")
    expect(addCourseButtons.length).toBe(3);
  });

  test("can click to add a course", async () => {
    const classes = [{
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
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(<BasicCourseTable classes = {classes} />);
    const addCourseButton = getByText("Add Course");
    userEvent.click(addCourseButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });

});
