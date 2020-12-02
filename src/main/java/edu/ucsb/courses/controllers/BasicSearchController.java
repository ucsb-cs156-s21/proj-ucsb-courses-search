package edu.ucsb.courses.controllers;

import java.io.FileWriter;
import java.io.IOException;
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

        String body = ucsbCurriculumService.getJSON(dept, qtr, level);
        List<Course> courses = stringToList(body);
        listToCSV(courses, "courses.csv");
        return ResponseEntity.ok().body(body);
    }
    
    // Converts JSON string to a list of Java objects
    private static List<Course> stringToList(String jsonString) {
        List<Course> courses = null;

        try {
            courses = new ObjectMapper().readValue(jsonString, new TypeReference<List<Course>>(){});
        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return courses;
    }

    // Converts list of Java objects to a CSV file
    private static void listToCSV(List<Course> courses, String fileName) {
        final String[] CSV_HEADER = {"quarter", "courseID", "title", "description"};

        FileWriter fileWriter = null;
        CSVPrinter csvPrinter = null;

        try {
            fileWriter = new FileWriter(fileName);
            csvPrinter = new CSVPrinter(fileWriter, CSVFormat.DEFAULT.withHeader(CSV_HEADER));
       
            for (Course course : courses) {
                List<String> data = Arrays.asList(
                course.getQuarter(),
                course.getCourseId(),
                course.getTitle(),
                course.getDescription());
              
                csvPrinter.printRecord(data);
            }
        } catch (Exception e) {
            System.out.println("Writing CSV error!");
            e.printStackTrace();
        } finally {
            try {
                fileWriter.flush();
                fileWriter.close();
                csvPrinter.close();
            } catch (IOException e) {
                System.out.println("Flushing/closing error!");
                e.printStackTrace();
            }
        }
    }    
}