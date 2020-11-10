package edu.ucsb.demonextjsspringtodoapp.repositories;

import edu.ucsb.demonextjsspringtodoapp.entities.AppUser;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepository extends CrudRepository<AppUser, Long> {
  public List<AppUser> findByEmail(String email);
}
