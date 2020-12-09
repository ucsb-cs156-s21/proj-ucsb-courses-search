package edu.ucsb.courses.controllers;

import java.util.List;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.ucsb.courses.documents.Course;
import edu.ucsb.courses.documents.CoursePage;
import edu.ucsb.courses.repositories.ArchivedCourseRepository;
import edu.ucsb.courses.services.UCSBCurriculumService;

@RestController
@RequestMapping("/api/public/history")
public class HistorySearchInstructQtrController {
    private final Logger logger = LoggerFactory.getLogger(HistorySearchInstructQtrController.class);

    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    ArchivedCourseRepository archivedCourseRepository;


    @GetMapping(value = "/instructorsearch", produces = "application/json")
    public ResponseEntity<String> instructorsearch(
        @RequestParam String startQtr, 
        @RequestParam String endQtr, 
        //@RequestParam String subjectArea,
        //@RequestParam String courseNumber,
        //@RequestParam String courseSuf
        @RequestParam String instructorText) 
        throws JsonProcessingException {

        //String formattedSubjectArea = String.format() No formatting needed, comes formatted from the form
        //String formattedNumber = String.format("%3s",courseNumber); // '  8'
        //String formattedCourseSuffix = String.format("%-2s",courseSuf);
        //String formattedCourseName = subjectArea + formattedNumber + formattedCourseSuffix;

        //logger.info("subjectArea='{}'",subjectArea);
        //logger.info("formattedNumber='{}'",formattedNumber);
        //logger.info("formattedCourseSuffix='{}'",formattedCourseSuffix);
        //logger.info("formattedCourseName='{}'",formattedCourseName);

        List<Course> courseResults = archivedCourseRepository.findByQuarterIntervalAndInstructor(startQtr, endQtr, instructorText);

        CoursePage cp = new CoursePage();

        cp.setPageNumber(1);
        cp.setPageSize(courseResults.size());
        cp.setTotal(courseResults.size());
        cp.setClasses(courseResults);

        logger.info("cp={}",cp);
        String body = mapper.writeValueAsString(cp);

        return ResponseEntity.ok().body(body);
    }

}