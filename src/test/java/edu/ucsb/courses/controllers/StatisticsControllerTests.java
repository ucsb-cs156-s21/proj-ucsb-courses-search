package edu.ucsb.courses.controllers;

import edu.ucsb.courses.config.SecurityConfig;
import edu.ucsb.courses.documents.Course;
import edu.ucsb.courses.documents.CoursePage;
import edu.ucsb.courses.documents.statistics.QuarterDept;
import edu.ucsb.courses.documents.statistics.AvgClassSize;
import edu.ucsb.courses.repositories.ArchivedCourseRepository;

import org.bson.Document;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

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
    public void test_AvgClassSize() throws Exception {
        String url = "/api/public/statistics/classSize";

        org.bson.Document fakeRawResults = new org.bson.Document();
        List<AvgClassSize> qdList = new ArrayList<AvgClassSize>();
        qdList.add(new AvgClassSize("20204", 52));
        AggregationResults<AvgClassSize> fakeResults = new AggregationResults<AvgClassSize>(qdList,
                fakeRawResults);

        when(mongoTemplate.aggregate(any(Aggregation.class), eq("courses"), any(Class.class))).thenReturn(fakeResults);

        MvcResult response = mockMvc
                .perform(get(url).queryParam("startQuarter", "20204").queryParam("endQuarter", "20211")
                        .contentType("application/json"))
                .andExpect(status().isOk()).andReturn();
        String responseString = response.getResponse().getContentAsString();
        List<AvgClassSize> resultFromPage = AvgClassSize.listFromJSON(responseString);

        assertEquals(qdList, resultFromPage);
    }

}
