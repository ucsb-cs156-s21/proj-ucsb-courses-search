package com.ucsb.demonextjsspringtodoapp.controllers;

import com.ucsb.demonextjsspringtodoapp.models.GoogleUserProfile;
import com.ucsb.demonextjsspringtodoapp.services.Auth0Service;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(value = AppController.class)
@WithMockUser
public class AppControllerTests {
  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private Auth0Service mockAuth0Service;

  private String googleUserString() {
    return "{" + "\"given_name\": \"Test\"," + "\"family_name\": \"User\","
        + "\"nickname\": \"testuser\"," + "\"name\": \"Test User\","
        + "\"picture\": \"https://lh3.googleusercontent.com/a-/abcdefghijklmnop\","
        + "\"locale\": \"en\"," + "\"updated_at\": \"2020-09-10T04:26:05.523Z\","
        + "\"email\": \"test@test.com\"," + "\"email_verified\": true,"
        + "\"sub\": \"google-oauth2|aaaaaaaaaaa\"" + "}";
  }

  @Test
  public void testPublicEndpoint() throws Exception {
    MvcResult response = mockMvc.perform(get("/api/public").contentType("application/json"))
        .andExpect(status().isOk()).andReturn();
    String actualResponseBody = response.getResponse().getContentAsString();
    assertEquals(actualResponseBody, "{\"message\":\"This is a public endpoint.\"}");
  }

  @Test
  public void testPrivateEndpoint() throws Exception {
    GoogleUserProfile expectedProfile = GoogleUserProfile.fromJSON(googleUserString());
    Mockito.when(mockAuth0Service.getInfoFromAuthorization(Mockito.any(String.class)))
        .thenReturn(expectedProfile);
    MvcResult response = mockMvc.perform(
        get("/api/private").header(HttpHeaders.AUTHORIZATION, "").contentType("application/json"))
        .andExpect(status().isOk()).andReturn();
    String actualResponseBody = response.getResponse().getContentAsString();
    GoogleUserProfile actualUserProfile = GoogleUserProfile.fromJSON(actualResponseBody);
    assertEquals(expectedProfile, actualUserProfile);
  }
}
