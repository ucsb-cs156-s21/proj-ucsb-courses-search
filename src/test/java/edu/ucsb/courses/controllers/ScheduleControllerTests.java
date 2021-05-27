package edu.ucsb.courses.controllers;


import edu.ucsb.courses.advice.AuthControllerAdvice;
import edu.ucsb.courses.entities.AppUser;
import edu.ucsb.courses.repositories.ScheduleItemRepository;
import edu.ucsb.courses.repositories.ScheduleRepository;
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
import edu.ucsb.courses.entities.Schedule;
import edu.ucsb.courses.entities.ScheduleItem;
import edu.ucsb.courses.models.PersonalSchedule;

@WebMvcTest(value = ScheduleController.class)
@WithMockUser
public class ScheduleControllerTests {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  ScheduleRepository mockScheduleRepository;

  @MockBean
  ScheduleItemRepository mockScheduleItemRepository;

  @MockBean
  AuthControllerAdvice authController;

  private String userToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";
  }

  @Test
    public void testUpdateSchedule_scheduleExists_updateValues() throws Exception {
      Schedule inputSchedule = new Schedule(1L,"CS 156", "New", "Fall 2020", "123456");
      Schedule savedSchedule = new Schedule(1L,"CS 156", "Old", "Fall 2020", "123456");
      String body = objectMapper.writeValueAsString(inputSchedule);
      AppUser user = new AppUser();
      user.setId(123456L);
      when(authController.getUser(any(String.class))).thenReturn(user);
      when(authController.getIsMember(any(String.class))).thenReturn(true);

      when(mockScheduleRepository.findById(any(Long.class))).thenReturn(Optional.of(savedSchedule));
      when(mockScheduleRepository.save(inputSchedule)).thenReturn(inputSchedule);
      MvcResult response =
          mockMvc
              .perform(put("/api/member/schedule/update/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
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
      AppUser user = new AppUser();
      user.setId(123456L);
      when(authController.getUser(any(String.class))).thenReturn(user);
      when(authController.getIsMember(any(String.class))).thenReturn(true);

      when(mockScheduleRepository.findById(1L)).thenReturn(Optional.empty());
      mockMvc.perform(put("/api/member/schedule/update/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
          .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
          .content(body)).andExpect(status().isNotFound()).andReturn();
      verify(mockScheduleRepository, times(1)).findById(1L);
      verify(mockScheduleRepository, times(0)).save(any(Schedule.class));
    }

  @Test
  public void testUpdateSchedule_NotMember() throws Exception {
    Schedule inputSchedule = new Schedule(1L,"CS 156", "New", "Fall 2020", "123456");
    String body = objectMapper.writeValueAsString(inputSchedule);
    AppUser user = new AppUser();
    user.setId(123456L);
    when(authController.getUser(any(String.class))).thenReturn(user);
    when(authController.getIsMember(any(String.class))).thenReturn(false);

    when(mockScheduleRepository.findById(1L)).thenReturn(Optional.empty());
    mockMvc.perform(put("/api/member/schedule/update/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
            .content(body)).andExpect(status().isUnauthorized()).andReturn();
  }

  @Test
  public void testUpdateSchedule_ScheduleNotMatch() throws Exception {
    Schedule inputSchedule = new Schedule(1L,"CS 156", "New", "Fall 2020", "123456");
    String body = objectMapper.writeValueAsString(inputSchedule);
    AppUser user = new AppUser();
    user.setId(123456L);
    when(authController.getUser(any(String.class))).thenReturn(user);
    when(authController.getIsMember(any(String.class))).thenReturn(true);
    Schedule savedSchedule = new Schedule(2L,"CS 156", "Old", "Fall 2020", "123456");
    when(mockScheduleRepository.findById(any(Long.class))).thenReturn(Optional.of(savedSchedule));
    when(mockScheduleRepository.findById(1L)).thenReturn(Optional.of(savedSchedule));
    mockMvc.perform(put("/api/member/schedule/update/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
            .content(body)).andExpect(status().isBadRequest()).andReturn();
    verify(mockScheduleRepository, times(1)).findById(1L);
    verify(mockScheduleRepository, times(0)).save(any(Schedule.class));
  }

  @Test
  public void testUpdateSchedule_scheduleAtPathOwned_butTryingToInjectScheduleForAnotherUser()
      throws Exception {
    Schedule inputSchedule = new Schedule(1L,"CS 156", "New trying to inject at user id 654321", "Fall 2020", "123456");
    Schedule savedSchedule = new Schedule(1L,"CS 156", "Old", "Fall 2020", "NOT YOURS");
    String body = objectMapper.writeValueAsString(inputSchedule);
    when(mockScheduleRepository.findById(any(Long.class))).thenReturn(Optional.of(savedSchedule));
    AppUser user = new AppUser();
    user.setId(123456L);
    when(authController.getUser(any(String.class))).thenReturn(user);
    when(authController.getIsMember(any(String.class))).thenReturn(true);
    mockMvc.perform(put("/api/member/schedule/update/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
        .content(body)).andExpect(status().isBadRequest()).andReturn();
    verify(mockScheduleRepository, times(1)).findById(1L);
    verify(mockScheduleRepository, times(0)).save(any(Schedule.class));
  }

  @Test
  public void testGetSchedule() throws Exception {
    Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "123456");
    Optional<Schedule> expectedSchedules = Optional.of(s1);
    List<ScheduleItem> expectedScheduleItems = new ArrayList<ScheduleItem>();
    PersonalSchedule expectedPersonalSchedule = new PersonalSchedule(expectedSchedules.get(),expectedScheduleItems);

    when(mockScheduleRepository.findById(1L)).thenReturn(expectedSchedules);
    when(mockScheduleItemRepository.findByScheduleId(1L)).thenReturn(expectedScheduleItems);
    AppUser user = new AppUser();
    user.setId(123456L);
    when(authController.getUser(any(String.class))).thenReturn(user);
    when(authController.getIsMember(any(String.class))).thenReturn(true);
    MvcResult response =
        mockMvc
            .perform(get("/api/member/schedule/get/1").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isOk()).andReturn();

    verify(mockScheduleRepository, times(1)).findById(1L);

    String responseString = response.getResponse().getContentAsString();
    PersonalSchedule returnVal = objectMapper.readValue(responseString, PersonalSchedule.class);
    assertEquals(returnVal, expectedPersonalSchedule);
  }

  @Test
  public void testGetScheduleWithScheduleItems() throws Exception {
    AppUser user = new AppUser();
    user.setId(123456L);

    Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "123456");
    Optional<Schedule> expectedSchedules = Optional.of(s1);
    List<ScheduleItem> expectedScheduleItems = new ArrayList<ScheduleItem>();
    ScheduleItem one = new ScheduleItem(2L, "1111", "2222", user, s1);
    ScheduleItem two = new ScheduleItem(3L, "1234", "5678", user, s1);
    expectedScheduleItems.add(one);
    expectedScheduleItems.add(two);
    PersonalSchedule expectedPersonalSchedule = new PersonalSchedule(expectedSchedules.get(),expectedScheduleItems);

    when(mockScheduleRepository.findById(1L)).thenReturn(expectedSchedules);
    when(mockScheduleItemRepository.findByScheduleId(1L)).thenReturn(expectedScheduleItems);
    
    when(authController.getUser(any(String.class))).thenReturn(user);
    when(authController.getIsMember(any(String.class))).thenReturn(true);
    MvcResult response =
        mockMvc
            .perform(get("/api/member/schedule/get/1").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isOk()).andReturn();

    verify(mockScheduleRepository, times(1)).findById(1L);

    String responseString = response.getResponse().getContentAsString();
    PersonalSchedule returnVal = objectMapper.readValue(responseString, PersonalSchedule.class);
    assertEquals(returnVal, expectedPersonalSchedule);
  }
  @Test
  public void testGetScheduleWithScheduleItemsNotAssociated() throws Exception {
    AppUser user = new AppUser();
    user.setId(123456L);

    Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "123456");
    Optional<Schedule> expectedSchedules = Optional.of(s1);
    List<ScheduleItem> expectedScheduleItems = new ArrayList<ScheduleItem>();
    ScheduleItem one = new ScheduleItem(2L, "1111", "2222", user, null);
    ScheduleItem two = new ScheduleItem(3L, "1234", "5678", user, null);
    PersonalSchedule expectedPersonalSchedule = new PersonalSchedule(expectedSchedules.get(),expectedScheduleItems);

    when(mockScheduleRepository.findById(1L)).thenReturn(expectedSchedules);
    when(mockScheduleItemRepository.findByScheduleId(1L)).thenReturn(expectedScheduleItems);
    
    when(authController.getUser(any(String.class))).thenReturn(user);
    when(authController.getIsMember(any(String.class))).thenReturn(true);
    MvcResult response =
        mockMvc
            .perform(get("/api/member/schedule/get/1").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isOk()).andReturn();

    verify(mockScheduleRepository, times(1)).findById(1L);

    String responseString = response.getResponse().getContentAsString();
    PersonalSchedule returnVal = objectMapper.readValue(responseString, PersonalSchedule.class);
    assertEquals(returnVal, expectedPersonalSchedule);
  }

  @Test
  public void testGetScheduleNotExist() throws Exception {
    Optional<Schedule> expectedSchedules = Optional.empty();
    String expectedResult = "";
    when(mockScheduleRepository.findById(any(Long.class))).thenReturn(expectedSchedules);
    AppUser user = new AppUser();
    user.setId(123456L);
    when(authController.getUser(any(String.class))).thenReturn(user);
    when(authController.getIsMember(any(String.class))).thenReturn(true);
    MvcResult response =
        mockMvc
            .perform(get("/api/member/schedule/get/1").contentType("application/json")
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
    AppUser user = new AppUser();
    user.setId(123456L);
    when(authController.getUser(any(String.class))).thenReturn(user);
    when(authController.getIsMember(any(String.class))).thenReturn(true);
    MvcResult response =
        mockMvc
            .perform(get("/api/member/schedule/get/1").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isBadRequest()).andReturn();

    verify(mockScheduleRepository, times(1)).findById(1L);

    String responseString = response.getResponse().getContentAsString();
    
    assertEquals(expectedResult, responseString);
  }

  @Test
  public void testGetScheduleNotMember() throws Exception {
    Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "NOT YOURS");
    Optional<Schedule> expectedSchedules = Optional.of(s1);
    String expectedResult = "";
    when(mockScheduleRepository.findById(any(Long.class))).thenReturn(expectedSchedules);
    AppUser user = new AppUser();
    user.setId(123456L);
    when(authController.getUser(any(String.class))).thenReturn(user);
    when(authController.getIsMember(any(String.class))).thenReturn(false);
    MvcResult response =
            mockMvc
                    .perform(get("/api/member/schedule/get/1").contentType("application/json")
                            .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                    .andExpect(status().isUnauthorized()).andReturn();
  }

  @Test
    public void testGetSchedules() throws Exception {
      Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "123456");
      Schedule s2 = new Schedule(2L,"CS 156", "Adv App Programming", "Fall 2020", "123456");
      List<Schedule> schedules = new ArrayList<>();
      schedules.add(s1);
      schedules.add(s2);

      when(mockScheduleRepository.findByUserId("123456")).thenReturn(schedules);
      AppUser user = new AppUser();
      user.setId(123456L);
      when(authController.getUser(any(String.class))).thenReturn(user);
      when(authController.getIsMember(any(String.class))).thenReturn(true);
      MvcResult response =
          mockMvc
              .perform(get("/api/member/schedule/getSchedules").contentType("application/json")
                  .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
              .andExpect(status().isOk()).andReturn();

      verify(mockScheduleRepository, times(1)).findByUserId("123456");

      String responseString = response.getResponse().getContentAsString();
      List<Schedule> responses = objectMapper.readValue(responseString, new TypeReference<>(){});

      assertEquals(s1, responses.get(0));
      assertEquals(s2,responses.get(1));
    }

  @Test
    public void testGetSchedulesNoContent() throws Exception {
      List<Schedule> schedules = new ArrayList<>();
      String expectedResult = "[]";
      when(mockScheduleRepository.findByUserId("123456")).thenReturn(schedules);
      AppUser user = new AppUser();
      user.setId(123456L);
      when(authController.getUser(any(String.class))).thenReturn(user);
      when(authController.getIsMember(any(String.class))).thenReturn(true);
      MvcResult response =
          mockMvc
              .perform(get("/api/member/schedule/getSchedules").contentType("application/json")
                  .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
              .andExpect(status().isOk()).andReturn();

      verify(mockScheduleRepository, times(1)).findByUserId("123456");

      String responseString = response.getResponse().getContentAsString();

      assertEquals(responseString, expectedResult);
    }

  @Test
  public void testGetSchedulesNotMember() throws Exception {
    List<Schedule> schedules = new ArrayList<>();
    String expectedResult = "";
    when(mockScheduleRepository.findByUserId("123456")).thenReturn(schedules);
    AppUser user = new AppUser();
    user.setId(123456L);
    when(authController.getUser(any(String.class))).thenReturn(user);
    when(authController.getIsMember(any(String.class))).thenReturn(false);
    MvcResult response =
            mockMvc
                    .perform(get("/api/member/schedule/getSchedules").contentType("application/json")
                            .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                    .andExpect(status().isUnauthorized()).andReturn();

  }

  @Test
    public void testCreateSchedule() throws Exception {
      Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "123456");
      when(mockScheduleRepository.save(any(Schedule.class))).thenReturn(s1);
      AppUser user = new AppUser();
      user.setId(123456L);
      when(authController.getUser(any(String.class))).thenReturn(user);
      when(authController.getIsMember(any(String.class))).thenReturn(true);
      MvcResult response = mockMvc
          .perform(post("/api/member/schedule/new?name=CS 156&description=Adv App Programming&quarter=Fall 2020&userId=123456").with(csrf()).contentType(MediaType.APPLICATION_JSON)
              .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
          .andExpect(status().isOk()).andReturn();


      String responseString = response.getResponse().getContentAsString();
      Schedule returnVal = objectMapper.readValue(responseString, Schedule.class);
      assertEquals(returnVal, s1);
    }

  @Test
  public void testCreateScheduleNotMember() throws Exception {
    Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "123456");
    when(mockScheduleRepository.save(any(Schedule.class))).thenReturn(s1);
    AppUser user = new AppUser();
    user.setId(123456L);
    when(authController.getUser(any(String.class))).thenReturn(user);
    when(authController.getIsMember(any(String.class))).thenReturn(false);
    MvcResult response = mockMvc
            .perform(post("/api/member/schedule/new?name=CS 156&description=Adv App Programming&quarter=Fall 2020&userId=123456").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isUnauthorized()).andReturn();
  }

  @Test
    public void testGetScheduleFailure() throws Exception {
      Optional<Schedule> expectedSchedules = Optional.empty();

      when(mockScheduleRepository.findById(1L)).thenReturn(expectedSchedules);
      AppUser user = new AppUser();
      user.setId(123456L);
      when(authController.getUser(any(String.class))).thenReturn(user);
      when(authController.getIsMember(any(String.class))).thenReturn(true);

      MvcResult response =
          mockMvc
              .perform(get("/api/member/schedule/get/1").contentType("application/json")
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
      AppUser user = new AppUser();
      user.setId(123456L);
      when(authController.getUser(any(String.class))).thenReturn(user);
      when(authController.getIsMember(any(String.class))).thenReturn(true);
      MvcResult response = mockMvc
          .perform(delete("/api/member/schedule/delete/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
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
    AppUser user = new AppUser();
    user.setId(123456L);
    when(authController.getUser(any(String.class))).thenReturn(user);
    when(authController.getIsMember(any(String.class))).thenReturn(true);
    mockMvc
        .perform(delete("/api/member/schedule/delete/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isNotFound()).andReturn();
    verify(mockScheduleRepository, times(1)).findById(id);
    verify(mockScheduleRepository, times(0)).deleteById(id);
  }

@Test
  public void testDeleteTodo_NotOwned() throws Exception {
    Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "NOT YOURS");
    when(mockScheduleRepository.findById(s1.getId())).thenReturn(Optional.of(s1));
    AppUser user = new AppUser();
    user.setId(123456L);
    when(authController.getUser(any(String.class))).thenReturn(user);
    when(authController.getIsMember(any(String.class))).thenReturn(true);
    mockMvc
        .perform(delete("/api/member/schedule/delete/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isNotFound()).andReturn();
    verify(mockScheduleRepository, times(1)).findById(s1.getId());
    verify(mockScheduleRepository, times(0)).deleteById(s1.getId());
  }
  @Test
  public void testDeleteTodo_NotMember() throws Exception {
    Schedule s1 = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "NOT YOURS");
    when(mockScheduleRepository.findById(s1.getId())).thenReturn(Optional.of(s1));
    AppUser user = new AppUser();
    user.setId(123456L);
    when(authController.getUser(any(String.class))).thenReturn(user);
    when(authController.getIsMember(any(String.class))).thenReturn(false);
    mockMvc
            .perform(delete("/api/member/schedule/delete/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                    .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isUnauthorized()).andReturn();
  }

}