package edu.ucsb.demonextjsspringtodoapp.advice;

import java.util.List;
import java.util.Map;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import edu.ucsb.demonextjsspringtodoapp.entities.Admin;
import edu.ucsb.demonextjsspringtodoapp.entities.AppUser;
import edu.ucsb.demonextjsspringtodoapp.repositories.AdminRepository;
import edu.ucsb.demonextjsspringtodoapp.repositories.AppUserRepository;
import edu.ucsb.demonextjsspringtodoapp.services.MembershipService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AuthControllerAdvice {
  private final Logger logger = LoggerFactory.getLogger(AuthControllerAdvice.class);

  @Value("${app.namespace}")
  private String namespace;

  @Autowired
  private MembershipService service;

  @Autowired
  private AppUserRepository appUserRepository;

  @Autowired
  private AdminRepository adminRepository;

  public DecodedJWT getJWT(String authorization) {
    return JWT.decode(authorization.substring(7));
  }

  public AppUser getUser(String authorization) {
    return updateAppUsers(authorization);
  }

  public String getRole(String authorization) {
    return service.role(getJWT(authorization));
  }

  public String getRole(AppUser user) {
    return service.role(user);
  }

  public boolean getIsAdmin(String authorization) {
    return service.isAdmin(getJWT(authorization));
  }

  public boolean getIsMember(String authorization) {
    return service.isMember(getJWT(authorization));
  }


  private AppUser updateAppUsers(String authorization) {
    DecodedJWT jwt = getJWT(authorization);
    Map<String, Object> customClaims = jwt.getClaim(namespace).asMap();
    String email = (String) customClaims.get("email");
    List<AppUser> users = appUserRepository.findByEmail(email);

    if (users.isEmpty()) {
      AppUser user = new AppUser();
      user.setEmail(email);
      user.setFirstName((String) customClaims.get("given_name"));
      user.setLastName((String) customClaims.get("family_name"));
      if (getIsAdmin(authorization)) {
        Admin admin = new Admin(email, true);
        adminRepository.save(admin);
      }
      return appUserRepository.save(user);
    }

    updateAdmins(authorization, email);

    return users.get(0);
  }

  private void updateAdmins(String authorization, String email) {
    if (getIsAdmin(authorization) && adminRepository.findByEmail(email).size() == 0) {
      boolean isPermanentAdmin = service.getDefaultAdminEmails().contains(email);
      adminRepository.save(new Admin(email, isPermanentAdmin));
    }
  }
}
