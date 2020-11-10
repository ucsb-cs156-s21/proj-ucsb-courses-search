package edu.ucsb.demonextjsspringtodoapp.services;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.ArrayList;
import java.util.List;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import edu.ucsb.demonextjsspringtodoapp.entities.AppUser;
import edu.ucsb.demonextjsspringtodoapp.services.MembershipServiceTests;

public class MembershipServiceTests {

  private DecodedJWT exampleJWT = JWT.decode(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M");

  private AppUser exampleUser = new AppUser(1L, "test@ucsb.edu", "Test", "User");

  private MembershipService serviceNotMemberOrAdmin = new MembershipService() {
    @Override
    public boolean isMember(DecodedJWT jwt) {
      return false;
    }

    @Override
    public boolean isAdmin(DecodedJWT jwt) {
      return false;
    }

    @Override
    public boolean isMember(AppUser user) {
      return false;
    }

    @Override
    public boolean isAdmin(AppUser user) {
      return false;
    }

    @Override
    public List<String> getDefaultAdminEmails() {
      return new ArrayList<String>();
    }

  };

  private MembershipService serviceOnlyAdmin = new MembershipService() {
    @Override
    public boolean isMember(DecodedJWT jwt) {
      return false;
    }

    @Override
    public boolean isAdmin(DecodedJWT jwt) {
      return true;
    }

    @Override
    public boolean isMember(AppUser user) {
      return false;
    }

    @Override
    public boolean isAdmin(AppUser user) {
      return true;
    }

    @Override
    public List<String> getDefaultAdminEmails() {
      return new ArrayList<String>();
    }
  };

  private MembershipService serviceOnlyMember = new MembershipService() {
    @Override
    public boolean isMember(DecodedJWT jwt) {
      return true;
    }

    @Override
    public boolean isAdmin(DecodedJWT jwt) {
      return false;
    }

    @Override
    public boolean isMember(AppUser user) {
      return true;
    }

    @Override
    public boolean isAdmin(AppUser user) {
      return false;
    }

    @Override
    public List<String> getDefaultAdminEmails() {
      return new ArrayList<String>();
    }
  };

  private MembershipService serviceBothMemberAndAdmin = new MembershipService() {
    @Override
    public boolean isMember(DecodedJWT jwt) {
      return true;
    }

    @Override
    public boolean isAdmin(DecodedJWT jwt) {
      return true;
    }

    @Override
    public boolean isMember(AppUser user) {
      return true;
    }

    @Override
    public boolean isAdmin(AppUser user) {
      return true;
    }

    @Override
    public List<String> getDefaultAdminEmails() {
      return new ArrayList<String>();
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
    assertEquals("Guest", serviceNotMemberOrAdmin.role((DecodedJWT) null));
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

  @Test
  public void testMemberShipService_roleWorksForBothUserAndToken() {
    assertEquals(serviceOnlyMember.role(exampleJWT), serviceOnlyMember.role(exampleUser));
    assertEquals(serviceOnlyAdmin.role(exampleJWT), serviceOnlyAdmin.role(exampleUser));
    assertEquals(serviceNotMemberOrAdmin.role(exampleJWT),
        serviceNotMemberOrAdmin.role(exampleUser));
  }
}
