package edu.ucsb.courses.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import edu.ucsb.courses.services.UCSBCurriculumService;

@RestController
@RequestMapping("/api/public/subjects")
public class SubjectAreasController {
    private final Logger logger = LoggerFactory.getLogger(SubjectAreasController.class);
    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    UCSBCurriculumService ucsbCurriculumService;

    @GetMapping(value = "", produces = "application/json")
    public ResponseEntity<String> getSubjects() throws JsonProcessingException {

        String body = ucsbCurriculumService.getSubjectsJSON();
        
        return ResponseEntity.ok().body(body);
    }  
}