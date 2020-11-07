package com.ucsb.demonextjsspringtodoapp.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ucsb.demonextjsspringtodoapp.advice.AuthControllerAdvice;
import com.ucsb.demonextjsspringtodoapp.entities.Admin;
import com.ucsb.demonextjsspringtodoapp.entities.AppUser;
import com.ucsb.demonextjsspringtodoapp.repositories.AdminRepository;
import com.ucsb.demonextjsspringtodoapp.repositories.AppUserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;


import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;


@WebMvcTest(value = RoleController.class)
@WithMockUser
public class RoleControllerTests {

  private String exampleAuthToken = "Bearer blah";

  private ObjectMapper mapper = new ObjectMapper();
  @Autowired
  private MockMvc mockMvc;
  @MockBean
  AppUserRepository mockAppUserRepository;
  @MockBean
  AdminRepository mockAdminRepository;
  @MockBean
  AuthControllerAdvice mockAuthControllerAdvice;

  @Test
  public void test_get_users_unauthorizedIfNotAdmin() throws Exception {
    mockMvc.perform(get("/api/users").contentType("application/json")
        .header(HttpHeaders.AUTHORIZATION, exampleAuthToken)).andExpect(status().is(401));
  }

  @Test
  public void test_get_users_returnsListOfUsers() throws Exception {
    List<AppUser> expectedUsers = new ArrayList<AppUser>();
    expectedUsers.add(new AppUser(1L, "test@ucsb.edu", "Test", "User"));
    expectedUsers.add(new AppUser(2L, "cool@ucsb.edu", "Cool", "User"));
    when(mockAppUserRepository.findAll()).thenReturn(expectedUsers);
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    MvcResult response =
        mockMvc
            .perform(get("/api/users").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, exampleAuthToken))
            .andExpect(status().isOk()).andReturn();
    String responseString = response.getResponse().getContentAsString();
    List<AppUser> users = mapper.readValue(responseString, new TypeReference<List<AppUser>>() {
    });
    assertEquals(expectedUsers, users);
  }

  @Test
  public void test_get_admins_unauthorizedIfNotAdmin() throws Exception {
    mockMvc.perform(get("/api/admins").contentType("application/json")
        .header(HttpHeaders.AUTHORIZATION, exampleAuthToken)).andExpect(status().is(401));
  }

  @Test
  public void test_get_admins_returnsListOfAdmins() throws Exception {
    List<Admin> expectedAdmins = new ArrayList<Admin>();
    expectedAdmins.add(new Admin("test@ucsb.edu"));
    expectedAdmins.add(new Admin("cool@ucsb.edu"));
    when(mockAdminRepository.findAll()).thenReturn(expectedAdmins);
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    MvcResult response = mockMvc
        .perform(get("/api/admins").contentType("application/json")
            .header(HttpHeaders.AUTHORIZATION, exampleAuthToken))
        .andExpect(status().isOk()).andReturn();
    String responseString = response.getResponse().getContentAsString();
    List<Admin> admins = mapper.readValue(responseString, new TypeReference<List<Admin>>() {
    });
    assertEquals(expectedAdmins, admins);
  }

  @Test
  public void test_put_admins_unauthorizedIfNotAdmin() throws Exception {
    Admin expectedAdmin = new Admin("admin@test.org");
    String requestBody = mapper.writeValueAsString(expectedAdmin);
    mockMvc.perform(put("/api/admins").contentType("application/json").with(csrf())
        .contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8").content(requestBody)
        .header(HttpHeaders.AUTHORIZATION, exampleAuthToken)).andExpect(status().is(401));
  }

  @Test
  public void test_put_admins_savesAdmin() throws Exception {
    Admin expectedAdmin = new Admin("admin@test.org");
    String requestBody = mapper.writeValueAsString(expectedAdmin);
    when(mockAdminRepository.save(any(Admin.class))).thenReturn(expectedAdmin);
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    MvcResult response = mockMvc
        .perform(put("/api/admins").contentType("application/json").with(csrf())
            .contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8").content(requestBody)
            .header(HttpHeaders.AUTHORIZATION, exampleAuthToken))
        .andExpect(status().isOk()).andReturn();
    String responseString = response.getResponse().getContentAsString();
    Admin admin = mapper.readValue(responseString, Admin.class);
    assertEquals(expectedAdmin, admin);
  }

  @Test
  public void test_delete_admins_unauthorizedIfNotAdmin() throws Exception {
    mockMvc.perform(delete("/api/admins/1").contentType("application/json").with(csrf())
        .header(HttpHeaders.AUTHORIZATION, exampleAuthToken)).andExpect(status().is(401));
  }

  @Test
  public void test_delete_admins_notFoundIfDoesNotExist() throws Exception {
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    mockMvc.perform(delete("/api/admins/1").contentType("application/json").with(csrf())
        .header(HttpHeaders.AUTHORIZATION, exampleAuthToken)).andExpect(status().is(404));
  }

  @Test
  public void test_delete_admins_deletesAdmin() throws Exception {
    Admin expectedAdmin = new Admin("admin@test.org");
    when(mockAdminRepository.findById(any(Long.class))).thenReturn(Optional.of(expectedAdmin));
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    mockMvc.perform(delete("/api/admins/1").contentType("application/json").with(csrf())
        .header(HttpHeaders.AUTHORIZATION, exampleAuthToken)).andExpect(status().isNoContent());
  }

}
