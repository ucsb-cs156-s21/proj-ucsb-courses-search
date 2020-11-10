package edu.ucsb.courses.services;

import java.util.List;
import com.auth0.jwt.interfaces.DecodedJWT;
import edu.ucsb.courses.entities.Admin;
import edu.ucsb.courses.entities.AppUser;

public interface MembershipService {

  /**
   * is current logged in user a member but NOT an admin of the github org
   */
  public boolean isMember(DecodedJWT jwt);

  /** is current logged in user a member of the github org */
  public boolean isAdmin(DecodedJWT jwt);

  public boolean isMember(AppUser user);

  public boolean isAdmin(AppUser user);

  public List<String> getDefaultAdminEmails();

  default public String role(AppUser user) {
    if (isAdmin(user))
      return "Admin";
    if (isMember(user))
      return "Member";
    return "Guest";
  }

  /**
   * is current logged in user a member or admin of the github org
   */
  default public boolean isMemberOrAdmin(DecodedJWT jwt) {
    return isMember(jwt) || isAdmin(jwt);
  }

  default public String role(DecodedJWT jwt) {
    if (jwt == null)
      return "Guest";
    if (isAdmin(jwt))
      return "Admin";
    if (isMember(jwt))
      return "Member";

    return "Guest";
  }
}

