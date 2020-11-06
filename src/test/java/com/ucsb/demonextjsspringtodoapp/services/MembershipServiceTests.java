package com.ucsb.demonextjsspringtodoapp.services;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ucsb.demonextjsspringtodoapp.services.MembershipServiceTests;

public class MembershipServiceTests {

  private DecodedJWT exampleJWT = JWT.decode(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M");

  private MembershipService serviceNotMemberOrAdmin = new MembershipService() {
    public boolean isMember(DecodedJWT jwt) {
      return false;
    }

    public boolean isAdmin(DecodedJWT jwt) {
      return false;
    }
  };

  private MembershipService serviceOnlyAdmin = new MembershipService() {
    public boolean isMember(DecodedJWT jwt) {
      return false;
    }

    public boolean isAdmin(DecodedJWT jwt) {
      return true;
    }
  };

  private MembershipService serviceOnlyMember = new MembershipService() {
    public boolean isMember(DecodedJWT jwt) {
      return true;
    }

    public boolean isAdmin(DecodedJWT jwt) {
      return false;
    }
  };

  private MembershipService serviceBothMemberAndAdmin = new MembershipService() {
    public boolean isMember(DecodedJWT jwt) {
      return false;
    }

    public boolean isAdmin(DecodedJWT jwt) {
      return true;
    }
  };


  @Test
  public void testMembershipService_isMemberOrAdmin_notMemberOrAdmin() {
    assertEquals(false, serviceNotMemberOrAdmin.isMemberOrAdmin(null));
  }

  @Test
  public void testMembershipService_isMemberOrAdmin_isMemberOrAdmin() {
    assertEquals(true, serviceOnlyMember.isMemberOrAdmin(null));
    assertEquals(true, serviceOnlyAdmin.isMemberOrAdmin(null));
    assertEquals(true, serviceBothMemberAndAdmin.isMemberOrAdmin(null));
  }

  @Test
  public void testMemberShipService_roleIsGuest_whenJWTIsNull() {
    assertEquals("Guest", serviceNotMemberOrAdmin.role(null));
  }

  @Test
  public void testMemberShipService_roleIsGuest_whenJWTExists_butUserIsNotAdminOrMember() {
    assertEquals("Guest", serviceNotMemberOrAdmin.role(exampleJWT));
  }

  @Test
  public void testMemberShipService_roleIsMember_whenJWTExists_andUserIsMember() {
    assertEquals("Member", serviceOnlyMember.role(exampleJWT));
  }

  @Test
  public void testMemberShipService_roleIsAdmin_whenJWTExists_andUserIsAdmin() {
    assertEquals("Admin", serviceOnlyAdmin.role(exampleJWT));
    assertEquals("Admin", serviceBothMemberAndAdmin.role(exampleJWT));
  }
}
