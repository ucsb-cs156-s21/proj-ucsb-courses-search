package edu.ucsb.courses.controllers;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.unwind;

import java.util.List;

import org.bson.Document;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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


import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.ucsb.courses.documents.statistics.DivisionOccupancy;
import edu.ucsb.courses.documents.statistics.QuarterDept;


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
            MatchOperation onlySections = match(Criteria.where("index").ne(0));
            GroupOperation groupOperation = group("_id", "$quarter", "title").sum("$classSections.enrolledTotal").as("enrolled")
                    .sum("$classSections.maxEnroll").as("maxEnrolled");
            ProjectionOperation project = project("_id","quarter", "title", "enrolled", "maxEnrolled");
            SortOperation sort = sort(Sort.by(Direction.ASC, "_id"));

            Aggregation aggregation = newAggregation(matchOperation, unwindOperation, onlySections, groupOperation, project, sort);

            AggregationResults<DivisionOccupancy> result = mongoTemplate.aggregate(aggregation, "courses",
                DivisionOccupancy.class);
            List<DivisionOccupancy> divOc = result.getMappedResults();

            logger.info("divOc={}", divOc);
            String body = mapper.writeValueAsString(divOc);

            return ResponseEntity.ok().body(body);

            
    }
}
