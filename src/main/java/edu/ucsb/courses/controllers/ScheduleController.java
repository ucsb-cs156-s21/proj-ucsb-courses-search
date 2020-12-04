package edu.ucsb.courses.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.courses.entities.Schedule;
import edu.ucsb.courses.services.UCSBCurriculumService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import edu.ucsb.courses.documents.Course;
import edu.ucsb.courses.documents.CoursePage;
import edu.ucsb.courses.repositories.ScheduleRepository;


@RestController
@RequestMapping("/api/public")
public class ScheduleController {
    private final Logger logger = LoggerFactory.getLogger(BasicSearchController.class);

    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    ScheduleRepository scheduleRepository;

    //Stub
    @GetMapping(value = "/createSchedule", produces = "application/json")
    public ResponseEntity<String> createSchedule(@RequestParam String id){
        return ResponseEntity.badRequest().build();
    }

    //Stub
    @GetMapping(value = "/addScheduleItem", produces = "application/json")
    public ResponseEntity<String> addScheduleItem(@RequestParam String id){
        return ResponseEntity.badRequest().build();
    }

    //Stub
    @GetMapping(value = "/deleteSchedule", produces = "application/json")
    public ResponseEntity<String> deleteSchedule(@RequestParam String id){
        return ResponseEntity.badRequest().build();
    }

    //Stub
    @GetMapping(value = "/getSchedule", produces = "application/json")
    public ResponseEntity<String> getSchedule(@RequestParam String id){
        Long castId = Long.parseLong(id);
        Optional<Schedule> target = scheduleRepository.findById(castId);
        if (target.isPresent()) {
            String body = target.get().toString();
            return ResponseEntity.ok().body(body);
        }
        return ResponseEntity.badRequest().build();
    }


}
