package edu.ucsb.courses.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


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

    @GetMapping(value = "/new", produces = "application/json")
    public ResponseEntity<String> addScheduleItem(@RequestHeader("Authorization") String authorization,
                                                  @RequestParam String scheduleId,
                                                 @RequestParam String enrollCode,
                                                 @RequestParam String courseId) throws JsonProcessingException {
        if(!authControllerAdvice.getIsMember(authorization)){
            return new ResponseEntity<String>("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }
        AppUser user = authControllerAdvice.getUser(authorization);
        String userId = String.valueOf(user.getId());
        Long castId = Long.parseLong(scheduleId);
        ScheduleItem newSched = new ScheduleItem(null, courseId, enrollCode, userId, castId);
        ScheduleItem savedSched = scheduleItemRepository.save(newSched);
        return ResponseEntity.ok().body(mapper.writeValueAsString(savedSched));
    }

    //Stub
    @DeleteMapping(value = "/delete", produces = "application/json")
    public ResponseEntity<String> removeScheduleItem(@RequestHeader("Authorization") String authorization,
                                                     @RequestParam String id){
        if(!authControllerAdvice.getIsMember(authorization)){
            return new ResponseEntity<String>("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }
        AppUser user = authControllerAdvice.getUser(authorization);
        String userId = String.valueOf(user.getId());
        Long castId = Long.parseLong(id);
        Optional<ScheduleItem> s1 = scheduleItemRepository.findById(castId);
        if(s1.isPresent()){
            if(s1.get().getUserId().equals(userId)) {
                scheduleItemRepository.deleteById(castId);
                return ResponseEntity.ok().build();
            }
            else{
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/getByScheduleId", produces = "application/json")
    public ResponseEntity<String> getScheduleItemsByScheduleId(@RequestHeader("Authorization") String authorization,
                                                               @RequestParam String scheduleId) throws JsonProcessingException {
        if(!authControllerAdvice.getIsMember(authorization)){
            return new ResponseEntity<String>("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }
        AppUser user = authControllerAdvice.getUser(authorization);
        String userId = String.valueOf(user.getId());
        Long castId = Long.parseLong(scheduleId);
        List<ScheduleItem> savedSched= scheduleItemRepository.findByScheduleId(castId);
        Optional<Schedule> sched = scheduleRepository.findById(castId);
        if (sched.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        String res = "";
        for (ScheduleItem item: savedSched){
            if (item.getUserId().equals(userId)) {
                Optional<Course> course = archivedCourseRepository.findOneByQuarterAndCourseId(sched.get().getQuarter(), item.getCourseId());
                if (course.isEmpty()){
                    return ResponseEntity.noContent().build();
                }
                res = res.concat("{courseId= '"+course.get().getCourseId()+"', ");
                res = res.concat("title= '"+course.get().getTitle()+"', ");

                for(Section section : course.get().getClassSections()){
                    if(item.getEnrollCode().equals(section.getEnrollCode())){
                        TimeLocation tl = section.getTimeLocations().get(0);
                        res = res.concat("days= '"+tl.getDays()+"', ");
                        res = res.concat("beginTime= '"+tl.getBeginTime()+"', ");
                        res = res.concat("endTime= '"+tl.getEndTime()+"'}");
                    }
                }
                res = res.concat("!");
            }
            else{return ResponseEntity.badRequest().build();}
        }
        if (res.length() == 0){return ResponseEntity.noContent().build();}
        return ResponseEntity.ok().body(res.substring(0,res.length()-1));
    }

    @GetMapping(value = "/get", produces = "application/json")
    public ResponseEntity<String> getScheduleItemById(@RequestHeader("Authorization") String authorization,
                                                      @RequestParam String id) throws JsonProcessingException {
        AppUser user = authControllerAdvice.getUser(authorization);
        String userId = String.valueOf(user.getId());
        Long castId = Long.parseLong(id);
        if(!authControllerAdvice.getIsMember(authorization)){
            return new ResponseEntity<String>("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }
        Optional<ScheduleItem> savedSched = scheduleItemRepository.findById(castId);
        if (savedSched.isPresent() && savedSched.get().getUserId().equals(userId)) {
            String body = savedSched.get().toString();
            return ResponseEntity.ok().body(mapper.writeValueAsString(savedSched.get()));
        }
        return ResponseEntity.badRequest().build();
    }


    @DeleteMapping(value = "/deleteByScheduleId", produces = "application/json")
    public ResponseEntity<String> removeScheduleItemsByScheduleId(@RequestHeader("Authorization") String authorization,
                                                                  @RequestParam String scheduleId){
        AppUser user = authControllerAdvice.getUser(authorization);
        String userId = String.valueOf(user.getId());
        if(!authControllerAdvice.getIsMember(authorization)){
            return new ResponseEntity<String>("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }
        Long castId = Long.parseLong(scheduleId);
        List<ScheduleItem> savedSched= scheduleItemRepository.findByScheduleId(castId);
        boolean verified = true;
        for (ScheduleItem item: savedSched){
            if (!item.getUserId().equals(userId)){
                verified = false;
            }
        }
        if (verified) {
            scheduleItemRepository.deleteByScheduleId(castId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }


}