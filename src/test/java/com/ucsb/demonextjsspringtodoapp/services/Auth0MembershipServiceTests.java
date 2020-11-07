package com.ucsb.demonextjsspringtodoapp.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ucsb.demonextjsspringtodoapp.entities.Admin;
import com.ucsb.demonextjsspringtodoapp.entities.AppUser;
import com.ucsb.demonextjsspringtodoapp.repositories.AdminRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(SpringExtension.class)
public class Auth0MembershipServiceTests {

  @MockBean
  AdminRepository adminRepository;
  @InjectMocks
  Auth0MembershipService service = new Auth0MembershipService();

  private DecodedJWT guestJWT = JWT.decode(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lc3BhY2UiOnsiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSJ9LCJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.6kcYK01GnVjCMELcgUyFJBYe1DeQ9y4NngDgYdwYwqE");

  private DecodedJWT memberJWT = JWT.decode(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lc3BhY2UiOnsiZW1haWwiOiJ0ZXN0QHVjc2IuZWR1In0sInN1YiI6IjEyMzQ1NiIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.RnoI4IH5bgp4uWd8VxKyVLrUTYu_JnUUhLpAaWc-0G4");

  private DecodedJWT defaultAdminJWT = JWT.decode(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lc3BhY2UiOnsiZW1haWwiOiJhZG1pbkB1Y3NiLmVkdSJ9LCJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.DhnSeuqo6YCsdb6qYV5AKsY_xrCZzZ6RHxnVP8WsiC0");

  private AppUser exampleUser = new AppUser(1L, "test@ucsb.edu", "Test", "User");

  private AppUser exampleUser = new AppUser(1L, "test@ucsb.edu", "Test", "User");

  @BeforeEach
  public void setUp() {
    ReflectionTestUtils.setField(service, "memberHostedDomain", "ucsb.edu");
    ReflectionTestUtils.setField(service, "adminRepository", adminRepository);
    ReflectionTestUtils.setField(service, "namespace", "namespace");
  }

  @Test
  public void testAuth0MembershipService_isNotMemberOrAdmin_ifJWTIsNull() {
    assertEquals(false, service.isAdmin((DecodedJWT) null));
    assertEquals(false, service.isMember((DecodedJWT) null));
  }

  @Test
  public void testAuth0MembershipService_isNotMemberOrAdmin_ifEmailNotInOrg() {
    assertEquals(false, service.isMember(guestJWT));
  }

  @Test
  public void testAuth0MembershipService_isMember_ifEmailInOrg() {
    assertEquals(true, service.isMember(memberJWT));
  }

  @Test
  public void testAuth0MembershipService_isAdmin_ifAdminExistsWithEmail() {
    List<Admin> admins = new ArrayList<Admin>();
    admins.add(new Admin());
    when(adminRepository.findByEmail(any())).thenReturn(admins);
    assertEquals(true, service.isAdmin(memberJWT));
  }

  @Test
  public void testAuth0MembershipService_isAdmin_ifEmailIsDefaultAdmin() {
    List<String> adminEmails = new ArrayList<String>();
    adminEmails.add("admin@ucsb.edu");
    ReflectionTestUtils.setField(service, "adminEmails", adminEmails);
    assertEquals(true, service.isAdmin(defaultAdminJWT));
  }

  @Test
  public void testAuth0MembershipService_isNotAdmin_ifDoesNotExistsWithEmail() {
    List<Admin> admins = new ArrayList<Admin>();
    when(adminRepository.findByEmail(any())).thenReturn(admins);
    assertEquals(false, service.isAdmin(memberJWT));
  }

  @Test
  public void testAuth0MembershipService_isMember_acceptsAppUser() {

    assertEquals(true, service.isMember(exampleUser));
  }

  @Test
  public void testAuth0MembershipService_isAdmin_acceptsAppUser() {
    List<Admin> admins = new ArrayList<Admin>();
    admins.add(new Admin(exampleUser.getEmail(), false));
    when(adminRepository.findByEmail(any())).thenReturn(admins);
    assertEquals(true, service.isAdmin(exampleUser));
  }
}
