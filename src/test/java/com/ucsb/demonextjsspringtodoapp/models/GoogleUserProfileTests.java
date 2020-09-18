package com.ucsb.demonextjsspringtodoapp.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;

public class GoogleUserProfileTests {

  private String googleUserString() {
    return "{" + "\"given_name\": \"Test\"," + "\"family_name\": \"User\","
        + "\"nickname\": \"testuser\"," + "\"name\": \"Test User\","
        + "\"picture\": \"https://lh3.googleusercontent.com/a-/abcdefghijklmnop\","
        + "\"locale\": \"en\"," + "\"updated_at\": \"2020-09-10T04:26:05.523Z\","
        + "\"email\": \"test@test.com\"," + "\"email_verified\": true,"
        + "\"sub\": \"google-oauth2|aaaaaaaaaaa\"" + "}";
  }

  @Test
  public void testGoogleUserProfile_notEqualNull() throws Exception {
    GoogleUserProfile googleuserprofile = GoogleUserProfile.fromJSON(googleUserString());
    assertNotEquals(googleuserprofile, null);
  }

  @Test
  public void testGoogleUserProfile_notEqualAnotherClass() throws Exception {
    GoogleUserProfile googleuserprofile = GoogleUserProfile.fromJSON(googleUserString());
    assertNotEquals(googleuserprofile, new Object());
  }

  @Test
  public void testGoogleUserProfile_equalsSelf() throws Exception {
    GoogleUserProfile googleuserprofile = GoogleUserProfile.fromJSON(googleUserString());
    assertEquals(googleuserprofile, googleuserprofile);
  }

  @Test
  public void testGoogleUserProfile_fromJSON_badInputJSON() throws Exception {
    GoogleUserProfile googleuserprofile = GoogleUserProfile.fromJSON("");
    assertEquals(googleuserprofile, null);
  }

  @Test
  public void testGoogleUserProfile_toJSON() throws Exception {
    GoogleUserProfile googleuserprofile = GoogleUserProfile.fromJSON(googleUserString());
    assertEquals(googleuserprofile, GoogleUserProfile.fromJSON(googleuserprofile.toJSONString()));
  }
}
