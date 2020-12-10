package edu.ucsb.courses.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ucsb.courses.documents.Course;
import edu.ucsb.courses.documents.Section;
import edu.ucsb.courses.documents.TimeLocation;
import edu.ucsb.courses.entities.Schedule;
import edu.ucsb.courses.entities.ScheduleItem;
import edu.ucsb.courses.repositories.ScheduleItemRepository;
import edu.ucsb.courses.repositories.ArchivedCourseRepository;
import edu.ucsb.courses.repositories.ScheduleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/public")
public class ScheduleItemController {
    private final Logger logger = LoggerFactory.getLogger(BasicSearchController.class);

    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    ScheduleItemRepository scheduleItemRepository;

    @Autowired
    ScheduleRepository scheduleRepository;

    @Autowired
    ArchivedCourseRepository archivedCourseRepository;

    @GetMapping(value = "/addScheduleItem", produces = "application/json")
    public ResponseEntity<String> addScheduleItem(@RequestHeader("Authorization") String authorization,
                                                  @RequestParam String scheduleId,
                                                 @RequestParam String enrollCode,
                                                 @RequestParam String courseId) throws JsonProcessingException {
        Long castId = Long.parseLong(scheduleId);
        ScheduleItem newSched = new ScheduleItem(null, courseId, enrollCode, JWT.decode(authorization.substring(7)).getSubject(), castId);
        ScheduleItem savedSched = scheduleItemRepository.save(newSched);
        return ResponseEntity.ok().body(mapper.writeValueAsString(savedSched));
    }

    //Stub
    @DeleteMapping(value = "/removeScheduleItem", produces = "application/json")
    public ResponseEntity<String> removeScheduleItem(@RequestHeader("Authorization") String authorization,
                                                     @RequestParam String id){
        DecodedJWT jwt = JWT.decode(authorization.substring(7));
        Long castId = Long.parseLong(id);
        Optional<ScheduleItem> s1 = scheduleItemRepository.findById(castId);
        if(s1.isPresent()){
            if(s1.get().getUserId().equals(jwt.getSubject())) {
                scheduleItemRepository.deleteById(castId);
                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/getScheduleItemsByScheduleId", produces = "application/json")
    public ResponseEntity<String> getScheduleItemsByScheduleId(@RequestHeader("Authorization") String authorization,
                                                               @RequestParam String scheduleId) throws JsonProcessingException {
        DecodedJWT jwt = JWT.decode(authorization.substring(7));
        Long castId = Long.parseLong(scheduleId);
        List<ScheduleItem> savedSched= scheduleItemRepository.findByScheduleId(castId);
        Optional<Schedule> sched = scheduleRepository.findById(castId);

        String res = "{";
        for (ScheduleItem item: savedSched){
            if (item.getUserId().equals(jwt.getSubject())) {
                Optional<Course> course = archivedCourseRepository.findOneByQuarterAndCourseId(sched.get().getQuarter(), item.getCourseId());

                // Add course data
                res.concat("courseId= '"+course.get().getCourseId()+"', ");
                res.concat("title= '"+course.get().getTitle()+"', ");

                for(Section section : course.get().getClassSections()){
                    if(item.getEnrollCode().equals(section.getEnrollCode())){
                        TimeLocation tl = section.getTimeLocations().get(0);
                        res.concat("days= '"+tl.getDays()+"', ");
                        res.concat("beginTime= '"+tl.getBeginTime()+"', ");
                        res.concat("endTime= '"+tl.getEndTime()+"'}");
                    }
                }
//                res = res.concat(mapper.writeValueAsString(item) + "!");
            }
        }
        if (res.length() == 0){return ResponseEntity.noContent().build();}
        return ResponseEntity.ok().body(res);
    }

    @GetMapping(value = "/getScheduleItemById", produces = "application/json")
    public ResponseEntity<String> getScheduleItemById(@RequestHeader("Authorization") String authorization,
                                                      @RequestParam String id) throws JsonProcessingException {
        DecodedJWT jwt = JWT.decode(authorization.substring(7));
        Long castId = Long.parseLong(id);
        Optional<ScheduleItem> savedSched = scheduleItemRepository.findById(castId);
        if (savedSched.isPresent() && savedSched.get().getUserId().equals(jwt.getSubject())) {
            String body = savedSched.get().toString();
            return ResponseEntity.ok().body(mapper.writeValueAsString(savedSched.get()));
        }
        return ResponseEntity.badRequest().build();
    }


    @DeleteMapping(value = "/removeScheduleItemsByScheduleId", produces = "application/json")
    public ResponseEntity<String> removeScheduleItemsByScheduleId(@RequestHeader("Authorization") String authorization,
                                                                  @RequestParam String scheduleId){
        DecodedJWT jwt = JWT.decode(authorization.substring(7));
        Long castId = Long.parseLong(scheduleId);
        List<ScheduleItem> savedSched= scheduleItemRepository.findByScheduleId(castId);
        boolean verified = true;
        for (ScheduleItem item: savedSched){
            if (!item.getUserId().equals(jwt.getSubject())){
                verified = false;
            }
        }
        if (verified) {
            scheduleItemRepository.deleteByScheduleId(castId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.noContent().build();
    }


}
