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
import edu.ucsb.courses.documents.statistics.FullCourse;
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

    @Test
    public void test_numFullCoursesByDept() throws Exception {
        List<FullCourse> expectedResult = new ArrayList<FullCourse>();
        String url = "/api/public/statistics/fullCoursesByDept";

        org.bson.Document fakeRawResults = new org.bson.Document();
        List<FullCourse> qdList = new ArrayList<FullCourse>();
        qdList.add(new FullCourse("20204","SP TOP: GENERAL","CMPSC 190J"));
        qdList.add(new FullCourse("20204","TRANS PROG LANG","CMPSC 160"));
        qdList.add(new FullCourse("20204","ADV APP PROGRAM","CMPSC 156"));
        qdList.add(new FullCourse("20204","INTRO TO COMP SCI","CMPSC 8"));
        qdList.add(new FullCourse("20211","HUM-COMP INTERACT","CMPSC 185"));
        qdList.add(new FullCourse("20211","COMPUTER GRAPHICS","CMPSC 180"));
        qdList.add(new FullCourse("20211","DISTRD SYSTEMS","CMPSC 171"));
        qdList.add(new FullCourse("20211","OPERATING SYSTEMS","CMPSC 170"));
        qdList.add(new FullCourse("20211","COMPUTER ARCHITECT","CMPSC 154"));
        AggregationResults<FullCourse> fakeResults = new AggregationResults<FullCourse>(qdList, fakeRawResults);

        when(mongoTemplate.aggregate( any(Aggregation.class), eq("courses"), any(Class.class))).thenReturn(fakeResults);


        MvcResult response = mockMvc.perform(get(url).queryParam("startQuarter", "20204").queryParam("endQuarter", "20211")
            .queryParam("department", "CMPSC").contentType("application/json")).andExpect(status().isOk())
            .andReturn();
        String responseString = response.getResponse().getContentAsString();
        List<FullCourse> resultFromPage = FullCourse.listFromJSON(responseString);

        assertEquals(qdList, resultFromPage);
    }

}
