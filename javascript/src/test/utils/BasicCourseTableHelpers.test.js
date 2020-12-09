import { reformatJSON } from 'main/utils/BasicCourseTableHelpers';

describe("BasicCourseTableHelpers tests", () => {
  test("reformatJSON properly reformats the json", () => {
    const testOutput = reformatJSON(classesInput);
    expect(testOutput).toStrictEqual(sectionsOutput);
  });


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