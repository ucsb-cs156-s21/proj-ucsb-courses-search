package edu.ucsb.courses.controllers;



import edu.ucsb.courses.config.SecurityConfig;
import edu.ucsb.courses.repositories.ScheduleRepository;
import edu.ucsb.courses.entities.Schedule;

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
  public void testGetSchedules() throws Exception {
    List<Schedule> expectedSchedules = new ArrayList<Schedule>();
    expectedSchedules.add(new Schedule(1L,"Main", "Most likely schedule", "Fall 2020", "123456"));

    when(mockScheduleRepository.findByUserId("123456")).thenReturn(expectedSchedules);
    MvcResult response =
        mockMvc
            .perform(get("/api/schedules").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isOk()).andReturn();

    verify(mockScheduleRepository, times(1)).findByUserId("123456");

    String responseString = response.getResponse().getContentAsString();
    List<Schedule> actualSchedules =
        objectMapper.readValue(responseString, new TypeReference<List<Schedule>>() {
        });
    assertEquals(actualSchedules, expectedSchedules);
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
  public void testGetSchedule() throws Exception {
    Schedule expectedSchedule = new Schedule(1L,"Main", "Most likely schedule", "Fall 2020", "123456");
    
    when(mockScheduleRepository.findById(1L)).thenReturn(Optional.of(expectedSchedule));
    MvcResult response = mockMvc.perform(get("/api/schedules/1").contentType("application/json")
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

    verify(mockScheduleRepository, times(1)).findById(1L);

    String responseString = response.getResponse().getContentAsString();
    Schedule actualSchedule = objectMapper.readValue(responseString, Schedule.class);
    assertEquals(actualSchedule, expectedSchedule);
  }

  @Test
  public void testCreateSchedule() throws Exception {
    Schedule expectedSchedule = new Schedule(1L,"Main", "Most likely schedule", "Fall 2020", "123456");
    ObjectMapper mapper = new ObjectMapper();
    String requestBody = mapper.writeValueAsString(expectedSchedule);
    when(mockScheduleRepository.save(any())).thenReturn(expectedSchedule);
    MvcResult response = mockMvc
        .perform(post("/api/schedules").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").content(requestBody)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isOk()).andReturn();

    verify(mockScheduleRepository, times(1)).save(expectedSchedule);

    String responseString = response.getResponse().getContentAsString();
    Schedule actualSchedule = objectMapper.readValue(responseString, Schedule.class);
    assertEquals(actualSchedule, expectedSchedule);
  }

  @Test
  public void testDeleteSchedule_scheduleExists() throws Exception {
    Schedule expectedSchedule = new Schedule(1L,"Main", "Most likely schedule", "Fall 2020", "123456");
    when(mockScheduleRepository.findById(1L)).thenReturn(Optional.of(expectedSchedule));
    MvcResult response = mockMvc
        .perform(delete("/api/schedules/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isNoContent()).andReturn();
    verify(mockScheduleRepository, times(1)).findById(expectedSchedule.getId());
    verify(mockScheduleRepository, times(1)).deleteById(expectedSchedule.getId());

    String responseString = response.getResponse().getContentAsString();

    assertEquals(responseString.length(), 0);
  }

  @Test
  public void testDeleteSchedule_scheduleNotFound() throws Exception {
    long id = 1L;
    when(mockScheduleRepository.findById(id)).thenReturn(Optional.empty());
    mockMvc
        .perform(delete("/api/schedules/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isNotFound()).andReturn();
    verify(mockScheduleRepository, times(1)).findById(id);
    verify(mockScheduleRepository, times(0)).deleteById(id);
  }

  @Test
  public void testDeleteSchedule_scheduleNotOwned() throws Exception {
    Schedule expectedSchedule = new Schedule(1L,"Main", "Most likely schedule", "Fall 2020", "NOT YOURS");
    when(mockScheduleRepository.findById(expectedSchedule.getId())).thenReturn(Optional.of(expectedSchedule));
    mockMvc
        .perform(delete("/api/schedules/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isNotFound()).andReturn();
    verify(mockScheduleRepository, times(1)).findById(expectedSchedule.getId());
    verify(mockScheduleRepository, times(0)).deleteById(expectedSchedule.getId());
  }

  @Test
  public void testUpdateSchedule_scheduleExists_updateValues() throws Exception {
    Schedule inputSchedule = new Schedule(1L,"Main", "Most likely schedule", "Fall 2020", "123456");
    Schedule savedSchedule = new Schedule(1L,"Old", "Least likely schedule", "Fall 2020", "123456");
    String body = objectMapper.writeValueAsString(inputSchedule);

    when(mockScheduleRepository.findById(any(Long.class))).thenReturn(Optional.of(savedSchedule));
    when(mockScheduleRepository.save(inputSchedule)).thenReturn(inputSchedule);
    MvcResult response =
        mockMvc
            .perform(put("/api/schedules/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
            .andExpect(status().isOk()).andReturn();

    verify(mockScheduleRepository, times(1)).findById(inputSchedule.getId());
    verify(mockScheduleRepository, times(1)).save(inputSchedule);

    String responseString = response.getResponse().getContentAsString();

    assertEquals(body, responseString);
  }

  @Test
  public void testUpdateSchedule_scheduleNotFound() throws Exception {
    Schedule inputSchedule = new Schedule(1L,"Main", "Most likely schedule", "Fall 2020", "123456");
    String body = objectMapper.writeValueAsString(inputSchedule);

    when(mockScheduleRepository.findById(1L)).thenReturn(Optional.empty());
    mockMvc.perform(put("/api/schedules/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
        .content(body)).andExpect(status().isNotFound()).andReturn();
    verify(mockScheduleRepository, times(1)).findById(1L);
    verify(mockScheduleRepository, times(0)).save(any(Schedule.class));
  }

  @Test
  public void testUpdateSchedule_scheduleAtPathOwned_butTryingToOverwriteAnotherSchedule() throws Exception {
    Schedule inputSchedule = new Schedule(1L,"new schedule 1 trying to overwrite at 1", "Most likely schedule", "Fall 2020", "123456");
    Schedule savedSchedule = new Schedule(2L,"new schedule 1", "Most likely schedule", "Fall 2020", "123456");
    String body = objectMapper.writeValueAsString(inputSchedule);
    when(mockScheduleRepository.findById(any(Long.class))).thenReturn(Optional.of(savedSchedule));
    mockMvc.perform(put("/api/schedules/2").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
        .content(body)).andExpect(status().isBadRequest()).andReturn();
    verify(mockScheduleRepository, times(1)).findById(2L);
    verify(mockScheduleRepository, times(0)).save(any(Schedule.class));
  }

  @Test
  public void testUpdateSchedule_scheduleAtPathOwned_butTryingToInjectScheduleForAnotherUser()
      throws Exception {
    Schedule inputSchedule = new Schedule(1L,"new schedule 1 trying to inject at user id 654321", "Most likely schedule", "Fall 2020", "654321");
    Schedule savedSchedule = new Schedule(2L,"new schedule 1", "Most likely schedule", "Fall 2020", "123456");
    String body = objectMapper.writeValueAsString(inputSchedule);
    when(mockScheduleRepository.findById(any(Long.class))).thenReturn(Optional.of(savedSchedule));
    mockMvc.perform(put("/api/schedules/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
        .content(body)).andExpect(status().isBadRequest()).andReturn();
    verify(mockScheduleRepository, times(1)).findById(1L);
    verify(mockScheduleRepository, times(0)).save(any(Schedule.class));
  }

  @Test
  public void testUpdateSchedule_scheduleAtPathNotOwned() throws Exception {
    Schedule inputSchedule = new Schedule(1L,"new schedule 1", "Most likely schedule", "Fall 2020", "123456");
    Schedule savedSchedule = new Schedule(2L,"new schedule 1", "Most likely schedule", "Fall 2020", "NOT YOURS");
    String body = objectMapper.writeValueAsString(inputSchedule);
    when(mockScheduleRepository.findById(any(Long.class))).thenReturn(Optional.of(savedSchedule));
    mockMvc.perform(put("/api/schedules/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
        .content(body)).andExpect(status().isNotFound()).andReturn();
    verify(mockScheduleRepository, times(1)).findById(1L);
    verify(mockScheduleRepository, times(0)).save(any(Schedule.class));
  }
}

