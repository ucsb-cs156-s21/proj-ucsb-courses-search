package edu.ucsb.courses.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;

public class AdminTests {
  @Test
  public void testAdmin_toString() {
    Admin admin = new Admin("admin@test.org", false);
    assertEquals("Admin[ id=0, email=admin@test.org, isPermanentAdmin=false ]", admin.toString());

    Admin admin2 = new Admin("admin@test.org");
    assertEquals("Admin[ id=0, email=admin@test.org, isPermanentAdmin=false ]", admin2.toString());
  }

  @Test
  public void testAdmin_getAndSetId() {
    Admin admin = new Admin();
    admin.setId(4L);
    assertEquals(4L, admin.getId());
  }

  @Test
  public void testAdmin_getAndSetEmail() {
    Admin admin = new Admin();
    admin.setEmail("conrad@ucsb.edu");
    assertEquals("conrad@ucsb.edu", admin.getEmail());
  }

  @Test
  public void testAdmin_getAndSetIsPermanentAdmin() {
    Admin admin = new Admin();
    admin.setIsPermanentAdmin(true);
    assertEquals(true, admin.getIsPermanentAdmin());
  }

  @Test
  public void testAdmin_notEqualNull() {
    Admin admin = new Admin();
    assertNotEquals(admin, null);
  }

  @Test
  public void testAdmin_notEqualDifferentClass() {
    Admin admin = new Admin();
    assertNotEquals(admin, new Object());
  }

  @Test
  public void testAdmin_equalsSelf() {
    Admin admin = new Admin();
    assertEquals(admin, admin);
  }

  @Test
  public void testAdmin_equalsCopy() {
    Admin admin1 = new Admin();
    Admin admin2 = new Admin();
    assertEquals(admin1, admin2);
  }
}
