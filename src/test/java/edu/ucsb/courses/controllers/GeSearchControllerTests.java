package edu.ucsb.courses.controllers;

import edu.ucsb.courses.config.SecurityConfig;
import edu.ucsb.courses.documents.Course;
import edu.ucsb.courses.documents.CoursePage;
import edu.ucsb.courses.repositories.ArchivedCourseRepository;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

// @Import(SecurityConfig.class) applies the security rules 
// so that /api/public/** endpoints don't require authentication.
// Otherwise you may get authorization errors when running the test

@WebMvcTest(value = GeSearchController.class)
@Import(SecurityConfig.class)
public class GeSearchControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ArchivedCourseRepository archivedCourseRepository;

    @Test
    public void test_GeSearch() throws Exception {
        List<Course> expectedResult = new ArrayList<Course>();
        String urlTemplate = "/api/public/history/gesearch?startQtr=%s&startQtr=%s&geCode=%s";
        String url = String.format(urlTemplate, "20204", "20204", "A1 ");
        when(archivedCourseRepository.findByQuarterIntervalAndGe(any(String.class), any(String.class), any(String.class))).thenReturn(expectedResult);

        MvcResult response = mockMvc.perform(get(url).contentType("application/json")).andExpect(status().isOk())
                .andReturn();
        String responseString = response.getResponse().getContentAsString();

        CoursePage cp = CoursePage.fromJSON(responseString);

        assertEquals(expectedResult, cp.getClasses());
    }

}
