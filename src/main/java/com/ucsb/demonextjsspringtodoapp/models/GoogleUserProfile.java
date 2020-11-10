package com.ucsb.demonextjsspringtodoapp.models;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;

import org.apache.commons.lang3.builder.EqualsBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GoogleUserProfile {

  private static final Logger logger = LoggerFactory.getLogger(GoogleUserProfile.class);
  private String sub;
  private String name;
  private String email;
  @JsonProperty("given_name")
  private String givenName;
  @JsonProperty("family_name")
  private String familyName;
  private String nickname;
  private String picture;
  private String locale;
  @JsonProperty("updated_at")
  private String updatedAt;

  /**
   * @param json - the json string of the object being created
   * @return GoogleUserProfile (nullable)
   */
  public static GoogleUserProfile fromJSON(String json) {
    try {
      ObjectMapper objectMapper = new ObjectMapper();
      objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

      GoogleUserProfile userProfile = objectMapper.readValue(json, GoogleUserProfile.class);
      return userProfile;
    } catch (JsonProcessingException jpe) {
      logger.error("JsonProcessingException:" + jpe);
      return null;
    }
  }

  public String getSub() {
    return sub;
  }

  public void setSub(String sub) {
    this.sub = sub;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getGivenName() {
    return givenName;
  }

  public void setGivenName(String givenName) {
    this.givenName = givenName;
  }

  public String getFamilyName() {
    return familyName;
  }

  public void setFamilyName(String familyName) {
    this.familyName = familyName;
  }

  public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }

  public String getPicture() {
    return picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
  }

  public String getLocale() {
    return locale;
  }

  public void setLocale(String locale) {
    this.locale = locale;
  }

  public String getUpdatedAt() {
    return this.updatedAt;
  }

  public void setUpdatedAt(String updatedAt) {
    this.updatedAt = updatedAt;
  }

  public String toJSONString() throws Exception {
    ObjectMapper mapper = new ObjectMapper();
    return mapper.writeValueAsString(this);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    GoogleUserProfile profile = (GoogleUserProfile) o;
    EqualsBuilder builder = new EqualsBuilder();
    builder.append(sub, profile.getSub()).append(name, profile.getName())
        .append(email, profile.getEmail()).append(givenName, profile.getGivenName())
        .append(familyName, profile.getFamilyName()).append(nickname, profile.getNickname())
        .append(picture, profile.getPicture()).append(locale, profile.getLocale());

    return builder.isEquals();
  }
}
