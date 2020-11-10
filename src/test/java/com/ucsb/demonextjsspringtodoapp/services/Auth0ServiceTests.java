package com.ucsb.demonextjsspringtodoapp.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import com.ucsb.demonextjsspringtodoapp.models.GoogleUserProfile;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.client.RestTemplate;

@ExtendWith(SpringExtension.class)
public class Auth0ServiceTests {


  @Mock
  private RestTemplate restTemplate;

  @InjectMocks
  private Auth0Service auth0Service = new Auth0Service();

  private String googleUserString() {
    return "{" + "\"given_name\": \"Test\"," + "\"family_name\": \"User\","
        + "\"nickname\": \"testuser\"," + "\"name\": \"Test User\","
        + "\"picture\": \"https://lh3.googleusercontent.com/a-/abcdefghijklmnop\","
        + "\"locale\": \"en\"," + "\"updated_at\": \"2020-09-10T04:26:05.523Z\","
        + "\"email\": \"test@test.com\"," + "\"email_verified\": true,"
        + "\"sub\": \"google-oauth2|aaaaaaaaaaa\"" + "}";
  }

  @Test
  public void test_getInfoFromAuthorization() throws Exception {
    when(restTemplate.exchange(any(String.class), eq(HttpMethod.GET), any(HttpEntity.class),
        eq(String.class)))
            .thenReturn(new ResponseEntity<String>(googleUserString(), HttpStatus.OK));

    GoogleUserProfile profile = auth0Service.getInfoFromAuthorization("testtoken");
    GoogleUserProfile expectedProfile = GoogleUserProfile.fromJSON(googleUserString());
    assertEquals(profile, expectedProfile);
  }

}
