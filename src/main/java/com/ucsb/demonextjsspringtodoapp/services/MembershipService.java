package com.ucsb.demonextjsspringtodoapp.services;

import com.auth0.jwt.interfaces.DecodedJWT;

public interface MembershipService {

  /**
   * is current logged in user a member but NOT an admin of the github org
   */
  public boolean isMember(DecodedJWT jwt);

  /** is current logged in user a member of the github org */
  public boolean isAdmin(DecodedJWT jwt);


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

