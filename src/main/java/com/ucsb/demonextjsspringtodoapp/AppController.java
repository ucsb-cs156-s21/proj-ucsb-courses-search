package com.ucsb.demonextjsspringtodoapp;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = { "${frontend.domain}" })
@RestController
public class AppController {

  @Value("${security.oauth2.resource.id}")
  private String resourceId;

  @Value("${auth0.domain}")
  private String domain;

  @Value("${auth0.clientId}")
  private String clientId;

  @Value("${frontend.domain}")
  private String frontendDomain;

  @GetMapping(value = "/api/public", produces = "application/json")
  @ResponseBody
  public String publicEndpoint() {
    return new JSONObject().put("message", "This is a public endpoint.").put("domain", frontendDomain).toString();
  }

  @GetMapping(value = "/api/private", produces = "application/json")
  @ResponseBody
  public String privateEndpoint() {
    return new JSONObject().put("message", "This is a private endpoint.").toString();
  }

  @GetMapping(value = "/api/private-scoped", produces = "application/json")
  @ResponseBody
  public String privateScopedEndpoint() {
    return new JSONObject().put("message", "This is a private scoped endpoint").toString();
  }

  @GetMapping(value = "/config", produces = "application/json")
  @ResponseBody
  public String config() {
    return new JSONObject().put("domain", domain).put("clientID", clientId).put("audience", resourceId).toString();
  }
}