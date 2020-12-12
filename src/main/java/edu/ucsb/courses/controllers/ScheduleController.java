package edu.ucsb.courses.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.courses.advice.AuthControllerAdvice;
import edu.ucsb.courses.entities.AppUser;
import edu.ucsb.courses.entities.Schedule;
import edu.ucsb.courses.services.UCSBCurriculumService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @Autowired
    AuthControllerAdvice authController;

    @PostMapping(value = "/createSchedule", produces = "application/json")
    public ResponseEntity<String> createSchedule(@RequestParam String name,
                                                 @RequestParam String description,
                                                 @RequestParam String quarter,
                                                 @RequestHeader("Authorization") String authorization) throws JsonProcessingException {
        AppUser user = authController.getUser(authorization);
        String userId = String.valueOf(user.getId());
        Schedule newSched = new Schedule(null, name, description, quarter, userId);
        Schedule savedSched= scheduleRepository.save(newSched);
        return ResponseEntity.ok().body(mapper.writeValueAsString(savedSched));
    }

    @PutMapping(value = "/updateSchedule", produces = "application/json")
    public ResponseEntity<String> updateSchedule(@RequestParam String id,
                                                 @RequestParam String name,
                                                 @RequestParam String description,
                                                 @RequestParam String quarter,
                                                 @RequestHeader("Authorization") String authorization) throws JsonProcessingException {
        AppUser user = authController.getUser(authorization);
        String userId = String.valueOf(user.getId());
        Long castId = Long.parseLong(id);
        Optional<Schedule> schedule = scheduleRepository.findById(castId);
        if (!schedule.isPresent()) {
          return ResponseEntity.notFound().build();
        }
        if (!castId.equals(schedule.get().getId()) || !schedule.get().getUserId().equals(userId)) {
          return ResponseEntity.badRequest().build();
        }

        schedule.get().setName(name);
        schedule.get().setDescription(description);
        schedule.get().setQuarter(quarter);
        scheduleRepository.save(schedule.get());
        String body = mapper.writeValueAsString(schedule.get());
        return ResponseEntity.ok().body(body);
      }

    @DeleteMapping(value = "/deleteSchedule", produces = "application/json")
    public ResponseEntity<String> deleteSchedule(@RequestHeader("Authorization") String authorization, @RequestParam String id){
        AppUser user = authController.getUser(authorization);
        String userId = String.valueOf(user.getId());
        Long castId = Long.parseLong(id);
        Optional<Schedule> target = scheduleRepository.findById(castId);
        if (!target.isPresent() || !target.get().getUserId().equals(userId)) {
            return ResponseEntity.notFound().build();
        }
        scheduleRepository.deleteById(castId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/getSchedule", produces = "application/json")
    public ResponseEntity<String> getSchedule(@RequestHeader("Authorization") String authorization, @RequestParam String id) 
        throws JsonProcessingException{
        AppUser user = authController.getUser(authorization);
        String userId = String.valueOf(user.getId());
        Long castId = Long.parseLong(id);
        Optional<Schedule> target = scheduleRepository.findById(castId);
        if (target.isPresent() && target.get().getUserId().equals(userId)) {
          String body = target.get().toString();
          return ResponseEntity.ok().body(mapper.writeValueAsString(target.get()));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping(value = "/getSchedules", produces = "application/json")
      public ResponseEntity<String> getSchedules(@RequestHeader("Authorization") String authorization) 
          throws JsonProcessingException{
          AppUser user = authController.getUser(authorization);
          String userId = String.valueOf(user.getId());
          List<Schedule> savedSchedules= scheduleRepository.findByUserId(userId);
          String res = "[";
          for (Schedule sched: savedSchedules){
            res = res.concat(mapper.writeValueAsString(sched) + ",");
          }
          if (res.length() == 1) {
            return ResponseEntity.noContent().build();
          }
          return ResponseEntity.ok().body(res.substring(0,res.length()-1)+"]");
     }
}