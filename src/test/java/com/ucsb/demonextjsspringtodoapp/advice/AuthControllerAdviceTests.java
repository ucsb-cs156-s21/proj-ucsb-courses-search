package com.ucsb.demonextjsspringtodoapp.advice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
<<<<<<< HEAD
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
=======
>>>>>>> sc - add AuthControllerAdvice + update TodoController to use it
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
<<<<<<< HEAD
import com.ucsb.demonextjsspringtodoapp.entities.Admin;
import com.ucsb.demonextjsspringtodoapp.entities.AppUser;
import com.ucsb.demonextjsspringtodoapp.repositories.AdminRepository;
=======
import com.ucsb.demonextjsspringtodoapp.entities.AppUser;
>>>>>>> sc - add AuthControllerAdvice + update TodoController to use it
import com.ucsb.demonextjsspringtodoapp.repositories.AppUserRepository;
import com.ucsb.demonextjsspringtodoapp.services.Auth0MembershipService;
import com.ucsb.demonextjsspringtodoapp.services.MembershipService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
public class AuthControllerAdviceTests {

  @InjectMocks
  AuthControllerAdvice authControllerAdvice;

  @Mock
  MembershipService mockMembershipService;
  @Mock
  AppUserRepository mockAppUserRepository;
<<<<<<< HEAD
  @Mock
  AdminRepository mockAdminRepository;
=======
>>>>>>> sc - add AuthControllerAdvice + update TodoController to use it

  private String exampleAuthToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL3Rlc3QtYXBwLmNvbSI6eyJlbWFpbCI6InRlc3RAdWNzYi5lZHUiLCJnaXZlbl9uYW1lIjoiVGVzdCIsImZhbWlseV9uYW1lIjoiVXNlciJ9LCJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.s0eGBAgVvby7Y7Q34qI1E7HqqFbrneIhvzpC_MI-B30";

  private AppUser exampleUser = new AppUser(1L, "test@ucsb.edu", "Test", "User");

  @BeforeEach
  public void setUp() {
    ReflectionTestUtils.setField(authControllerAdvice, "namespace", "https://test-app.com");
  }

  @Test
  public void test_getJWT() {
    DecodedJWT jwt = authControllerAdvice.getJWT(exampleAuthToken);
    assertEquals("John Doe", jwt.getClaim("name").asString());
  }

  @Test
  public void test_getUser_alreadyExists() {
    List<AppUser> users = new ArrayList<AppUser>();
    users.add(exampleUser);
    when(mockAppUserRepository.findByEmail(exampleUser.getEmail())).thenReturn(users);
    assertEquals(exampleUser, authControllerAdvice.getUser(exampleAuthToken));
  }

  @Test
  public void test_getUser_createNewUser() {
    when(mockAppUserRepository.save(any(AppUser.class))).thenReturn(exampleUser);
    assertEquals(exampleUser, authControllerAdvice.getUser(exampleAuthToken));
  }

  @Test
<<<<<<< HEAD
  public void test_getUser_createNewUserAndAdmin() {
    when(mockAppUserRepository.save(any(AppUser.class))).thenReturn(exampleUser);
    when(mockMembershipService.isAdmin(any(DecodedJWT.class))).thenReturn(true);
    assertEquals(exampleUser, authControllerAdvice.getUser(exampleAuthToken));
    verify(mockAdminRepository, times(1)).save(new Admin(exampleUser.getEmail(), true));
  }

  @Test
  public void test_getRole() {
    when(mockMembershipService.role(any(DecodedJWT.class))).thenReturn("Member");
=======
  public void test_getRole() {
    when(mockMembershipService.role(any())).thenReturn("Member");
>>>>>>> sc - add AuthControllerAdvice + update TodoController to use it
    assertEquals("Member", authControllerAdvice.getRole(exampleAuthToken));
  }

  @Test
<<<<<<< HEAD
  public void test_getRole_withAppUser() {
    when(mockMembershipService.role(any(AppUser.class))).thenReturn("Member");
    assertEquals("Member", authControllerAdvice.getRole(exampleUser));
  }

  @Test
=======
>>>>>>> sc - add AuthControllerAdvice + update TodoController to use it
  public void test_getIsMember() {
    when(mockMembershipService.isMember(any(DecodedJWT.class))).thenReturn(true);
    assertTrue(authControllerAdvice.getIsMember(exampleAuthToken));
  }

  @Test
  public void test_getIsAdmin() {
    when(mockMembershipService.isAdmin(any(DecodedJWT.class))).thenReturn(true);
    assertTrue(authControllerAdvice.getIsAdmin(exampleAuthToken));
  }
}
