import { reformatJSON } from 'main/utils/BasicCourseTableHelpers';

describe("BasicCourseTableHelpers tests", () => {
  test("reformatJSON properly reformats the json", () => {
    const classes = 
    [
      {
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
          "enrolledTotal": 100,
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
        }
      ]
    }
  ];
  });
});