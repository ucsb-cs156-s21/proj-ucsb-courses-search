package edu.ucsb.courses.controllers;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ucsb.courses.repositories.ScheduleRepository;
import edu.ucsb.courses.entities.Schedule;

@WebMvcTest(value = ScheduleController.class)
@WithMockUser
public class ScheduleControllerTests {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  ScheduleRepository mockScheduleRepository;

  private String userToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";
  }

  @Test
    public void testUpdateSchedule_scheduleExists_updateValues() throws Exception {
      Schedule inputSchedule = new Schedule(1L,"CS 156", "New", "Fall 2020", "123456");
      Schedule savedSchedule = new Schedule(1L,"CS 156", "Old", "Fall 2020", "123456");
      String body = objectMapper.writeValueAsString(inputSchedule);

      when(mockScheduleRepository.findById(any(Long.class))).thenReturn(Optional.of(savedSchedule));
      when(mockScheduleRepository.save(inputSchedule)).thenReturn(inputSchedule);
      MvcResult response =
          mockMvc
              .perform(put("/api/public/updateSchedule?id=1&name=CS 156&description=New&quarter=Fall 2020&userId=123456").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                  .characterEncoding("utf-8")
                  .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
              .andExpect(status().isOk()).andReturn();

      verify(mockScheduleRepository, times(1)).findById(inputSchedule.getId());
      verify(mockScheduleRepository, times(1)).save(inputSchedule);

      String responseString = response.getResponse().getContentAsString();

      assertEquals(body, responseString);
    }

  @Test
    public void testUpdateSchedule_ScheduleNotFound() throws Exception {
      Schedule inputSchedule = new Schedule(1L,"CS 156", "New", "Fall 2020", "123456");
      String body = objectMapper.writeValueAsString(inputSchedule);

      when(mockScheduleRepository.findById(1L)).thenReturn(Optional.empty());
      mockMvc.perform(put("/api/public/updateSchedule?id=1&name=CS 156&description=New&quarter=Fall 2020&userId=123456").with(csrf()).contentType(MediaType.APPLICATION_JSON)
          .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
          .content(body)).andExpect(status().isNotFound()).andReturn();
      verify(mockScheduleRepository, times(1)).findById(1L);
      verify(mockScheduleRepository, times(0)).save(any(Schedule.class));
    }

  @Test
  public void testUpdateTodo_todoAtPathOwned_butTryingToInjectTodoForAnotherUser()
      throws Exception {
    Schedule inputSchedule = new Schedule(1L,"CS 156", "New trying to inject at user id 654321", "Fall 2020", "123456");
    Schedule savedSchedule = new Schedule(1L,"CS 156", "Old", "Fall 2020", "NOT YOURS");
    String body = objectMapper.writeValueAsString(inputSchedule);
    when(mockScheduleRepository.findById(any(Long.class))).thenReturn(Optional.of(savedSchedule));
    mockMvc.perform(put("/api/public/updateSchedule?id=1&name=CS 156&description=New trying to inject from user id 123456&quarter=Fall 2020").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
        .content(body)).andExpect(status().isBadRequest()).andReturn();
    verify(mockScheduleRepository, times(1)).findById(1L);
    verify(mockScheduleRepository, times(0)).save(any(Schedule.class));
  }

  @Test
  public void testGetSchedule() throws Exception {
    Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "123456");
    Optional<Schedule> expectedSchedules = Optional.of(s1);

    when(mockScheduleRepository.findById(1L)).thenReturn(expectedSchedules);
    MvcResult response =
        mockMvc
            .perform(get("/api/public/getSchedule?id=1").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isOk()).andReturn();

    verify(mockScheduleRepository, times(1)).findById(1L);

    String responseString = response.getResponse().getContentAsString();
    Schedule returnVal = objectMapper.readValue(responseString, Schedule.class);
    assertEquals(returnVal, s1);
  }

  @Test
  public void testGetScheduleNotExist() throws Exception {
    Optional<Schedule> expectedSchedules = Optional.empty();
    String expectedResult = "";
    when(mockScheduleRepository.findById(any(Long.class))).thenReturn(expectedSchedules);
    MvcResult response =
        mockMvc
            .perform(get("/api/public/getSchedule?id=1").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isBadRequest()).andReturn();

    verify(mockScheduleRepository, times(1)).findById(1L);

    String responseString = response.getResponse().getContentAsString();
    
    assertEquals(expectedResult, responseString);
  }

  @Test
  public void testGetScheduleNoAuth() throws Exception {
    Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "NOT YOURS");
    Optional<Schedule> expectedSchedules = Optional.of(s1);
    String expectedResult = "";
    when(mockScheduleRepository.findById(any(Long.class))).thenReturn(expectedSchedules);
    MvcResult response =
        mockMvc
            .perform(get("/api/public/getSchedule?id=1").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isBadRequest()).andReturn();

    verify(mockScheduleRepository, times(1)).findById(1L);

    String responseString = response.getResponse().getContentAsString();
    
    assertEquals(expectedResult, responseString);
  }

  @Test
    public void testGetSchedules() throws Exception {
      Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "123456");
      Schedule s2 = new Schedule(2L,"CS 156", "Adv App Programming", "Fall 2020", "123456");
      List<Schedule> schedules = new ArrayList<Schedule>();
      schedules.add(s1);
      schedules.add(s2);

      when(mockScheduleRepository.findByUserId("123456")).thenReturn(schedules);
      MvcResult response =
          mockMvc
              .perform(get("/api/public/getSchedules").contentType("application/json")
                  .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
              .andExpect(status().isOk()).andReturn();

      verify(mockScheduleRepository, times(1)).findByUserId("123456");

      String responseString = response.getResponse().getContentAsString();
      String[] returnVal = responseString.split("!");
      Schedule r1 = objectMapper.readValue(returnVal[0],Schedule.class);
      Schedule r2 = objectMapper.readValue(returnVal[1],Schedule.class);

      assertEquals(s1, r1);
      assertEquals(s2,r2);
    }

  @Test
    public void testGetSchedulesNoContent() throws Exception {
      List<Schedule> schedules = new ArrayList<Schedule>();
      String expectedResult = "";
      when(mockScheduleRepository.findByUserId("123456")).thenReturn(schedules);
      MvcResult response =
          mockMvc
              .perform(get("/api/public/getSchedules").contentType("application/json")
                  .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
              .andExpect(status().isNoContent()).andReturn();

      verify(mockScheduleRepository, times(1)).findByUserId("123456");

      String responseString = response.getResponse().getContentAsString();

      assertEquals(responseString, expectedResult);
    }

  @Test
    public void testCreateSchedule() throws Exception {
      Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "123456");
      when(mockScheduleRepository.save(any(Schedule.class))).thenReturn(s1);
      MvcResult response = mockMvc
          .perform(post("/api/public/createSchedule?name=CS 156&description=Adv App Programming&quarter=Fall 2020&userId=123456").with(csrf()).contentType(MediaType.APPLICATION_JSON)
              .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
          .andExpect(status().isOk()).andReturn();


      String responseString = response.getResponse().getContentAsString();
      //String expectedString = "Schedule[ id=1, name=CS 156, description=Adv App Programming, quarter=Fall 2020, userId=123456 ]";
      Schedule returnVal = objectMapper.readValue(responseString, Schedule.class);
      assertEquals(returnVal, s1);
    }

  @Test
    public void testGetScheduleFailure() throws Exception {
      Optional<Schedule> expectedSchedules = Optional.empty();

      when(mockScheduleRepository.findById(1L)).thenReturn(expectedSchedules);
      MvcResult response =
          mockMvc
              .perform(get("/api/public/getSchedule?id=1").contentType("application/json")
                  .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
              .andExpect(status().isBadRequest()).andReturn();

      verify(mockScheduleRepository, times(1)).findById(1L);

      String responseString = response.getResponse().getContentAsString();
      String actualString = "";
      assertEquals(actualString, responseString);
    }

@Test
    public void testDeleteSchedule_scheduleExists() throws Exception {
      Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "123456");
      when(mockScheduleRepository.findById(1L)).thenReturn(Optional.of(s1));
      MvcResult response = mockMvc
          .perform(delete("/api/public/deleteSchedule?id=1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
              .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
          .andExpect(status().isNoContent()).andReturn();
      verify(mockScheduleRepository, times(1)).findById(s1.getId());
      verify(mockScheduleRepository, times(1)).deleteById(s1.getId());

      String responseString = response.getResponse().getContentAsString();

      assertEquals(responseString.length(), 0);
    }
  
@Test
  public void testDeleteSchedule_scheduleNotFound() throws Exception {
    long id = 1L;
    when(mockScheduleRepository.findById(id)).thenReturn(Optional.empty());
    mockMvc
        .perform(delete("/api/public/deleteSchedule?id=1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isNotFound()).andReturn();
    verify(mockScheduleRepository, times(1)).findById(id);
    verify(mockScheduleRepository, times(0)).deleteById(id);
  }

@Test
  public void testDeleteTodo_NotOwned() throws Exception {
    Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "NOT YOURS");
    when(mockScheduleRepository.findById(s1.getId())).thenReturn(Optional.of(s1));
    mockMvc
        .perform(delete("/api/public/deleteSchedule?id=1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isNotFound()).andReturn();
    verify(mockScheduleRepository, times(1)).findById(s1.getId());
    verify(mockScheduleRepository, times(0)).deleteById(s1.getId());
  }
}
