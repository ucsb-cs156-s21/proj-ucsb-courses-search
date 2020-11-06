package com.ucsb.demonextjsspringtodoapp.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
}
