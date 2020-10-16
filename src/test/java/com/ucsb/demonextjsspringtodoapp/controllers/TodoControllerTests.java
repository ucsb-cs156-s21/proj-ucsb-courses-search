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
import com.ucsb.demonextjsspringtodoapp.models.Todo;
import com.ucsb.demonextjsspringtodoapp.repositories.TodoRepository;

@WebMvcTest(value = TodoController.class)
@WithMockUser
public class TodoControllerTests {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  TodoRepository mockTodoRepository;

  private String userToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";
  }

  @Test
  public void testGetTodos() throws Exception {
    List<Todo> expectedTodos = new ArrayList<Todo>();
    expectedTodos.add(new Todo(1L, "todo 1", false, "123456"));

    when(mockTodoRepository.findByUserId("123456")).thenReturn(expectedTodos);
    MvcResult response =
        mockMvc
            .perform(get("/api/todos").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isOk()).andReturn();

    verify(mockTodoRepository, times(1)).findByUserId("123456");

    String responseString = response.getResponse().getContentAsString();
    List<Todo> actualTodos =
        objectMapper.readValue(responseString, new TypeReference<List<Todo>>() {
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
        .perform(post("/api/todos").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").content(requestBody)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isOk()).andReturn();

    verify(mockTodoRepository, times(1)).save(expectedTodo);

    String responseString = response.getResponse().getContentAsString();
    Todo actualTodo = objectMapper.readValue(responseString, Todo.class);
    assertEquals(actualTodo, expectedTodo);
  }

  @Test
  public void testUpdateTodo_todoExists_updateValues() throws Exception {
    Todo inputTodo = new Todo(1L, "new todo 1", false, "123456");
    Todo savedTodo = new Todo(1L, "old todo 1", true, "123456");
    String body = objectMapper.writeValueAsString(inputTodo);

    when(mockTodoRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTodo));
    when(mockTodoRepository.save(inputTodo)).thenReturn(inputTodo);
    MvcResult response =
        mockMvc
            .perform(put("/api/todos/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
            .andExpect(status().isOk()).andReturn();

    verify(mockTodoRepository, times(1)).findById(inputTodo.getId());
    verify(mockTodoRepository, times(1)).save(inputTodo);

    String responseString = response.getResponse().getContentAsString();

    assertEquals(body, responseString);
  }

  @Test
  public void testUpdateTodo_todoNotFound() throws Exception {
    Todo inputTodo = new Todo(1L, "new todo 1", false, "123456");
    String body = objectMapper.writeValueAsString(inputTodo);

    when(mockTodoRepository.findById(1L)).thenReturn(Optional.empty());
    mockMvc.perform(put("/api/todos/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
        .content(body)).andExpect(status().isNotFound()).andReturn();
    verify(mockTodoRepository, times(1)).findById(1L);
    verify(mockTodoRepository, times(0)).save(any(Todo.class));
  }

  @Test
  public void testUpdateTodo_todoAtPathOwned_butTryingToOverwriteAnotherTodo() throws Exception {
    Todo inputTodo = new Todo(1L, "new todo 1 trying to overwrite at id 1", false, "123456");
    Todo savedTodo = new Todo(2L, "new todo 1", false, "123456");
    String body = objectMapper.writeValueAsString(inputTodo);
    when(mockTodoRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTodo));
    mockMvc.perform(put("/api/todos/2").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
        .content(body)).andExpect(status().isBadRequest()).andReturn();
    verify(mockTodoRepository, times(1)).findById(2L);
    verify(mockTodoRepository, times(0)).save(any(Todo.class));
  }

  @Test
  public void testUpdateTodo_todoAtPathOwned_butTryingToInjectTodoForAnotherUser()
      throws Exception {
    Todo inputTodo = new Todo(1L, "new todo 1 trying to inject to user id 654321", false, "654321");
    Todo savedTodo = new Todo(1L, "new todo 1", false, "123456");
    String body = objectMapper.writeValueAsString(inputTodo);
    when(mockTodoRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTodo));
    mockMvc.perform(put("/api/todos/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
        .content(body)).andExpect(status().isBadRequest()).andReturn();
    verify(mockTodoRepository, times(1)).findById(1L);
    verify(mockTodoRepository, times(0)).save(any(Todo.class));
  }

  @Test
  public void testUpdateTodo_todoAtPathNotOwned() throws Exception {
    Todo inputTodo = new Todo(1L, "new todo 1", false, "123456");
    Todo savedTodo = new Todo(2L, "new todo 1", false, "NOT YOURS");
    String body = objectMapper.writeValueAsString(inputTodo);
    when(mockTodoRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTodo));
    mockMvc.perform(put("/api/todos/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
        .content(body)).andExpect(status().isNotFound()).andReturn();
    verify(mockTodoRepository, times(1)).findById(1L);
    verify(mockTodoRepository, times(0)).save(any(Todo.class));
  }

  @Test
  public void testDeleteTodo_todoExists() throws Exception {
    Todo expectedTodo = new Todo(1L, "todo 1", false, "123456");
    when(mockTodoRepository.findById(1L)).thenReturn(Optional.of(expectedTodo));
    MvcResult response = mockMvc
        .perform(delete("/api/todos/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isNoContent()).andReturn();
    verify(mockTodoRepository, times(1)).findById(expectedTodo.getId());
    verify(mockTodoRepository, times(1)).deleteById(expectedTodo.getId());

    String responseString = response.getResponse().getContentAsString();

    assertEquals(responseString.length(), 0);
  }

  @Test
  public void testDeleteTodo_todoNotFound() throws Exception {
    long id = 1L;
    when(mockTodoRepository.findById(id)).thenReturn(Optional.empty());
    mockMvc
        .perform(delete("/api/todos/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isNotFound()).andReturn();
    verify(mockTodoRepository, times(1)).findById(id);
    verify(mockTodoRepository, times(0)).deleteById(id);
  }

  @Test
  public void testDeleteTodo_todoNotOwned() throws Exception {
    Todo expectedTodo = new Todo(1L, "todo 1", true, "NOT YOURS");
    when(mockTodoRepository.findById(expectedTodo.getId())).thenReturn(Optional.of(expectedTodo));
    mockMvc
        .perform(delete("/api/todos/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isNotFound()).andReturn();
    verify(mockTodoRepository, times(1)).findById(expectedTodo.getId());
    verify(mockTodoRepository, times(0)).deleteById(expectedTodo.getId());
  }
}
