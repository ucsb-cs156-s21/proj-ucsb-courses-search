package com.ucsb.demonextjsspringtodoapp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = { "${frontend.domain}" })
@RestController
public class AppController {

  private Logger logger = LoggerFactory.getLogger(AppController.class);

  @Value("${security.oauth2.resource.id}")
  private String resourceId;

  @Value("${auth0.domain}")
  private String domain;

  @Value("${auth0.clientId}")
  private String clientId;

  @Value("${frontend.domain}")
  private String frontendDomain;

  @Autowired
  private Auth0Service auth0Service;

  @GetMapping(value = "/api/public", produces = "application/json")
  public String publicEndpoint() {
    return new JSONObject().put("message", "This is a public endpoint.").put("domain", frontendDomain).toString();
  }

  @GetMapping(value = "/api/private", produces = "application/json")
  public String privateEndpoint(@RequestHeader("Authorization") String authorization) {
    GoogleUserProfile profile = auth0Service.getInfoFromAuthorization(authorization);

    return new JSONObject().put("message", "This is a private endpoint.").put("email", profile.getEmail()).toString();
  }

  @GetMapping(value = "/api/private-scoped", produces = "application/json")
  public String privateScopedEndpoint() {
    return new JSONObject().put("message", "This is a private scoped endpoint").toString();
  }

  @GetMapping(value = "/config", produces = "application/json")
  public String config() {
    return new JSONObject().put("domain", domain).put("clientID", clientId).put("audience", resourceId).toString();
  }
}