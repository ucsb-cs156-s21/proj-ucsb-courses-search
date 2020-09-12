package com.ucsb.demonextjsspringtodoapp.controllers;

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
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ucsb.demonextjsspringtodoapp.models.Todo;
import com.ucsb.demonextjsspringtodoapp.repositories.TodoRepository;
import com.ucsb.demonextjsspringtodoapp.services.Auth0Service;

@WebMvcTest(value = TodoController.class)
@WithMockUser
public class TodoControllerTests {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  TodoRepository mockTodoRepository;

  @MockBean
  private Auth0Service mockAuth0Service;

  private String userToken() {
    return "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1VRkVRemd5TUVZM09UWTJNakkzTTBJNVFVVkNNRGRCT0RRMk56TkVOa00zUmtSQlEwVTRSQSJ9.eyJpc3MiOiJodHRwczovL2Rldi0wbjdhZXFzcS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTM1MDA2NDE1OTgxMzY0NzM5NjciLCJhdWQiOlsiaHR0cHM6Ly9kZXYtMG43YWVxc3EuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2Rldi0wbjdhZXFzcS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTk5ODkwODMyLCJleHAiOjE1OTk5NzcyMzIsImF6cCI6IkprenNoOVg1amY1dWhyckt0SVpkVXlVY3ZtN2JicjR5Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.laRYSweehJFJFciB8ZRtSF3YlAwL6NCdEQ8_95mpfU18vpLkZZjmj-19_IbX_dxBbMRX_AQPE84d2cX205SjM3jrFYUQ7nhSrhQBGf-epzAFGzptjE8fUIDElcXyvqcNg2OjHrhDQnpdxT6oeTlZtOEv_BZpRhp2aF0eU0KTfwEJ1qX187CYauUOyoSp5M2Uald_8cDg7ZX7qaO_K6DJWmktFudkCqAQveQ7oMsUxH8XuJ9jp2jD2TOaKWfjTf-Gq8f6fwqesFrJx-oKYLmqa8MgGmZTSwLZdgKyV3oEtlgEEj6BvLNe2LJ8ZrwHyQffs3MPh90OBdH82Uhg6j8zLQ";
  }

  @Test
  public void testGetTodos() throws Exception {
    List<Todo> expectedTodos = new ArrayList<Todo>();
    expectedTodos.add(new Todo(1L, "todo 1", false, "123456"));

    when(mockTodoRepository.findByUserId(any(String.class))).thenReturn(expectedTodos);
    MvcResult response = mockMvc.perform(
        get("/api/todos").contentType("application/json").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isOk()).andReturn();

    String responseString = response.getResponse().getContentAsString();
    List<Todo> actualTodos = objectMapper.readValue(responseString, new TypeReference<List<Todo>>() {
    });
    assertEquals(actualTodos, expectedTodos);
  }

  @Test
  public void testSaveTodo() throws Exception {
    Todo expectedTodo = new Todo(1L, "todo 1", false, "123456");
    ObjectMapper mapper = new ObjectMapper();
    String requestBody = mapper.writeValueAsString(expectedTodo);
    when(mockTodoRepository.save(any())).thenReturn(expectedTodo);
    MvcResult response = mockMvc
        .perform(post("/api/todos").with(csrf()).contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
            .content(requestBody).header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isOk()).andReturn();

    String responseString = response.getResponse().getContentAsString();
    Todo actualTodo = objectMapper.readValue(responseString, Todo.class);
    assertEquals(actualTodo, expectedTodo);
  }
}
