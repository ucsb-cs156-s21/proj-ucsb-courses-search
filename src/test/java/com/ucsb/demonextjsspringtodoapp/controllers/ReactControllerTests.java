package com.ucsb.demonextjsspringtodoapp.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(value = ReactController.class)
@WithMockUser
public class ReactControllerTests {

  @Autowired
  MockMvc mockMvc;

  @Test
  public void testGetIndex() throws Exception {
    ReactController reactController = new ReactController();
    assertEquals(reactController.getIndex(), "/index.html");
  }

  @Test
  public void testGetIndexWithRequest() throws Exception {
    mockMvc.perform(get("/").accept(MediaType.TEXT_HTML)).andExpect(status().isOk());
    mockMvc.perform(get("/todos").accept(MediaType.TEXT_HTML)).andExpect(status().isOk());
    mockMvc.perform(get("/profile").accept(MediaType.TEXT_HTML)).andExpect(status().isOk());
  }
}
