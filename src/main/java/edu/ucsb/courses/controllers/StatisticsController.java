package edu.ucsb.courses.controllers;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.unwind;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;

import java.util.List;

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
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import edu.ucsb.courses.documents.statistics.FullCourse;
import edu.ucsb.courses.documents.statistics.QuarterDept;

import com.mongodb.client.model.Accumulators;   
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Sorts;


import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.aggregation.UnwindOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import edu.ucsb.courses.documents.statistics.AvgClassSize;

@RestController
@RequestMapping("/api/public/statistics")
public class StatisticsController {
    private final Logger logger = LoggerFactory.getLogger(StatisticsController.class);
    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private MongoTemplate mongoTemplate;
    
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

    @GetMapping(value = "/fullCoursesByDept", produces = "application/json")
    public ResponseEntity<String> numFullCoursesByDept(
        @RequestParam String startQuarter,
        @RequestParam String endQuarter,
        @RequestParam String department)
        throws JsonProcessingException, Exception {

            MatchOperation filterQuarterDept = match(Criteria.where("quarter").gte(startQuarter).lte(endQuarter)
                .and("deptCode").is(department).and("instructionType").is("LEC"));
            UnwindOperation unwindOperation = unwind("$classSections","arrayIndex", false);
            MatchOperation filterSection = match(Criteria.where("arrayIndex").ne(0));
            GroupOperation groupOperation = group("$_id", "$quarter", "$title", "$courseId").sum("$classSections.enrolledTotal").as("enrolled")
                .sum("$classSections.maxEnroll").as("maxEnrolled");
            ProjectionOperation project = project("_id", "quarter", "title", "courseId", "enrolled", "maxEnrolled").andExpression("maxEnrolled - enrolled").as("diff");
            MatchOperation filterFull = match(Criteria.where("diff").lte(0));
            SortOperation sort = sort(Sort.by(Direction.ASC, "_id"));

            Aggregation aggregation = newAggregation(filterQuarterDept, unwindOperation, filterSection, groupOperation, project, filterFull, sort);

            AggregationResults<FullCourse> result = mongoTemplate.aggregate(aggregation, "courses", FullCourse.class);

            List<FullCourse> fcs = result.getMappedResults();

            logger.info("fcs={}",fcs);
            String body = mapper.writeValueAsString(fcs);


            return ResponseEntity.ok().body(body);

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
}
