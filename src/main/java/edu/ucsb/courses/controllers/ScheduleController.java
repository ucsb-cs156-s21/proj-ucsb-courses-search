package edu.ucsb.courses.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.courses.entities.Schedule;
import edu.ucsb.courses.services.UCSBCurriculumService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.RequestHeader;
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

    @PostMapping(value = "/createSchedule", produces = "application/json")
    public ResponseEntity<String> createSchedule(@RequestParam String name,
                                                 @RequestParam String description,
                                                 @RequestParam String quarter,
                                                 @RequestHeader("Authorization") String authorization){
        DecodedJWT jwt = JWT.decode(authorization.substring(7));
        Schedule newSched = new Schedule(null, name, description, quarter, jwt.getSubject());
        Schedule savedSched= scheduleRepository.save(newSched);
        return ResponseEntity.ok().body(savedSched.toString());
    }

    @DeleteMapping(value = "/deleteSchedule", produces = "application/json")
    public ResponseEntity<String> deleteSchedule(@RequestHeader("Authorization") String authorization, @RequestParam String id){
        DecodedJWT jwt = JWT.decode(authorization.substring(7));
        Long castId = Long.parseLong(id);
        Optional<Schedule> target = scheduleRepository.findById(castId);
        if (!target.isPresent() || !target.get().getUserId().equals(jwt.getSubject())) {
            return ResponseEntity.notFound().build();
        }
        scheduleRepository.deleteById(castId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/getSchedule", produces = "application/json")
    public ResponseEntity<String> getSchedule(@RequestHeader("Authorization") String authorization, @RequestParam String id) 
        throws JsonProcessingException{
        DecodedJWT jwt = JWT.decode(authorization.substring(7));
        Long castId = Long.parseLong(id);
        Optional<Schedule> target = scheduleRepository.findById(castId);
        if (target.isPresent()) {
            if (target.get().getUserId().equals(jwt.getSubject())){
                String body = target.get().toString();
                return ResponseEntity.ok().body(body);
            }
        }
        return ResponseEntity.badRequest().build();
    }


}
