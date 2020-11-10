package edu.ucsb.demonextjsspringtodoapp.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;

public class AppUserTests {

  @Test
  public void testAppUser_toString() {
    AppUser user = new AppUser(1L, "test@test.org", "test", "user");
    assertEquals(user.toString(),
        "AppUser[ id=1, email=test@test.org, firstName=test, lastName=user ]");
  }

  @Test
  public void testAppUser_getAndSetId() {
    AppUser user = new AppUser();
    user.setId(1);
    assertEquals(1, user.getId());
  }

  @Test
  public void testAppUser_getAndSetEmail() {
    AppUser user = new AppUser();
    user.setEmail("test@example.com");
    assertEquals("test@example.com", user.getEmail());
  }

  @Test
  public void testAppUser_getAndSetFirstName() {
    AppUser user = new AppUser();
    user.setFirstName("Mary");
    assertEquals("Mary", user.getFirstName());
  }

  @Test
  public void testAppUser_getAndSetLastName() {
    AppUser user = new AppUser();
    user.setLastName("Doris");
    assertEquals("Doris", user.getLastName());
  }

  @Test
  public void testAppUser_notEqualNull() throws Exception {
    AppUser user = new AppUser();
    assertNotEquals(user, null);
  }

  @Test
  public void testAppUser_notEqualAnotherClass() throws Exception {
    AppUser user = new AppUser();
    assertNotEquals(user, new Object());
  }

  @Test
  public void testAppUser_equalsSelf() throws Exception {
    AppUser user = new AppUser(1L, "test@ucsb.edu", "Test", "User");
    assertEquals(user, user);
  }

  @Test
  public void testAppUser_equalsAnother() throws Exception {
    AppUser user1 = new AppUser(1L, "test@ucsb.edu", "Test", "User");
    AppUser user2 = new AppUser(1L, "test@ucsb.edu", "Test", "User");
    assertEquals(user1, user2);
  }
}
