package edu.ucsb.courses.controllers;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

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

import edu.ucsb.courses.services.UCSBCurriculumService;

// import edu.ucsb.courses.services.DownloadCsvService;

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

    // @GetMapping(value = "/basicsearch/downloadcsv", produces = "text/csv")
    // public void downloadcsv(@RequestParam String qtr, @RequestParam String dept,
    //         @RequestParam String level, HttpServletResponse response) throws JsonProcessingException {


    //     // DownloadCsvService service = new DownloadCsvService();
    //     String coursePageJson = ucsbCurriculumService.getJSON(dept, qtr, level);
        
    //     String filename = String.format("courses-%s-%s-%s.csv", qtr,dept,level);
    //     response.setContentType("text/csv");
    //     response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\"");
    //     try {
    //         downloadCsvService.listToCSV(coursePageJson, response.getWriter());
    //     } catch (IOException e) {
    //         logger.error("Error Writing to Response Stream{}", e);
    //     }
    // }     
}