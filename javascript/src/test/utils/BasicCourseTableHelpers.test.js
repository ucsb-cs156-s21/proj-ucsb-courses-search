import { reformatJSON } from 'main/utils/BasicCourseTableHelpers';
import * as courseFixtures from "main/fixtures/Courses/courseFixtures"

describe("BasicCourseTableHelpers tests", () => {
  const checks = [false,false,false];
  const classesInput = 
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
          "enrolledTotal": 100,
          "maxEnroll": 125,
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
        },
        {
          "enrollCode": "07518",
          "section": "0102",
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
              "beginTime": "10:00",
              "endTime": "10:50"
            }
          ],
          "instructors": []
        },
        {
          "enrollCode": "07526",
          "section": "0103",
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
              "beginTime": "11:00",
              "endTime": "11:50"
            }
          ],
          "instructors": []
        },
        {
          "enrollCode": "07534",
          "section": "0104",
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
              "beginTime": "12:00",
              "endTime": "12:50"
            }
          ],
          "instructors": []
        },
        {
          "enrollCode": "63404",
          "section": "0105",
          "classClosed": "Y",
          "courseCancelled": null,
          "enrolledTotal": null,
          "maxEnroll": 25,
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
          "instructors": []
        }
      ]
    }
  ];
  test("reformatJSON properly reformats the json", () => {
    const testOutput = reformatJSON(classesInput,checks);
    expect(testOutput).toStrictEqual(sectionsOutput);
  });

  
  const classesInputLectureClosed = 
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
          "classClosed": "Y",
          "courseCancelled": null,
          "enrolledTotal": 100,
          "maxEnroll": 125,
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
        },
        {
          "enrollCode": "07518",
          "section": "0102",
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
              "beginTime": "10:00",
              "endTime": "10:50"
            }
          ],
          "instructors": []
        },
        {
          "enrollCode": "07526",
          "section": "0103",
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
              "beginTime": "11:00",
              "endTime": "11:50"
            }
          ],
          "instructors": []
        },
        {
          "enrollCode": "07534",
          "section": "0104",
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
              "beginTime": "12:00",
              "endTime": "12:50"
            }
          ],
          "instructors": []
        },
        {
          "enrollCode": "63404",
          "section": "0105",
          "classClosed": "Y",
          "courseCancelled": null,
          "enrolledTotal": null,
          "maxEnroll": 25,
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
          "instructors": []
        }
      ]
    }
  ];
  const checks2 = [false,true,false];
  test("reformatJSON properly reformats the json while closed set to true", () => {
    const testOutput = reformatJSON(classesInputLectureClosed,checks2);
    expect(testOutput).toStrictEqual([]);
  });

  const classesInputLectureCancelled = 
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
          "courseCancelled": "C         ",
          "enrolledTotal": 100,
          "maxEnroll": 125,
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
        },
        {
          "enrollCode": "07518",
          "section": "0102",
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
              "beginTime": "10:00",
              "endTime": "10:50"
            }
          ],
          "instructors": []
        },
        {
          "enrollCode": "07526",
          "section": "0103",
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
              "beginTime": "11:00",
              "endTime": "11:50"
            }
          ],
          "instructors": []
        },
        {
          "enrollCode": "07534",
          "section": "0104",
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
              "beginTime": "12:00",
              "endTime": "12:50"
            }
          ],
          "instructors": []
        },
        {
          "enrollCode": "63404",
          "section": "0105",
          "classClosed": "Y",
          "courseCancelled": null,
          "enrolledTotal": null,
          "maxEnroll": 25,
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
          "instructors": []
        }
      ]
    }
  ];
  const checks3 = [true,false,false];
  test("reformatJSON properly reformats the json while cancelled set to true", () => {
    const testOutput = reformatJSON(classesInputLectureCancelled,checks3);
    expect(testOutput).toStrictEqual([]);
  });

  const classesInputLectureFull = 
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
          "enrolledTotal": 126,
          "maxEnroll": 125,
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
        },
        {
          "enrollCode": "07518",
          "section": "0102",
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
              "beginTime": "10:00",
              "endTime": "10:50"
            }
          ],
          "instructors": []
        },
        {
          "enrollCode": "07526",
          "section": "0103",
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
              "beginTime": "11:00",
              "endTime": "11:50"
            }
          ],
          "instructors": []
        },
        {
          "enrollCode": "07534",
          "section": "0104",
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
              "beginTime": "12:00",
              "endTime": "12:50"
            }
          ],
          "instructors": []
        },
        {
          "enrollCode": "63404",
          "section": "0105",
          "classClosed": "Y",
          "courseCancelled": null,
          "enrolledTotal": null,
          "maxEnroll": 25,
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
          "instructors": []
        }
      ]
    }
  ];
  const checks4 = [false,false,true];
  test("reformatJSON properly reformats the json while full set to true", () => {
    const testOutput = reformatJSON(classesInputLectureFull,checks4);
    expect(testOutput).toStrictEqual([]);
  });
  

  const classesInputSectionCancelledClosedFull = 
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
          "enrolledTotal": 100,
          "maxEnroll": 125,
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
          "classClosed": "Y",
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
        },
        {
          "enrollCode": "07518",
          "section": "0102",
          "classClosed": null,
          "courseCancelled": "C         ",
          "enrolledTotal": 25,
          "maxEnroll": 25,
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
          "instructors": []
        },
        {
          "enrollCode": "07526",
          "section": "0103",
          "classClosed": null,
          "courseCancelled": null,
          "enrolledTotal": 26,
          "maxEnroll": 25,
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
          "instructors": []
        },
        {
          "enrollCode": "07534",
          "section": "0104",
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
              "beginTime": "12:00",
              "endTime": "12:50"
            }
          ],
          "instructors": []
        },
        {
          "enrollCode": "63404",
          "section": "0105",
          "classClosed": "Y",
          "courseCancelled": null,
          "enrolledTotal": null,
          "maxEnroll": 25,
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
          "instructors": []
        }
      ]
    }
  ];
  const checks5 = [true,true,true];
  test("reformatJSON properly reformats the json while closed/cancelled/full set to true", () => {
    const testOutput = reformatJSON(classesInputSectionCancelledClosedFull,checks5);
    expect(testOutput).toStrictEqual(sectionsOutput2);
  });


  test("reformatJSON properly reformats the section only json while closed/cancelled/full set to true", () => {
    const testOutput = reformatJSON(courseFixtures.classesSectionOnly,checks5);
    expect(testOutput).toStrictEqual(sectionsOutput3);
  });

  const classesInputSectionOnlyCancelledClosedFull = 
    [
      {
      "quarter": "20211",
      "courseId": "CMPSC     8  ",
      "title": "INTRO TO COMP SCI",
      "unitsFixed": 4,
      "classSections": [
        // {
        //   "enrollCode": "07492",
        //   "section": "0100",
        //   "classClosed": null,
        //   "courseCancelled": null,
        //   "enrolledTotal": 100,
        //   "maxEnroll": 125,
        //   "timeLocations": [
        //     {
        //       "room": "LINE",
        //       "building": "ON",
        //       "roomCapacity": 999,
        //       "days": " T R   ",
        //       "beginTime": "09:30",
        //       "endTime": "10:45"
        //     }
        //   ],
        //   "instructors": [
        //     {
        //       "instructor": "KHARITONOVA Y",
        //       "functionCode": "Teaching and in charge"
        //     }
        //   ]
        // },
        {
          "enrollCode": "07500",
          "section": "0101",
          "classClosed": "Y",
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
        },
        {
          "enrollCode": "07518",
          "section": "0102",
          "classClosed": null,
          "courseCancelled": "C         ",
          "enrolledTotal": 25,
          "maxEnroll": 25,
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
          "instructors": []
        },
        {
          "enrollCode": "07526",
          "section": "0103",
          "classClosed": null,
          "courseCancelled": null,
          "enrolledTotal": 26,
          "maxEnroll": 25,
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
          "instructors": []
        },
        {
          "enrollCode": "07534",
          "section": "0104",
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
              "beginTime": "12:00",
              "endTime": "12:50"
            }
          ],
          "instructors": []
        },
        {
          "enrollCode": "63404",
          "section": "0105",
          "classClosed": "Y",
          "courseCancelled": null,
          "enrolledTotal": null,
          "maxEnroll": 25,
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
          "instructors": []
        }
      ]
    }
  ];
  test("reformatJSON properly reformats the section only json while closed/cancelled/full set to true", () => {
    const testOutput = reformatJSON(classesInputSectionOnlyCancelledClosedFull,checks5);
    expect(testOutput).toStrictEqual(sectionsOutput4);
  });

});


const sectionsOutput = [                                         
  {                                       
    "enrollCode": '07492',                  
    "section": '0100',                      
    "classClosed": null,                    
    "courseCancelled": null,                           
    "enrolledTotal": 100,                   
    "maxEnroll": 125,                       
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
      "courseId": 'CMPSC     8  ',          
      "title": 'INTRO TO COMP SCI',         
      "unitsFixed": 4                       
    }                                     
  },                                      
  {                                       
    "enrollCode": '07500',                  
    "section": '0101',                      
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
    "instructors": [],                      
    "course": {                             
      "courseId": 'CMPSC     8  ',          
      "title": 'INTRO TO COMP SCI',         
      "unitsFixed": 4                       
    }                                     
  },                                      
  {                                       
    "enrollCode": '07518',                  
    "section": '0102',                      
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
        "beginTime": "10:00",
        "endTime": "10:50"
      }
    ],          
    "instructors": [],                      
    "course": {                             
      "courseId": 'CMPSC     8  ',          
      "title": 'INTRO TO COMP SCI',         
      "unitsFixed": 4                       
    }                                     
  },                                      
  {                                       
    "enrollCode": '07526',                  
    "section": '0103',                      
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
        "beginTime": "11:00",
        "endTime": "11:50"
      }
    ],          
    "instructors": [],                      
    "course": {                             
      "courseId": 'CMPSC     8  ',          
      "title": 'INTRO TO COMP SCI',         
      "unitsFixed": 4                       
    }                                     
  },                                      
  {                                       
    "enrollCode": '07534',                  
    "section": '0104',                      
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
        "beginTime": "12:00",
        "endTime": "12:50"
      }
    ],          
    "instructors": [],                      
    "course": {                             
      "courseId": 'CMPSC     8  ',          
      "title": 'INTRO TO COMP SCI',         
      "unitsFixed": 4                       
    }                                     
  },                                      
  {                                       
    "enrollCode": '63404',                  
    "section": '0105',                      
    "classClosed": 'Y',                     
    "courseCancelled": null,                              
    "enrolledTotal": null,                  
    "maxEnroll": 25,                        
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
      "courseId": 'CMPSC     8  ',          
      "title": 'INTRO TO COMP SCI',         
      "unitsFixed": 4                       
    }                                     
  }                                       
]     
const sectionsOutput2 = [                                         
  {                                       
    "enrollCode": '07492',                  
    "section": '0100',                      
    "classClosed": null,                    
    "courseCancelled": null,                           
    "enrolledTotal": 100,                   
    "maxEnroll": 125,                       
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
      "courseId": 'CMPSC     8  ',          
      "title": 'INTRO TO COMP SCI',         
      "unitsFixed": 4                       
    }                                     
  },                                      
  // {                                       
  //   "enrollCode": '07500',                  
  //   "section": '0101',                      
  //   "classClosed": null,                    
  //   "courseCancelled": null,                             
  //   "enrolledTotal": 25,                    
  //   "maxEnroll": 25,                        
  //   "timeLocations": [
  //     {
  //       "room": "LINE",
  //       "building": "ON",
  //       "roomCapacity": 999,
  //       "days": "  W    ",
  //       "beginTime": "09:00",
  //       "endTime": "09:50"
  //     }
  //   ],          
  //   "instructors": [],                      
  //   "course": {                             
  //     "courseId": 'CMPSC     8  ',          
  //     "title": 'INTRO TO COMP SCI',         
  //     "unitsFixed": 4                       
  //   }                                     
  // },                                      
  // {                                       
  //   "enrollCode": '07518',                  
  //   "section": '0102',                      
  //   "classClosed": null,                    
  //   "courseCancelled": null,      
  //   "enrolledTotal": 25,                    
  //   "maxEnroll": 25,                        
  //   "timeLocations": [
  //     {
  //       "room": "LINE",
  //       "building": "ON",
  //       "roomCapacity": 999,
  //       "days": "  W    ",
  //       "beginTime": "10:00",
  //       "endTime": "10:50"
  //     }
  //   ],          
  //   "instructors": [],                      
  //   "course": {                             
  //     "courseId": 'CMPSC     8  ',          
  //     "title": 'INTRO TO COMP SCI',         
  //     "unitsFixed": 4                       
  //   }                                     
  // },                                      
  // {                                       
  //   "enrollCode": '07526',                  
  //   "section": '0103',                      
  //   "classClosed": null,                    
  //   "courseCancelled": null,
  //   "enrolledTotal": 25,                    
  //   "maxEnroll": 25,                        
  //   "timeLocations": [
  //     {
  //       "room": "LINE",
  //       "building": "ON",
  //       "roomCapacity": 999,
  //       "days": "  W    ",
  //       "beginTime": "11:00",
  //       "endTime": "11:50"
  //     }
  //   ],          
  //   "instructors": [],                      
  //   "course": {                             
  //     "courseId": 'CMPSC     8  ',          
  //     "title": 'INTRO TO COMP SCI',         
  //     "unitsFixed": 4                       
  //   }                                     
  // },                                      
  {                                       
    "enrollCode": '07534',                  
    "section": '0104',                      
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
        "beginTime": "12:00",
        "endTime": "12:50"
      }
    ],          
    "instructors": [],                      
    "course": {                             
      "courseId": 'CMPSC     8  ',          
      "title": 'INTRO TO COMP SCI',         
      "unitsFixed": 4                       
    }                                     
  },                                      
  // {                                       
  //   "enrollCode": '63404',                  
  //   "section": '0105',                      
  //   "classClosed": 'Y',                     
  //   "courseCancelled": null,                              
  //   "enrolledTotal": null,                  
  //   "maxEnroll": 25,                        
  //   "timeLocations": [
  //     {
  //       "room": "LINE",
  //       "building": "ON",
  //       "roomCapacity": 999,
  //       "days": "  W    ",
  //       "beginTime": "13:00",
  //       "endTime": "13:50"
  //     }
  //   ],          
  //   "instructors": [],                      
  //   "course": {                             
  //     "courseId": 'CMPSC     8  ',          
  //     "title": 'INTRO TO COMP SCI',         
  //     "unitsFixed": 4                       
  //   }                                     
  // }                                       
]          
const sectionsOutput3 = [
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
    ],
    "course": {
      "courseId": "CMPSC     8  ",
      "title": "INTRO TO COMP SCI",
      "unitsFixed": 4,
    },
  }
]
const sectionsOutput4 = [                                         
  // {                                       
  //   "enrollCode": '07492',                  
  //   "section": '0100',                      
  //   "classClosed": null,                    
  //   "courseCancelled": null,                           
  //   "enrolledTotal": 100,                   
  //   "maxEnroll": 125,                       
  //   "timeLocations": [
  //     {
  //       "room": "LINE",
  //       "building": "ON",
  //       "roomCapacity": 999,
  //       "days": " T R   ",
  //       "beginTime": "09:30",
  //       "endTime": "10:45"
  //     }
  //   ],          
  //   "instructors": [
  //     {
  //       "instructor": "KHARITONOVA Y",
  //       "functionCode": "Teaching and in charge"
  //     }
  //   ],            
  //   "course": {                             
  //     "courseId": 'CMPSC     8  ',          
  //     "title": 'INTRO TO COMP SCI',         
  //     "unitsFixed": 4                       
  //   }                                     
  // },                                      
  // {                                       
  //   "enrollCode": '07500',                  
  //   "section": '0101',                      
  //   "classClosed": null,                    
  //   "courseCancelled": null,                             
  //   "enrolledTotal": 25,                    
  //   "maxEnroll": 25,                        
  //   "timeLocations": [
  //     {
  //       "room": "LINE",
  //       "building": "ON",
  //       "roomCapacity": 999,
  //       "days": "  W    ",
  //       "beginTime": "09:00",
  //       "endTime": "09:50"
  //     }
  //   ],          
  //   "instructors": [],                      
  //   "course": {                             
  //     "courseId": 'CMPSC     8  ',          
  //     "title": 'INTRO TO COMP SCI',         
  //     "unitsFixed": 4                       
  //   }                                     
  // },                                      
  // {                                       
  //   "enrollCode": '07518',                  
  //   "section": '0102',                      
  //   "classClosed": null,                    
  //   "courseCancelled": null,      
  //   "enrolledTotal": 25,                    
  //   "maxEnroll": 25,                        
  //   "timeLocations": [
  //     {
  //       "room": "LINE",
  //       "building": "ON",
  //       "roomCapacity": 999,
  //       "days": "  W    ",
  //       "beginTime": "10:00",
  //       "endTime": "10:50"
  //     }
  //   ],          
  //   "instructors": [],                      
  //   "course": {                             
  //     "courseId": 'CMPSC     8  ',          
  //     "title": 'INTRO TO COMP SCI',         
  //     "unitsFixed": 4                       
  //   }                                     
  // },                                      
  // {                                       
  //   "enrollCode": '07526',                  
  //   "section": '0103',                      
  //   "classClosed": null,                    
  //   "courseCancelled": null,
  //   "enrolledTotal": 25,                    
  //   "maxEnroll": 25,                        
  //   "timeLocations": [
  //     {
  //       "room": "LINE",
  //       "building": "ON",
  //       "roomCapacity": 999,
  //       "days": "  W    ",
  //       "beginTime": "11:00",
  //       "endTime": "11:50"
  //     }
  //   ],          
  //   "instructors": [],                      
  //   "course": {                             
  //     "courseId": 'CMPSC     8  ',          
  //     "title": 'INTRO TO COMP SCI',         
  //     "unitsFixed": 4                       
  //   }                                     
  // },                                      
  {                                       
    "enrollCode": '07534',                  
    "section": '0104',                      
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
        "beginTime": "12:00",
        "endTime": "12:50"
      }
    ],          
    "instructors": [],                      
    "course": {                             
      "courseId": 'CMPSC     8  ',          
      "title": 'INTRO TO COMP SCI',         
      "unitsFixed": 4                       
    }                                     
  },                                      
  // {                                       
  //   "enrollCode": '63404',                  
  //   "section": '0105',                      
  //   "classClosed": 'Y',                     
  //   "courseCancelled": null,                              
  //   "enrolledTotal": null,                  
  //   "maxEnroll": 25,                        
  //   "timeLocations": [
  //     {
  //       "room": "LINE",
  //       "building": "ON",
  //       "roomCapacity": 999,
  //       "days": "  W    ",
  //       "beginTime": "13:00",
  //       "endTime": "13:50"
  //     }
  //   ],          
  //   "instructors": [],                      
  //   "course": {                             
  //     "courseId": 'CMPSC     8  ',          
  //     "title": 'INTRO TO COMP SCI',         
  //     "unitsFixed": 4                       
  //   }                                     
  // }                                       
]