package edu.ucsb.courses.controllers;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
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

@RestController
@RequestMapping("/api/public")
public class BasicSearchController {
    private final Logger logger = LoggerFactory.getLogger(BasicSearchController.class);

    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    UCSBCurriculumService ucsbCurriculumService;

    @GetMapping(value = "/basicsearch", produces = "application/json")
    public ResponseEntity<String> basicsearch(
        @RequestParam String qtr, 
        @RequestParam String dept,
        @RequestParam String level) 
        throws JsonProcessingException {

        String body = ucsbCurriculumService.getJSON(dept, qtr, level);
        System.out.println(body);    
        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/basicsearch/downloadcsv", produces = "application/json")
    public ResponseEntity<String> downloadcsv(
        @RequestParam String qtr, 
        @RequestParam String dept,
        @RequestParam String level) 
        throws JsonProcessingException {
        String body = ucsbCurriculumService.getJSON(dept, qtr, level);
        JsonNode jsonTree = new ObjectMapper().writeValue(new File("src/main/resources/courses.json"), body);

    }


}



