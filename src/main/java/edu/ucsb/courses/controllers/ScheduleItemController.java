package edu.ucsb.courses.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ucsb.courses.advice.AuthControllerAdvice;
import edu.ucsb.courses.documents.Course;
import edu.ucsb.courses.documents.Section;
import edu.ucsb.courses.documents.TimeLocation;
import edu.ucsb.courses.entities.AppUser;
import edu.ucsb.courses.entities.Schedule;
import edu.ucsb.courses.entities.ScheduleItem;
import edu.ucsb.courses.repositories.ScheduleItemRepository;
import edu.ucsb.courses.repositories.ArchivedCourseRepository;
import edu.ucsb.courses.repositories.ScheduleRepository;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/member/scheduleItems")
public class ScheduleItemController {
    private final Logger logger = LoggerFactory.getLogger(BasicSearchController.class);

    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private AuthControllerAdvice authControllerAdvice;

    @Autowired
    ScheduleItemRepository scheduleItemRepository;

    @Autowired
    ScheduleRepository scheduleRepository;

    @Autowired
    ArchivedCourseRepository archivedCourseRepository;

    @PostMapping(value = "/new", produces = "application/json")
    public ResponseEntity<String> createScheduleItem(@RequestParam Long scheduleId,
                                                     @RequestParam String lectureCode,
                                                     @RequestParam String discussionCode,
                                                     @RequestHeader("Authorization") String authorization) throws JsonProcessingException {
        if(!authControllerAdvice.getIsMember(authorization)){
            return new ResponseEntity<>("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }

        AppUser appUser = authControllerAdvice.getUser(authorization);
        
        Optional<Schedule> sched = scheduleRepository.findById(scheduleId);
        if (sched.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ScheduleItem newSchedItem = new ScheduleItem(null, lectureCode, discussionCode, appUser, sched.get());
        ScheduleItem savedSched = scheduleItemRepository.save(newSchedItem);
        return ResponseEntity.ok().body(mapper.writeValueAsString(savedSched));
    }

    @DeleteMapping(value = "/delete", produces = "application/json")
    public ResponseEntity<String> removeScheduleItem(@RequestHeader("Authorization") String authorization,
                                                     @RequestParam Long id){
        if(!authControllerAdvice.getIsMember(authorization)){
            return new ResponseEntity<>("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }
        AppUser appUser = authControllerAdvice.getUser(authorization);

        Optional<ScheduleItem> s1 = scheduleItemRepository.findById(id);
        if(s1.isPresent()){
            if(s1.get().getAppUser().equals(appUser)) {
                scheduleItemRepository.deleteById(id);
                return ResponseEntity.ok().build();
            }
            else{
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/get", produces = "application/json")
    public ResponseEntity<String> getScheduleItemById(@RequestHeader("Authorization") String authorization,
                                                      @RequestParam Long id) throws JsonProcessingException {
        AppUser appUser = authControllerAdvice.getUser(authorization);
        if(!authControllerAdvice.getIsMember(authorization)){
            return new ResponseEntity<>("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }
        Optional<ScheduleItem> savedSched = scheduleItemRepository.findById(id);
        if (savedSched.isPresent() && savedSched.get().getAppUser().equals(appUser)) {
            String body = savedSched.get().toString();
            return ResponseEntity.ok().body(mapper.writeValueAsString(savedSched.get()));
        }

        return ResponseEntity.badRequest().build();
    }

}