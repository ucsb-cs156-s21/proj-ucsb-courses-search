package edu.ucsb.courses.controllers;

import java.io.FileWriter;
import java.io.IOException;
import java.net.http.HttpHeaders;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.ucsb.courses.documents.Course;
import edu.ucsb.courses.services.UCSBCurriculumService;

import edu.ucsb.courses.services.DownloadCsvService;


@RestController
@RequestMapping("/api/public")
public class BasicSearchController {
    private final Logger logger = LoggerFactory.getLogger(BasicSearchController.class);

    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    UCSBCurriculumService ucsbCurriculumService;

    @GetMapping(value = "/basicsearch", produces = "application/json")
    public ResponseEntity<String> basicsearch(@RequestParam String qtr, @RequestParam String dept,
            @RequestParam String level) throws JsonProcessingException {

        String body = ucsbCurriculumService.getJSON(dept, qtr, level);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/basicsearch/downloadcsv", produces = "application/json")
    public ResponseEntity<String> downloadcsv(@RequestParam String qtr, @RequestParam String dept,
            @RequestParam String level) throws JsonProcessingException {
        DownloadCsvService service = new DownloadCsvService();
        String body = ucsbCurriculumService.getJSON(dept, qtr, level);
        List<Course> courses = service.stringToList(body);
        service.listToCSV(courses, "courses.csv");
        return ResponseEntity.ok().contentType(MediaType.parseMediaType("text/csv")).header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + "todos.csv" + "\"").body(file);
    }
    
        
}