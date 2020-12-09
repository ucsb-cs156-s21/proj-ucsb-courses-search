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

import edu.ucsb.courses.entities.Schedule;
import edu.ucsb.courses.repositories.ScheduleRepository;
import edu.ucsb.courses.services.UCSBCurriculumService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ScheduleController {
  private final Logger logger = LoggerFactory.getLogger(ScheduleController.class);

  @Autowired
  private ScheduleRepository scheduleRepository;

  private ObjectMapper mapper = new ObjectMapper();

  @GetMapping(value = "/api/schedules", produces = "application/json")
  public ResponseEntity<String> getUserSchedules(@RequestHeader("Authorization") String authorization)
      throws JsonProcessingException {
    DecodedJWT jwt = JWT.decode(authorization.substring(7));
    List<Schedule> schedules = scheduleRepository.findByUserId(jwt.getSubject());
    ObjectMapper mapper = new ObjectMapper();

    String body = mapper.writeValueAsString(schedules);
    return ResponseEntity.ok().body(body);
  }

  @GetMapping(value = "/api/schedules/{id}", produces = "application/json")
  public ResponseEntity<String> getSchedule(@RequestHeader("Authorization") String authorization, 
                                             @PathVariable("id") Long id) 
      throws JsonProcessingException {
    DecodedJWT jwt = JWT.decode(authorization.substring(7));
    Optional<Schedule> schedule = scheduleRepository.findById(id);
    if (schedule.isEmpty() || !schedule.get().getUserId().equals(jwt.getSubject())) {
      return ResponseEntity.notFound().build();
    }

    ObjectMapper mapper = new ObjectMapper();
    String body = mapper.writeValueAsString(schedule.get());
    return ResponseEntity.ok().body(body);
  }

  @PostMapping(value = "/api/schedules", produces = "application/json")
  public ResponseEntity<String> createSchedule(@RequestHeader("Authorization") String authorization,
      @RequestBody @Valid Schedule schedule) throws JsonProcessingException {
    DecodedJWT jwt = JWT.decode(authorization.substring(7));
    schedule.setUserId(jwt.getSubject());
    Schedule savedSchedule = scheduleRepository.save(schedule);
    String body = mapper.writeValueAsString(savedSchedule);
    return ResponseEntity.ok().body(body);
  }

  @DeleteMapping(value = "/api/schedules/{id}", produces = "application/json")
  public ResponseEntity<String> deleteTodo(@RequestHeader("Authorization") String authorization,
      @PathVariable("id") Long id) {
    DecodedJWT jwt = JWT.decode(authorization.substring(7));
    Optional<Schedule> schedule = scheduleRepository.findById(id);
    if (!schedule.isPresent() || !schedule.get().getUserId().equals(jwt.getSubject())) {
      return ResponseEntity.notFound().build();
    }
    scheduleRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping(value = "/api/schedules/{id}", produces = "application/json")
  public ResponseEntity<String> updateTodo(@RequestHeader("Authorization") String authorization,
      @PathVariable("id") Long id, @RequestBody @Valid Schedule incomingSchedule)
      throws JsonProcessingException {
    DecodedJWT jwt = JWT.decode(authorization.substring(7));
    Optional<Schedule> schedule = scheduleRepository.findById(id);
    if (!schedule.isPresent() || !schedule.get().getUserId().equals(jwt.getSubject())) {
      return ResponseEntity.notFound().build();
    }

    if (!incomingSchedule.getId().equals(id) || !incomingSchedule.getUserId().equals(jwt.getSubject())) {
      return ResponseEntity.badRequest().build();
    }

    scheduleRepository.save(incomingSchedule);
    String body = mapper.writeValueAsString(incomingSchedule);
    return ResponseEntity.ok().body(body);
  }
}