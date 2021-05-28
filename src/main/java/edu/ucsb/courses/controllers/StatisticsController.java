package edu.ucsb.courses.controllers;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.unwind;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.limit;

import java.lang.String;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;
import java.util.HashMap;

import java.util.List;

import com.fasterxml.jackson.databind.deser.DataFormatReaders;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import edu.ucsb.courses.documents.statistics.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.aggregation.UnwindOperation;

import org.springframework.data.mongodb.core.aggregation.ConditionalOperators;
import org.springframework.data.mongodb.core.aggregation.LimitOperation;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import edu.ucsb.courses.documents.statistics.FullCourse;

import edu.ucsb.courses.documents.statistics.DivisionOccupancy;

import edu.ucsb.courses.documents.statistics.AggregateStatistics;

import edu.ucsb.courses.documents.statistics.SingleCourseSearch;

import edu.ucsb.courses.documents.Course;
import edu.ucsb.courses.documents.CoursePage;
import edu.ucsb.courses.documents.Section;
import edu.ucsb.courses.documents.Instructor;

import edu.ucsb.courses.repositories.ArchivedCourseRepository;

import com.mongodb.client.model.Accumulators;   
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Sorts;


import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.aggregation.UnwindOperation;
import org.springframework.data.mongodb.core.query.Criteria;

@RestController
@RequestMapping("/api/public/statistics")
public class StatisticsController {
    private final Logger logger = LoggerFactory.getLogger(StatisticsController.class);
    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private ArchivedCourseRepository courseRepository;
    
    @GetMapping(value = "/courseCount", produces = "application/json")
    public ResponseEntity<String> courseCount() 
        throws JsonProcessingException, Exception {

        SortOperation sortByQuarterAndDeptCode = sort(Sort.by(Direction.DESC, "quarter")).and(Sort.by(Direction.ASC, "deptCode"));

        GroupOperation groupByQuarterAndDeptCode = group("quarter","deptCode").count().as("courseCount");

        Aggregation aggregation = newAggregation(groupByQuarterAndDeptCode, sortByQuarterAndDeptCode);

        AggregationResults<QuarterDept> result = 
            mongoTemplate.aggregate(aggregation, "courses", QuarterDept.class);

        List<QuarterDept> qds = result.getMappedResults();

        logger.info("qds={}",qds);
        String body = mapper.writeValueAsString(qds);
        return ResponseEntity.ok().body(body);

    }

    @GetMapping(value = "/courseOccupancyByDivision", produces = "application/json")
    public ResponseEntity<String> courseOccupancyByDivision( 
        @RequestParam(required=true) String startQuarter,
        @RequestParam(required=true) String endQuarter,
        @RequestParam(required=true) String department,
        @RequestParam(required=true) String level)
        throws JsonProcessingException {
            MatchOperation matchOperation = match(Criteria.where("quarter").gte(startQuarter).lte(endQuarter)
                .and("deptCode").is(department).and("instructionType").is("LEC").and("objLevelCode").is(level));
            UnwindOperation unwindOperation = unwind("$classSections", "index", false);
            MatchOperation sectionOrLect = null;     

            if(level.equals("U")) {
                sectionOrLect = match(Criteria.where("index").ne(0).and("classSections.enrolledTotal").ne(null));
            }else {
                sectionOrLect = match(Criteria.where("index").ne(-1).and("classSections.enrolledTotal").ne(null));
            }

            GroupOperation groupOperation = group("_id", "$quarter", "title", "courseId").sum("$classSections.enrolledTotal").as("enrolled").sum("$classSections.maxEnroll").as("maxEnrolled");
            ProjectionOperation project = project("_id","quarter", "title", "courseId", "enrolled", "maxEnrolled");
            SortOperation sort = sort(Sort.by(Direction.ASC, "_id"));
            SortOperation quarterSort = sort(Sort.by(Direction.ASC, "quarter"));

            Aggregation aggregation = newAggregation(matchOperation, unwindOperation, sectionOrLect, groupOperation, project, sort, quarterSort);

            AggregationResults<DivisionOccupancy> result = mongoTemplate.aggregate(aggregation, "courses",
                DivisionOccupancy.class);
            List<DivisionOccupancy> divOc = result.getMappedResults();

            logger.info("divOc={}", divOc);
            String body = mapper.writeValueAsString(divOc);

            return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/fullCoursesByDept", produces = "application/json")
    public ResponseEntity<String> numFullCoursesByDept(@RequestParam(required = true) String startQuarter, @RequestParam(required = true) String endQuarter, @RequestParam(required = true) String department)
            throws JsonProcessingException {

        String body = mapper.writeValueAsString(courseRepository.findFullCoursesByQuarterIntervalAndDepartment(startQuarter, endQuarter, department));

        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/classSize", produces = "application/json")
    public ResponseEntity<String> classSize(@RequestParam(required = true) String startQuarter, @RequestParam(required = true) String endQuarter)
            throws JsonProcessingException {
        MatchOperation matchOperation = match(Criteria.where("quarter").gte(startQuarter).lte(endQuarter));
        
        UnwindOperation unwindOperation = unwind("$classSections", "index", false);
        
        MatchOperation onlyLectures = match(Criteria.where("index").is(0));

        MatchOperation onlyValidLecs = match(Criteria.where("classSections.enrolledTotal").ne(null).and("classSections.maxEnroll").ne(0));

        GroupOperation groupOperation = group("$deptCode").avg("$classSections.maxEnroll").as("avgClassSize");
       
        SortOperation numberSort = sort(Sort.by(Direction.ASC, "avgClassSize"));


        Aggregation aggregation = newAggregation(matchOperation, unwindOperation, onlyLectures, onlyValidLecs, groupOperation,numberSort);

        AggregationResults<AvgClassSize> result = mongoTemplate.aggregate(aggregation, "courses",
                AvgClassSize.class);
        List<AvgClassSize> qo = result.getMappedResults();
                
        String body = mapper.writeValueAsString(qo);

        return ResponseEntity.ok().body(body);
    }
    
    @GetMapping(value = "/courseOccupancy", produces = "application/json")
    public ResponseEntity<String> courseOccupancy(@RequestParam(required = true) String startQuarter, @RequestParam(required = true) String endQuarter, @RequestParam(required = true) String department)
            throws JsonProcessingException {

        String body = mapper.writeValueAsString(courseRepository.findOccupancyByQuarterIntervalAndDepartment(startQuarter, endQuarter, department));

        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/aggregateStatistics", produces = "application/json")
    public ResponseEntity<String> AggregateStatistics( 
        @RequestParam(required=true) String startQuarter,
        @RequestParam(required=true) String endQuarter)
        throws JsonProcessingException {

        String body = mapper.writeValueAsString(courseRepository.findAggregateStatisticsByQuarterInterval(startQuarter, endQuarter));

        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/openCourses", produces = "application/json")
    public ResponseEntity<String> openCoursesByDept(@RequestParam(required = true) String quarter, @RequestParam(required = true) String department) throws JsonProcessingException{
        String body = mapper.writeValueAsString(courseRepository.findOpenCoursesByDepartment(quarter, department));

        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/totalCourses", produces = "application/json")
    public ResponseEntity<String> totalCourses(@RequestParam(required = true) String quarter) throws JsonProcessingException{
        MatchOperation matchOperation = match(Criteria.where("quarter").is(quarter));
        UnwindOperation unwindOperation = unwind("$classSections", "index", false);

        MatchOperation onlyLectures = match(Criteria.where("index").is(0));
        MatchOperation onlyValidLecs = match(Criteria.where("classSections.enrolledTotal").ne(null).and("classSections.maxEnroll").ne(0));

        GroupOperation groupOperation = group("$deptCode").count().as("totalCourses");

        SortOperation deptSort = sort(Sort.by(Direction.ASC, "_id"));

        Aggregation aggregation = newAggregation(matchOperation, unwindOperation, onlyLectures, onlyValidLecs, groupOperation, deptSort);

        AggregationResults<TotalCoursesDept> result = mongoTemplate.aggregate(aggregation, "courses",
                TotalCoursesDept.class);
        List<TotalCoursesDept> qo = result.getMappedResults();

        String body = mapper.writeValueAsString(qo);

        return ResponseEntity.ok().body(body);
    }
    

    private static String makeFormattedCourseName (
        String department  ,
        String courseNumber ,
        String courseSuf    ) {

        return
              String.format( "%-8s", department                ) // 'CMPSC   '
            + String.format( "%3s" , courseNumber               ) // '  8'
            + String.format( "%-2s", courseSuf.toUpperCase()    ) // 'A '
        ;
    }

    @GetMapping(value = "/singleCourseSearch", produces = "application/json")
    public ResponseEntity<String> singleCourseSearch(@RequestParam(required = true) String startQuarter, @RequestParam(required = true) String endQuarter, 
    @RequestParam(required = true) String department, @RequestParam(required = true) String courseNumber,@RequestParam(required = true) String courseSuf)
            throws JsonProcessingException {

        
        List<Course> courseResults = courseRepository.findByQuarterIntervalAndCourseName (
            startQuarter    ,
            endQuarter      ,
            makeFormattedCourseName(department, courseNumber, courseSuf)
        );
        
        Map<String, String> professorInfo = new HashMap<>();

        for(int i = 0; i < courseResults.size(); i++){
            if(courseResults.get(i).getClassSections().get(0).getInstructors().size() == 0){
                continue;
            }
            String instructor = courseResults.get(i).getClassSections().get(0).getInstructors().get(0).getInstructor();
            if(professorInfo.get(instructor) != null){
                int temp = Integer.parseInt(professorInfo.get(instructor));
                professorInfo.put(instructor, Integer.toString(temp + 1));
            

            //New Professor
            }else{
                professorInfo.put(courseResults.get(i).getClassSections().get(0).getInstructors().get(0).getInstructor(), "1");
            }   
        }

        String body = mapper.writeValueAsString(professorInfo);
        
        return ResponseEntity.ok().body(body);
    }
}