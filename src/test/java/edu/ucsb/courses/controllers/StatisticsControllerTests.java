package edu.ucsb.courses.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import edu.ucsb.courses.config.SecurityConfig;
import edu.ucsb.courses.documents.Course;
import edu.ucsb.courses.documents.statistics.QuarterDept;

// @Import(SecurityConfig.class) applies the security rules 
// so that /api/public/** endpoints don't require authentication.
// Otherwise you may get authorization errors when running the test

@WebMvcTest(value = StatisticsController.class)
@Import(SecurityConfig.class)
public class StatisticsControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MongoTemplate mongoTemplate;

    @Test
    public void test_basicSearch() throws Exception {
        List<Course> expectedResult = new ArrayList<Course>();
        String url = "/api/public/statistics/courseCount";

        org.bson.Document fakeRawResults = new org.bson.Document();
        List<QuarterDept> qdList = new ArrayList<QuarterDept>();
        qdList.add(new QuarterDept("20204","CMPSC",10));
        AggregationResults<QuarterDept> fakeResults = new AggregationResults<QuarterDept>(qdList, fakeRawResults);

        when(mongoTemplate.aggregate( any(Aggregation.class), eq("courses"), any(Class.class))).thenReturn(fakeResults);


        MvcResult response = mockMvc.perform(get(url).contentType("application/json")).andExpect(status().isOk())
                .andReturn();
        String responseString = response.getResponse().getContentAsString();
        List<QuarterDept> resultFromPage = QuarterDept.listFromJSON(responseString);

        assertEquals(qdList, resultFromPage);
    }

}
