package com.ucsb.demonextjsspringtodoapp;

import org.springframework.stereotype.Service;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@Service
public class Auth0Service {

  @Value("${auth0.domain}")
  private String auth0Domain;

  public GoogleUserProfile getInfoFromAuthorization(String authorization) throws RuntimeException {
    RestTemplate restTemplate = new RestTemplate();
    HttpHeaders headers = new HttpHeaders();
    headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
    headers.set("Authorization", authorization);
    HttpEntity entity = new HttpEntity<>("body", headers);

    String url = "https://" + auth0Domain + "/userinfo";

    ResponseEntity<String> re = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
    String json = re.getBody();
    return GoogleUserProfile.fromJSON(json);
  }
}