package com.ucsb.demonextjsspringtodoapp.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ucsb.demonextjsspringtodoapp.repositories.AdminRepository;

/**
 * Service object that determines whether a user is a member of the google org or not.
 */
@Service
public class GoogleMembershipService implements MembershipService {

  private Logger logger = LoggerFactory.getLogger(GoogleMembershipService.class);


  @Value("${app.member.hosted-domain}")
  private String memberHostedDomain;

  @Autowired
  private AdminRepository adminRepository;

  /**
   * is current logged in user a member but NOT an admin of the google org
   *
   * @param jwt The decoded JSON Web Token that contains all of the user's claims/information
   * @return if the current jwt corresponds to a member
   */
  public boolean isMember(DecodedJWT jwt) {
    return hasRole(jwt, "member");
  }

  /**
   * is current logged in user a member of the google org
   *
   * @param jwt The decoded JSON Web Token that contains all of the user's claims/information
   * @return if the current jwt corresponds to an admin
   */
  public boolean isAdmin(DecodedJWT jwt) {
    return hasRole(jwt, "admin");
  }

  /**
   * is current logged in user has role
   *
   * @param roleToTest "member" or "admin"
   * @return if the current logged in user has that role
   */
  private boolean hasRole(DecodedJWT jwt, String roleToTest) {
    if (jwt == null)
      return false;

    String email = jwt.getClaim("email").asString();
    String hostedDomain = email.substring(email.indexOf("@") + 1);

    logger.info("email=[" + email + "]");
    logger.info("hostedDomain=" + hostedDomain);

    if (roleToTest.equals("admin") && isAdminEmail(email)) {
      return true;
    }

    if (roleToTest.equals("member") && memberHostedDomain.equals(hostedDomain)) {
      return true;
    }

    return false;
  }

  private boolean isAdminEmail(String email) {
    return (!adminRepository.findByEmail(email).isEmpty());
  }
}
