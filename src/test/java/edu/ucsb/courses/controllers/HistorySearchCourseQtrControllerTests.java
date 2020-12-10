package edu.ucsb.courses.controllers;

import edu.ucsb.courses.config.SecurityConfig;
import edu.ucsb.courses.documents.Course;
import edu.ucsb.courses.documents.CoursePage;
import edu.ucsb.courses.repositories.ArchivedCourseRepository;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

// @Import(SecurityConfig.class) applies the security rules 
// so that /api/public/** endpoints don't require authentication.
// Otherwise you may get authorization errors when running the test

@WebMvcTest(value = HistorySearchCourseQtrController.class)
@Import(SecurityConfig.class)
public class HistorySearchCourseQtrControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ArchivedCourseRepository archivedCourseRepository;

    @Test
    public void test_basicSearch_badUrl() throws Exception {
        
        List<Course> expectedResult = new ArrayList<Course>();
        String urlTemplate = "/api/public/history/coursesearch?"
            +      "startQtr=%s"
            +       "&endQtr=%s"
            +  "&subjectArea=%s"
            + "&courseNumber=%s"
            +    "&courseSuf=%s"
        ;

        String url = String.format( urlTemplate, "20201", "20194", "CMPSC", "130", "A" );

        when (
            archivedCourseRepository.findByQuarterIntervalAndCourseName(
                any(String.class), any(String.class), any(String.class)
            )
        ).thenReturn( expectedResult );

        MvcResult response = mockMvc.perform(
            get(url).contentType("application/json")
        ).andExpect(
            status().isOk()
        ).andReturn();
        String responseString = response.getResponse().getContentAsString();

        CoursePage cp = CoursePage.fromJSON(responseString);

        assertEquals( expectedResult, cp.getClasses() );
    }

    @Test
    public void test_basicSearch_goodUrl() throws Exception {
        
        String expectedJSONString = "{\"pageNumber\":1,\"pageSize\":3,\"total\":3,\"classes\":[{\"quarter\":\"20201\",\"courseId\":\"CMPSC130A\",\"title\":\"DATASTRUCTALGOR\",\"description\":\"Thestudyofdatastructuresandtheirapplications.Correctnessproofsandtechniquesforthedesignofcorrectprograms.Internalandexternalsearching.Hashingandheightbalancedtrees.Analysisofsortingalgorithms.Memorymanagement.Graphtraversaltechniquesandtheirapplications.\",\"classSections\":[{\"enrollCode\":\"08086\",\"section\":\"0100\",\"session\":null,\"classClosed\":null,\"courseCancelled\":null,\"gradingOptionCode\":null,\"enrolledTotal\":122,\"maxEnroll\":126,\"secondaryStatus\":\"R\",\"departmentApprovalRequired\":false,\"instructorApprovalRequired\":false,\"restrictionLevel\":null,\"restrictionMajor\":\"+CMPSC+CMPEN+CPSCI+EE\",\"restrictionMajorPass\":null,\"restrictionMinor\":null,\"restrictionMinorPass\":null,\"concurrentCourses\":[],\"timeLocations\":[{\"room\":\"1001\",\"building\":\"LSB\",\"roomCapacity\":\"159\",\"days\":\"TR\",\"beginTime\":\"12:30\",\"endTime\":\"13:45\"}],\"instructors\":[{\"instructor\":\"KOCCK\",\"functionCode\":\"Teachingandincharge\"}]},{\"enrollCode\":\"08094\",\"section\":\"0101\",\"session\":null,\"classClosed\":\"Y\",\"courseCancelled\":\"C\",\"gradingOptionCode\":null,\"enrolledTotal\":null,\"maxEnroll\":null,\"secondaryStatus\":null,\"departmentApprovalRequired\":false,\"instructorApprovalRequired\":false,\"restrictionLevel\":null,\"restrictionMajor\":\"+CMPSC+CMPEN+CPSCI+EE\",\"restrictionMajorPass\":null,\"restrictionMinor\":null,\"restrictionMinorPass\":null,\"concurrentCourses\":[],\"timeLocations\":[],\"instructors\":[]},{\"enrollCode\":\"08102\",\"section\":\"0102\",\"session\":null,\"classClosed\":null,\"courseCancelled\":null,\"gradingOptionCode\":null,\"enrolledTotal\":42,\"maxEnroll\":42,\"secondaryStatus\":null,\"departmentApprovalRequired\":false,\"instructorApprovalRequired\":false,\"restrictionLevel\":null,\"restrictionMajor\":\"+CMPSC+CMPEN+CPSCI+EE\",\"restrictionMajorPass\":null,\"restrictionMinor\":null,\"restrictionMinorPass\":null,\"concurrentCourses\":[],\"timeLocations\":[{\"room\":\"2510\",\"building\":\"PHELP\",\"roomCapacity\":null,\"days\":\"R\",\"beginTime\":\"17:00\",\"endTime\":\"17:50\"}],\"instructors\":[{\"instructor\":\"ZHANGZHENING\",\"functionCode\":\"Teachingbutnotincharge\"}]},{\"enrollCode\":\"08110\",\"section\":\"0103\",\"session\":null,\"classClosed\":null,\"courseCancelled\":null,\"gradingOptionCode\":null,\"enrolledTotal\":39,\"maxEnroll\":42,\"secondaryStatus\":null,\"departmentApprovalRequired\":false,\"instructorApprovalRequired\":false,\"restrictionLevel\":null,\"restrictionMajor\":\"+CMPSC+CMPEN+CPSCI+EE\",\"restrictionMajorPass\":null,\"restrictionMinor\":null,\"restrictionMinorPass\":null,\"concurrentCourses\":[],\"timeLocations\":[{\"room\":\"2510\",\"building\":\"PHELP\",\"roomCapacity\":null,\"days\":\"R\",\"beginTime\":\"18:00\",\"endTime\":\"18:50\"}],\"instructors\":[{\"instructor\":\"GARTLANDP\",\"functionCode\":\"Teachingbutnotincharge\"}]},{\"enrollCode\":\"73411\",\"section\":\"0104\",\"session\":null,\"classClosed\":null,\"courseCancelled\":null,\"gradingOptionCode\":null,\"enrolledTotal\":41,\"maxEnroll\":42,\"secondaryStatus\":null,\"departmentApprovalRequired\":false,\"instructorApprovalRequired\":false,\"restrictionLevel\":null,\"restrictionMajor\":\"+CMPSC+CMPEN+CPSCI+EE\",\"restrictionMajorPass\":null,\"restrictionMinor\":null,\"restrictionMinorPass\":null,\"concurrentCourses\":[],\"timeLocations\":[{\"room\":\"2510\",\"building\":\"PHELP\",\"roomCapacity\":null,\"days\":\"R\",\"beginTime\":\"16:00\",\"endTime\":\"16:50\"}],\"instructors\":[{\"instructor\":\"GUDIPATIK\",\"functionCode\":\"Teachingbutnotincharge\"}]}],\"generalEducation\":[],\"finalExam\":null},{\"quarter\":\"20202\",\"courseId\":\"CMPSC130A\",\"title\":\"DATASTRUCTALGOR\",\"description\":\"Thestudyofdatastructuresandtheirapplications.Correctnessproofsandtechniquesforthedesignofcorrectprograms.Internalandexternalsearching.Hashingandheightbalancedtrees.Analysisofsortingalgorithms.Memorymanagement.Graphtraversaltechniquesandtheirapplications.\",\"classSections\":[{\"enrollCode\":\"07765\",\"section\":\"0100\",\"session\":null,\"classClosed\":null,\"courseCancelled\":null,\"gradingOptionCode\":null,\"enrolledTotal\":75,\"maxEnroll\":82,\"secondaryStatus\":\"R\",\"departmentApprovalRequired\":false,\"instructorApprovalRequired\":false,\"restrictionLevel\":null,\"restrictionMajor\":\"+CMPSC+CMPEN+CPSCI+EE\",\"restrictionMajorPass\":null,\"restrictionMinor\":null,\"restrictionMinorPass\":null,\"concurrentCourses\":[],\"timeLocations\":[{\"room\":null,\"building\":null,\"roomCapacity\":null,\"days\":\"MW\",\"beginTime\":\"17:00\",\"endTime\":\"18:15\"}],\"instructors\":[{\"instructor\":\"AGRAWALD\",\"functionCode\":\"Teachingandincharge\"}]},{\"enrollCode\":\"07773\",\"section\":\"0101\",\"session\":null,\"classClosed\":null,\"courseCancelled\":null,\"gradingOptionCode\":null,\"enrolledTotal\":25,\"maxEnroll\":28,\"secondaryStatus\":null,\"departmentApprovalRequired\":false,\"instructorApprovalRequired\":false,\"restrictionLevel\":null,\"restrictionMajor\":\"+CMPSC+CMPEN+CPSCI+EE\",\"restrictionMajorPass\":null,\"restrictionMinor\":null,\"restrictionMinorPass\":null,\"concurrentCourses\":[],\"timeLocations\":[{\"room\":null,\"building\":null,\"roomCapacity\":null,\"days\":\"T\",\"beginTime\":\"15:00\",\"endTime\":\"15:50\"}],\"instructors\":[{\"instructor\":\"SONARC\",\"functionCode\":\"Teachingbutnotincharge\"},{\"instructor\":\"GARTLANDP\",\"functionCode\":\"Teachingbutnotincharge\"}]},{\"enrollCode\":\"07781\",\"section\":\"0102\",\"session\":null,\"classClosed\":null,\"courseCancelled\":null,\"gradingOptionCode\":null,\"enrolledTotal\":26,\"maxEnroll\":27,\"secondaryStatus\":null,\"departmentApprovalRequired\":false,\"instructorApprovalRequired\":false,\"restrictionLevel\":null,\"restrictionMajor\":\"+CMPSC+CMPEN+CPSCI+EE\",\"restrictionMajorPass\":null,\"restrictionMinor\":null,\"restrictionMinorPass\":null,\"concurrentCourses\":[],\"timeLocations\":[{\"room\":null,\"building\":null,\"roomCapacity\":null,\"days\":\"T\",\"beginTime\":\"16:00\",\"endTime\":\"16:50\"}],\"instructors\":[{\"instructor\":\"GARTLANDP\",\"functionCode\":\"Teachingbutnotincharge\"},{\"instructor\":\"SONARC\",\"functionCode\":\"Teachingbutnotincharge\"}]},{\"enrollCode\":\"07799\",\"section\":\"0103\",\"session\":null,\"classClosed\":null,\"courseCancelled\":null,\"gradingOptionCode\":null,\"enrolledTotal\":24,\"maxEnroll\":27,\"secondaryStatus\":null,\"departmentApprovalRequired\":false,\"instructorApprovalRequired\":false,\"restrictionLevel\":null,\"restrictionMajor\":\"+CMPSC+CMPEN+CPSCI+EE\",\"restrictionMajorPass\":null,\"restrictionMinor\":null,\"restrictionMinorPass\":null,\"concurrentCourses\":[],\"timeLocations\":[{\"room\":null,\"building\":null,\"roomCapacity\":null,\"days\":\"T\",\"beginTime\":\"17:00\",\"endTime\":\"17:50\"}],\"instructors\":[{\"instructor\":\"SONARC\",\"functionCode\":\"Teachingbutnotincharge\"},{\"instructor\":\"GARTLANDP\",\"functionCode\":\"Teachingbutnotincharge\"}]}],\"generalEducation\":[],\"finalExam\":null},{\"quarter\":\"20204\",\"courseId\":\"CMPSC130A\",\"title\":\"DATASTRUCTALGOR\",\"description\":\"Thestudyofdatastructuresandtheirapplications.Correctnessproofsandtechniquesforthedesignofcorrectprograms.Internalandexternalsearching.Hashingandheightbalancedtrees.Analysisofsortingalgorithms.Memorymanagement.Graphtraversaltechniquesandtheirapplications.\",\"classSections\":[{\"enrollCode\":\"07823\",\"section\":\"0100\",\"session\":null,\"classClosed\":null,\"courseCancelled\":null,\"gradingOptionCode\":null,\"enrolledTotal\":88,\"maxEnroll\":95,\"secondaryStatus\":\"R\",\"departmentApprovalRequired\":false,\"instructorApprovalRequired\":false,\"restrictionLevel\":null,\"restrictionMajor\":\"+CMPSC+CMPEN+CPSCI+EE\",\"restrictionMajorPass\":null,\"restrictionMinor\":null,\"restrictionMinorPass\":null,\"concurrentCourses\":[],\"timeLocations\":[{\"room\":\"LINE\",\"building\":\"ON\",\"roomCapacity\":null,\"days\":\"MW\",\"beginTime\":\"14:00\",\"endTime\":\"15:15\"}],\"instructors\":[{\"instructor\":\"AGRAWALD\",\"functionCode\":\"Teachingandincharge\"}]},{\"enrollCode\":\"07831\",\"section\":\"0101\",\"session\":null,\"classClosed\":null,\"courseCancelled\":null,\"gradingOptionCode\":null,\"enrolledTotal\":43,\"maxEnroll\":47,\"secondaryStatus\":null,\"departmentApprovalRequired\":false,\"instructorApprovalRequired\":false,\"restrictionLevel\":null,\"restrictionMajor\":\"+CMPSC+CMPEN+CPSCI+EE\",\"restrictionMajorPass\":null,\"restrictionMinor\":null,\"restrictionMinorPass\":null,\"concurrentCourses\":[],\"timeLocations\":[{\"room\":\"LINE\",\"building\":\"ON\",\"roomCapacity\":null,\"days\":\"F\",\"beginTime\":\"09:00\",\"endTime\":\"09:50\"}],\"instructors\":[{\"instructor\":\"AHMADI\",\"functionCode\":\"Teachingbutnotincharge\"},{\"instructor\":\"GUDIPATIK\",\"functionCode\":\"Teachingbutnotincharge\"},{\"instructor\":\"BOYLANDP\",\"functionCode\":\"Teachingbutnotincharge\"}]},{\"enrollCode\":\"07849\",\"section\":\"0102\",\"session\":null,\"classClosed\":null,\"courseCancelled\":null,\"gradingOptionCode\":null,\"enrolledTotal\":45,\"maxEnroll\":48,\"secondaryStatus\":null,\"departmentApprovalRequired\":false,\"instructorApprovalRequired\":false,\"restrictionLevel\":null,\"restrictionMajor\":\"+CMPSC+CMPEN+CPSCI+EE\",\"restrictionMajorPass\":null,\"restrictionMinor\":null,\"restrictionMinorPass\":null,\"concurrentCourses\":[],\"timeLocations\":[{\"room\":\"LINE\",\"building\":\"ON\",\"roomCapacity\":null,\"days\":\"F\",\"beginTime\":\"10:00\",\"endTime\":\"10:50\"}],\"instructors\":[{\"instructor\":\"GUDIPATIK\",\"functionCode\":\"Teachingbutnotincharge\"},{\"instructor\":\"AHMADI\",\"functionCode\":\"Teachingbutnotincharge\"},{\"instructor\":\"BOYLANDP\",\"functionCode\":\"Teachingbutnotincharge\"}]}],\"generalEducation\":[],\"finalExam\":null}]}";
        List<Course> expectedResult = CoursePage.fromJSON( expectedJSONString ).getClasses();
        String urlTemplate = "/api/public/history/coursesearch?"
            +      "startQtr=%s"
            +       "&endQtr=%s"
            +  "&subjectArea=%s"
            + "&courseNumber=%s"
            +    "&courseSuf=%s"
        ;

        String url = String.format( urlTemplate, "20201", "20204", "CMPSC", "130", "A" );

        when (
            archivedCourseRepository.findByQuarterIntervalAndCourseName(
                any(String.class), any(String.class), any(String.class)
            )
        ).thenReturn( expectedResult );

        MvcResult response = mockMvc.perform(
            get(url).contentType("application/json")
        ).andExpect(
            status().isOk()
        ).andReturn();
        String responseString = response.getResponse().getContentAsString();

        CoursePage cp = CoursePage.fromJSON(responseString);

        assertEquals( expectedResult, cp.getClasses() );
    }
}