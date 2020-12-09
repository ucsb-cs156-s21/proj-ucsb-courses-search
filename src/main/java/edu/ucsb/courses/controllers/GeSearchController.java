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
public class GeSearchController {
    private final Logger logger = LoggerFactory.getLogger(GeSearchController.class);

    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    ArchivedCourseRepository archivedCourseRepository;


    @GetMapping(value = "/gesearch", produces = "application/json")
    public ResponseEntity<String> gesearch(
        @RequestParam String startQtr,
        @RequestParam String endQtr,
        @RequestParam String geCode) 
        throws JsonProcessingException {

        String formattedGeCode = String.format("%-3s",geCode);

        logger.info("formattedGeCode='{}'",formattedGeCode);

        List<Course> courseResults = archivedCourseRepository.findByQuarterIntervalAndGe(startQtr,endQtr,formattedGeCode);

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