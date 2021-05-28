package edu.ucsb.courses.controllers;

import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;



import edu.ucsb.courses.advice.AuthControllerAdvice;
import edu.ucsb.courses.entities.AppUser;
import edu.ucsb.courses.entities.Schedule;
import edu.ucsb.courses.entities.ScheduleItem;
import edu.ucsb.courses.repositories.ScheduleItemRepository;
import edu.ucsb.courses.repositories.ScheduleRepository;
import edu.ucsb.courses.models.PersonalSchedule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/member/schedule")
public class ScheduleController {
    private final Logger logger = LoggerFactory.getLogger(BasicSearchController.class);

    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    ScheduleRepository scheduleRepository;

    @Autowired
    ScheduleItemRepository scheduleItemRepository;

    @Autowired
    AuthControllerAdvice authController;

    @PostMapping(value = "/new", produces = "application/json")
    public ResponseEntity<String> createSchedule(@RequestParam String name,
                                                 @RequestParam String description,
                                                 @RequestParam String quarter,
                                                 @RequestHeader("Authorization") String authorization) throws JsonProcessingException {
        AppUser user = authController.getUser(authorization);
        String userId = String.valueOf(user.getId());
        if(!authController.getIsMember(authorization)){
            return new ResponseEntity<>("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }
        Schedule newSched = new Schedule(null, name, description, quarter, userId);
        Schedule savedSched= scheduleRepository.save(newSched);
        return ResponseEntity.ok().body(mapper.writeValueAsString(savedSched));
    }

    @PutMapping(value = "/update/{id}", produces = "application/json")
    public ResponseEntity<String> updateSchedule(@PathVariable("id") Long id, 
                                                 @RequestBody @Valid Schedule incomingSchedule,
                                                 @RequestHeader("Authorization") String authorization) throws JsonProcessingException {
        if(!authController.getIsMember(authorization)){
            return new ResponseEntity<>("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }
        AppUser user = authController.getUser(authorization);
        String userId = String.valueOf(user.getId());
        Optional<Schedule> schedule = scheduleRepository.findById(id);
        if (schedule.isEmpty()) {
          return ResponseEntity.notFound().build();
        }
        if (!id.equals(schedule.get().getId()) || !schedule.get().getUserId().equals(userId)) {
          return ResponseEntity.badRequest().build();
        }

        scheduleRepository.save(incomingSchedule);
        String body = mapper.writeValueAsString(incomingSchedule);
        return ResponseEntity.ok().body(body);
      }

    @DeleteMapping(value = "/delete/{id}", produces = "application/json")
    public ResponseEntity<String> deleteSchedule(@RequestHeader("Authorization") String authorization, @PathVariable Long id){
        AppUser user = authController.getUser(authorization);
        String userId = String.valueOf(user.getId());
        if(!authController.getIsMember(authorization)){
            return new ResponseEntity<>("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }
        Optional<Schedule> target = scheduleRepository.findById(id);
        if (target.isEmpty() || !target.get().getUserId().equals(userId)) {
            return ResponseEntity.notFound().build();
        }
        scheduleRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/get/{id}", produces = "application/json")
    public ResponseEntity<String> getSchedule(@RequestHeader("Authorization") String authorization, @PathVariable Long id) 
        throws JsonProcessingException{
        AppUser user = authController.getUser(authorization);
        String userId = String.valueOf(user.getId());
        if(!authController.getIsMember(authorization)){
            return new ResponseEntity<>("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }
        Optional<Schedule> target = scheduleRepository.findById(id);
        List<ScheduleItem> classes = scheduleItemRepository.findByScheduleId(id);
        if (target.isPresent() && target.get().getUserId().equals(userId)) {
          PersonalSchedule ps = new PersonalSchedule(target.get(),classes);
          return ResponseEntity.ok().body(mapper.writeValueAsString(ps));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping(value = "/getSchedules", produces = "application/json")
      public ResponseEntity<String> getSchedules(@RequestHeader("Authorization") String authorization) 
          throws JsonProcessingException{
          AppUser user = authController.getUser(authorization);
          String userId = String.valueOf(user.getId());
          if(!authController.getIsMember(authorization)){
            return new ResponseEntity<>("Unauthorized Request", HttpStatus.UNAUTHORIZED);
          }
          List<Schedule> savedSchedules= scheduleRepository.findByUserId(userId);
          String result = mapper.writeValueAsString(savedSchedules);
          return ResponseEntity.ok().body(result);
     }
}