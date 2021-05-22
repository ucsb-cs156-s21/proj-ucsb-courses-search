package edu.ucsb.courses.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import edu.ucsb.courses.advice.AuthControllerAdvice;
import edu.ucsb.courses.documents.Course;
import edu.ucsb.courses.documents.Section;
import edu.ucsb.courses.documents.TimeLocation;
import edu.ucsb.courses.entities.AppUser;
import edu.ucsb.courses.entities.Schedule;
import edu.ucsb.courses.entities.ScheduleItem;
import edu.ucsb.courses.repositories.ScheduleItemRepository;
import edu.ucsb.courses.repositories.ArchivedCourseRepository;
import edu.ucsb.courses.repositories.ScheduleRepository;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;


@WebMvcTest(value = ScheduleItemController.class)
@WithMockUser
public class ScheduleItemControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ScheduleItemRepository scheduleItemRepository;

    @MockBean
    ScheduleRepository scheduleRepository;

    @MockBean
    private ArchivedCourseRepository courseRepo;

    @MockBean
    AuthControllerAdvice authController;

    private String userToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";

    private ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void test_getScheduleItemSuccess() throws Exception {
        String urlTemplate = "/api/member/scheduleItems/get?id=%s";
        String url = String.format(urlTemplate, "1");

        AppUser user = new AppUser();
        user.setId(123456L);

        ScheduleItem scheduleItem = new ScheduleItem(1L, "07492", "07493", user, new Schedule());

        when(authController.getIsMember(any(String.class))).thenReturn(true);
        when(authController.getUser(any(String.class))).thenReturn(user);
        when(scheduleItemRepository.findById(1L)).thenReturn(Optional.of(scheduleItem));

        MvcResult response = mockMvc.perform(get(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isOk())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();
        ScheduleItem returnVal = objectMapper.readValue(responseString,ScheduleItem.class);

        assertEquals(scheduleItem, returnVal);
    }


    @Test
    public void test_getScheduleFailureNoScheduleItem() throws Exception {
        String expectedResult = "";
        String urlTemplate = "/api/member/scheduleItems/get?id=%s";
        String url = String.format(urlTemplate, "1");

        AppUser user = new AppUser();
        user.setId(123456L);

        when(authController.getIsMember(any(String.class))).thenReturn(true);
        when(authController.getUser(any(String.class))).thenReturn(user);

        MvcResult response = mockMvc.perform(get(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isBadRequest())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedResult, responseString);
    }

    @Test
    public void test_getScheduleFailureNoAuth() throws Exception {
        String expectedResult = "";
        String urlTemplate = "/api/member/scheduleItems/get?id=%s";
        String url = String.format(urlTemplate, "1");

        AppUser user = new AppUser();
        user.setId(123456L);

        AppUser user2 = new AppUser();
        user.setId(654321L);

        ScheduleItem scheduleItem = new ScheduleItem(1L, "07492", "07493", user2, new Schedule());

        when(authController.getIsMember(any(String.class))).thenReturn(true);
        when(authController.getUser(any(String.class))).thenReturn(user);
        when(scheduleItemRepository.findById(1L)).thenReturn(Optional.of(scheduleItem));

        MvcResult response = mockMvc.perform(get(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isBadRequest())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedResult, responseString);

    }

    @Test
    public void test_getScheduleFailureNotMember() throws Exception {
        String expectedResult = "Unauthorized Request";
        String urlTemplate = "/api/member/scheduleItems/get?id=%s";
        String url = String.format(urlTemplate, "1");

        when(authController.getIsMember(any(String.class))).thenReturn(false);

        MvcResult response = mockMvc.perform(get(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,1L)).andExpect(status().isUnauthorized())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedResult, responseString);

    }
    
    @Test
    public void test_addScheduleItemSuccess() throws Exception {
        String urlTemplate = "/api/member/scheduleItems/new?discussionCode=%s&lectureCode=%s&scheduleId=%s";
        String url = String.format(urlTemplate, "07493", "07492", "1");

        Schedule schedule = new Schedule(123L, "CS 156", "Adv App Programming", "Fall 2020", "123456");
        AppUser user = new AppUser();
        user.setId(123456L);
        ScheduleItem scheduleItem = new ScheduleItem(1L, "07492", "07493", user, schedule);

        when(authController.getIsMember(any(String.class))).thenReturn(true);
        when(authController.getUser(any(String.class))).thenReturn(user);
        when(scheduleRepository.findById(1L)).thenReturn(Optional.of(schedule));

        when(scheduleItemRepository.save(any(ScheduleItem.class)))
                .thenReturn(scheduleItem);


        MvcResult response = mockMvc.perform(post(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION, userToken)).andExpect(status().isOk())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();
        ScheduleItem returnVal = objectMapper.readValue(responseString, ScheduleItem.class);

        assertEquals(returnVal, scheduleItem);
    }
    
    @Test
    public void test_addScheduleItemFailureNoAuth() throws Exception {
        String urlTemplate = "/api/member/scheduleItems/new?discussionCode=%s&lectureCode=%s&scheduleId=%s";
        String url = String.format(urlTemplate, "1", "1", "2");

        AppUser user = new AppUser();

        when(authController.getIsMember(any(String.class))).thenReturn(false);
        when(authController.getUser(any(String.class))).thenReturn(user);

        MvcResult response = mockMvc.perform(post(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isUnauthorized())
                .andReturn();
    }

    @Test
    public void test_addScheduleItemFailureNotFound() throws Exception {
        String expectedResult = "";
        String urlTemplate = "/api/member/scheduleItems/new?discussionCode=%s&lectureCode=%s&scheduleId=%s";
        String url = String.format(urlTemplate, "1", "1", "2");

        AppUser user = new AppUser();
        user.setId(123456L);

        when(authController.getIsMember(any(String.class))).thenReturn(true);
        when(authController.getUser(any(String.class))).thenReturn(user);

        MvcResult response = mockMvc.perform(post(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isNotFound())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedResult, responseString);
    }

    @Test
    public void test_deleteScheduleItemSuccess() throws Exception {
        String urlTemplate = "/api/member/scheduleItems/delete?id=%s";
        String url = String.format(urlTemplate, "1");

        AppUser user = new AppUser();
        user.setId(123456L);
        ScheduleItem scheduleItem = new ScheduleItem(1L, "07492", "07493", user, new Schedule());

        when(authController.getIsMember(any(String.class))).thenReturn(true);
        when(authController.getUser(any(String.class))).thenReturn(user);
        when(scheduleItemRepository.findById(1L)).thenReturn(Optional.of(scheduleItem));
        
        MvcResult response = mockMvc.perform(delete(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void test_removeScheduleFailureNoAuth() throws Exception {
        String urlTemplate = "/api/member/scheduleItems/delete?id=%s";
        String url = String.format(urlTemplate, "1");

        AppUser user = new AppUser();
        user.setId(123456L);

        when(authController.getIsMember(any(String.class))).thenReturn(false);
        when(authController.getUser(any(String.class))).thenReturn(user);

        MvcResult response = mockMvc.perform(delete(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isUnauthorized())
                .andReturn();
    }

    @Test
    public void test_removeScheduleFailureWrongUser() throws Exception {
        Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "NOT YOURS");
        AppUser user1 = new AppUser();
        user1.setId(654321L);

        ScheduleItem scheduleItem = new ScheduleItem(1L, "07492", "07493", user1, s1);

        AppUser user2 = new AppUser();
        user2.setId(123456L);

        String urlTemplate = "/api/member/scheduleItems/delete?id=%s";
        String url = String.format(urlTemplate, "1");
        
        when(authController.getIsMember(any(String.class))).thenReturn(true);
        when(authController.getUser(any(String.class))).thenReturn(user2);
        when(scheduleItemRepository.findById(1L)).thenReturn(Optional.of(scheduleItem));

        MvcResult response = mockMvc.perform(delete(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isBadRequest())
               .andReturn();
    }

    @Test
    public void test_removeScheduleFailureNotFound() throws Exception {
        String expectedResult = "";
        String urlTemplate = "/api/member/scheduleItems/delete?id=%s";
        String url = String.format(urlTemplate, "1");

        AppUser user = new AppUser();
        user.setId(123456L);
        String userId = String.valueOf(user.getId());

        when(authController.getIsMember(any(String.class))).thenReturn(true);
        when(authController.getUser(any(String.class))).thenReturn(user);

        MvcResult response = mockMvc.perform(delete(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isNotFound())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedResult, responseString);
    }

}