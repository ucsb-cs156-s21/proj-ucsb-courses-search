package edu.ucsb.courses.controllers;

import edu.ucsb.courses.config.SecurityConfig;
import edu.ucsb.courses.repositories.ScheduleRepository;
import edu.ucsb.courses.entities.Schedule;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// @Import(SecurityConfig.class) applies the security rules 
// so that /api/public/** endpoints don't require authentication.
// Otherwise you may get authorization errors when running the test

@WebMvcTest(value = ScheduleController.class)
@Import(SecurityConfig.class)
public class ScheduleControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ScheduleRepository scheduleRepository;

    @Test
    public void test_getScheduleSuccess() throws Exception {

        String expectedResult = "Schedule[ id=1, name=CS 156, description=Adv App Programming, quarter=Fall 2020, userId=s ]";
        String urlTemplate = "/api/public/getSchedule?id=%s";
        String url = String.format(urlTemplate, "1");

        Schedule schedule = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "s");

        Optional<Schedule> opt = Optional.of(schedule);

        when(scheduleRepository.findById(any(Long.class)))
                .thenReturn(opt);

        MvcResult response = mockMvc.perform(get(url).contentType("application/json")).andExpect(status().isOk())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedResult, responseString);
    }

    @Test
    public void test_getScheduleFailureNoSchedule() throws Exception {
        String expectedResult = "";
        String urlTemplate = "/api/public/getSchedule?id=%s";
        String url = String.format(urlTemplate, "1");

        //Schedule schedule = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "s");

        Optional<Schedule> opt = Optional.empty();

        when(scheduleRepository.findById(any(Long.class)))
                .thenReturn(opt);

        MvcResult response = mockMvc.perform(get(url).contentType("application/json")).andExpect(status().isBadRequest())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedResult, responseString);
    }

    @Test
    public void test_createScheduleSuccess() throws Exception {
        String expectedResult = "Schedule[ id=1, name=CS 156, description=Adv App Programming, quarter=Fall 2020, userId=s ]";
        String urlTemplate = "/api/public/createSchedule?name=%s&description=%s&quarter=%s&userId=%s";
        String url = String.format(urlTemplate, "CS 156", "Adv App Programming", "Fall 2020", "s");

        Schedule schedule = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "s");

        when(scheduleRepository.save(any(Schedule.class)))
                .thenReturn(schedule);

        MvcResult response = mockMvc.perform(get(url).contentType("application/json")).andExpect(status().isOk())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedResult, responseString);
    }

    @Test
    public void test_deleteScheduleSuccess() throws Exception {
        String expectedResult = "";
        String urlTemplate = "/api/public/deleteSchedule?id=%s";
        String url = String.format(urlTemplate, "1");

        Schedule schedule = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "s");

        //when(scheduleRepository.deleteById(any(Long.class))).then(doNothing());\
        //doNothing().when(scheduleRepository.deleteById(any(Long.class)));

        MvcResult response = mockMvc.perform(get(url).contentType("application/json")).andExpect(status().isOk())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedResult, responseString);
    }





}
