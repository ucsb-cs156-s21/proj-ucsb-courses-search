package edu.ucsb.courses.controllers;

import edu.ucsb.courses.config.SecurityConfig;
import edu.ucsb.courses.documents.Course;
import edu.ucsb.courses.documents.CoursePage;

import edu.ucsb.courses.documents.statistics.DivisionOccupancy;
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
    public void test_courseCount() throws Exception {
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
    public void test_courseOccupancyByDivision1() throws Exception {
        List<DivisionOccupancy> expectedResult = new ArrayList<DivisionOccupancy>();
        String url = "/api/public/statistics/courseOccupancyByDivision";

        org.bson.Document fakeRawResults = new org.bson.Document();
        List<DivisionOccupancy> qdList = new ArrayList<DivisionOccupancy>();
        qdList.add(new DivisionOccupancy("20204","MATRIX ANLYSIS COMP","CMPSC 211A", "22", "23"));
        qdList.add(new DivisionOccupancy("20204","PDE'S FINITE ELEM","CMPSC 211D", "1", "5"));
        qdList.add(new DivisionOccupancy("20204","OPERATING SYSTEMS","CMPSC 270", "19", "35"));
        qdList.add(new DivisionOccupancy("20204","ADV DIST SYS","CMPSC 271", "29", "35"));
        qdList.add(new DivisionOccupancy("20204","SPEC TOP APPS DATA","CMPSC 291D", "26", "40"));
        qdList.add(new DivisionOccupancy("20204","SPEC TOP FOUN PROG","CMPSC 292C", "13", "25"));
        qdList.add(new DivisionOccupancy("20204","SPEC TOP FOUN GEN","CMPSC 292F", "25", "30"));
        qdList.add(new DivisionOccupancy("20204","SPEC TOPICS CS FOUN","CMPSC 292G", "10", "25"));
        qdList.add(new DivisionOccupancy("20204","SPEC TOP SYS GEN","CMPSC 293S", "33", "50"));
        
        
        AggregationResults<DivisionOccupancy> fakeResults = new AggregationResults<DivisionOccupancy>(qdList, fakeRawResults);

        when(mongoTemplate.aggregate( any(Aggregation.class), eq("courses"), any(Class.class))).thenReturn(fakeResults);


        MvcResult response = mockMvc.perform(get(url).queryParam("startQuarter", "20204").queryParam("endQuarter", "20204")
            .queryParam("department", "CMPSC").queryParam("level", "G").contentType("application/json")).andExpect(status().isOk())
            .andReturn();
        String responseString = response.getResponse().getContentAsString();
        List<DivisionOccupancy> resultFromPage = DivisionOccupancy.listFromJSON(responseString);

        assertEquals(qdList, resultFromPage);
    }

    @Test
    public void test_courseOccupancyByDivision2() throws Exception {
        List<DivisionOccupancy> expectedResult = new ArrayList<DivisionOccupancy>();
        String url = "/api/public/statistics/courseOccupancyByDivision";

        org.bson.Document fakeRawResults = new org.bson.Document();
        List<DivisionOccupancy> qdList = new ArrayList<DivisionOccupancy>();
        qdList.add(new DivisionOccupancy("20204","INTRO TO COMP SCI","CMPSC 8", "121", "100"));
        qdList.add(new DivisionOccupancy("20204","INTERMEDIATE PYTHON","CMPSC 9", "65", "70"));
        qdList.add(new DivisionOccupancy("20204","PROBLEM SOLVING I","CMPSC 16", "108", "109"));
        qdList.add(new DivisionOccupancy("20204","PROBLEM SOLVING II","CMPSC 271", "57", "70"));
        qdList.add(new DivisionOccupancy("20204","OBJ ORIENT DESIGN","CMPSC 32", "85", "90"));
        qdList.add(new DivisionOccupancy("20204","FOUNDATION COMP SCI","CMPSC 40", "80", "85"));
        qdList.add(new DivisionOccupancy("20204","COMP ORGANIZATION","CMPSC 64", "90", "91"));
        qdList.add(new DivisionOccupancy("20204","SPECIAL TOPICS","CMPSC 90DA", "45", "80"));
        qdList.add(new DivisionOccupancy("20204","INT COMPUTAT SCI","CMPSC 111", "83", "90"));
        qdList.add(new DivisionOccupancy("20204","DATA STRUCT ALGOR","CMPSC 130A", "88", "95"));
        qdList.add(new DivisionOccupancy("20204","DATA STRUCT ALG II","CMPSC 130B", "90", "96"));
        qdList.add(new DivisionOccupancy("20204","COMP SCI PROJECT","CMPSC 148", "23", "65"));
        qdList.add(new DivisionOccupancy("20204","HRDW/SFTW INTERFACE","CMPSC 153A", "9", "21"));
        qdList.add(new DivisionOccupancy("20204","ADV APP PROGRAM","CMPSC 156", "66", "62"));
        qdList.add(new DivisionOccupancy("20204","TRANS PROG LANG","CMPSC 160", "85", "80"));
        qdList.add(new DivisionOccupancy("20204","ARTIF INTELLIGENCE","CMPSC 165A", "33", "105"));
        qdList.add(new DivisionOccupancy("20204","MACHINE LEARNING","CMPSC 165B", "27", "50"));
        qdList.add(new DivisionOccupancy("20204","OPERATING SYSTEMS","CMPSC 170", "60", "70"));
        qdList.add(new DivisionOccupancy("20204","COMP COMM NETWORKS","CMPSC 176A", "100", "120"));
        qdList.add(new DivisionOccupancy("20204","MOBILE APP DEV","CMPSC 184", "57", "60"));
        qdList.add(new DivisionOccupancy("20204","SR CMPTR PRJCT","CMPSC 189A", "49", "50"));
        qdList.add(new DivisionOccupancy("20204","SP TOP: FOUNDATIONS","CMPSC 190A", "37", "50"));
        qdList.add(new DivisionOccupancy("20204","SPECIAL TOPICS","CMPSC 190DD", "37", "80"));
        qdList.add(new DivisionOccupancy("20204","INTELL & INTERACT","CMPSC 190I", "45", "50"));
        qdList.add(new DivisionOccupancy("20204","SP TOP: GENERAL","CMPSC 190J", "12", "4"));
        
        
        AggregationResults<DivisionOccupancy> fakeResults = new AggregationResults<DivisionOccupancy>(qdList, fakeRawResults);

        when(mongoTemplate.aggregate( any(Aggregation.class), eq("courses"), any(Class.class))).thenReturn(fakeResults);


        MvcResult response = mockMvc.perform(get(url).queryParam("startQuarter", "20204").queryParam("endQuarter", "20204")
            .queryParam("department", "CMPSC").queryParam("level", "U").contentType("application/json")).andExpect(status().isOk())
            .andReturn();
        String responseString = response.getResponse().getContentAsString();
        List<DivisionOccupancy> resultFromPage = DivisionOccupancy.listFromJSON(responseString);
      
        assertEquals(qdList, resultFromPage);
    }

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
