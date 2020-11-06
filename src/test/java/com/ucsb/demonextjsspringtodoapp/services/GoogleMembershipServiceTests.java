package com.ucsb.demonextjsspringtodoapp.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ucsb.demonextjsspringtodoapp.entities.Admin;
import com.ucsb.demonextjsspringtodoapp.repositories.AdminRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(SpringExtension.class)
public class GoogleMembershipServiceTests {

  @MockBean
  AdminRepository adminRepository;
  @InjectMocks
  GoogleMembershipService service = new GoogleMembershipService();

  private DecodedJWT guestJWT = JWT.decode(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20ifQ.8yslpthMLMpwnlSctV5HN-fFJkKinpil61dJmw1m9Oc");

  private DecodedJWT memberJWT = JWT.decode(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsImVtYWlsIjoidGVzdEB1Y3NiLmVkdSJ9.paEMa69zK4AyN3PsNOGQsgovzexFzBKrR80Wa64TY7Y");

  @BeforeEach
  public void setUp() {
    ReflectionTestUtils.setField(service, "memberHostedDomain", "ucsb.edu");
    ReflectionTestUtils.setField(service, "adminRepository", adminRepository);
  }

  @Test
  public void testGoogleMembershipService_isNotMemberOrAdmin_ifJWTIsNull() {
    assertEquals(false, service.isAdmin(null));
    assertEquals(false, service.isMember(null));
  }

  @Test
  public void testGoogleMembershipService_isNotMemberOrAdmin_ifEmailNotInOrg() {
    assertEquals(false, service.isMember(guestJWT));
  }

  @Test
  public void testGoogleMembershipService_isMember_ifEmailInOrg() {
    assertEquals(true, service.isMember(memberJWT));
  }

  @Test
  public void testGoogleMembershipService_isAdmin_ifAdminExistsWithEmail() {
    List<Admin> admins = new ArrayList<Admin>();
    admins.add(new Admin());
    when(adminRepository.findByEmail(any())).thenReturn(admins);
    assertEquals(true, service.isAdmin(memberJWT));
  }

  @Test
  public void testGoogleMembershipService_isNotAdmin_ifDoesNotExistsWithEmail() {
    List<Admin> admins = new ArrayList<Admin>();
    when(adminRepository.findByEmail(any())).thenReturn(admins);
    assertEquals(false, service.isAdmin(memberJWT));
  }
}
