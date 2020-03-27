package com.ucsb.demonextjsspringtodoapp.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import com.ucsb.demonextjsspringtodoapp.services.Auth0Service;

@CrossOrigin(origins = "${frontend.domain}")
@RestController
public class TodoController {
  private final Logger logger = LoggerFactory.getLogger(TodoController.class);

  @Autowired
  private Auth0Service auth0Service;

  @GetMapping("/api/users/{id}")
  public String upsertUser(@PathVariable("id") long id, @RequestHeader("Authorization") String authorization) {

    return new JSONObject().toString();
  }

  @GetMapping(value = "/api/users/")
  public String getUserTodos(@RequestHeader("Authorization") String authorization) {
    return new JSONObject().toString();
  }
}