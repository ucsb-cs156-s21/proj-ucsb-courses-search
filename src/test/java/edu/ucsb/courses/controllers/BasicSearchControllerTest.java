package edu.ucsb.courses.controllers;

import edu.ucsb.courses.config.SecurityConfig;
import edu.ucsb.courses.services.UCSBCurriculumService;


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

// @Import(SecurityConfig.class) applies the security rules 
// so that /api/public/** endpoints don't require authentication.
// Otherwise you may get authorization errors when running the test

@WebMvcTest(value = BasicSearchController.class)
@Import(SecurityConfig.class)
public class BasicSearchControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UCSBCurriculumService ucsbCurriculumService;

    @Test
    public void test_basicSearch() throws Exception {

        String expectedResult = "{expectedJSONResult}";
        String urlTemplate = "/api/public/basicsearch?qtr=%s&dept=%s&level=%s";
        String url = String.format(urlTemplate, "20204", "CMPSC", "L");
        when(ucsbCurriculumService.getJSON(any(String.class), any(String.class), any(String.class)))
                .thenReturn(expectedResult);

        MvcResult response = mockMvc.perform(get(url).contentType("application/json")).andExpect(status().isOk())
                .andReturn();
        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedResult, responseString);
    }

}
