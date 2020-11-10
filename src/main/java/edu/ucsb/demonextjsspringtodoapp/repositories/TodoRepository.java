package edu.ucsb.demonextjsspringtodoapp.repositories;

import java.util.List;

import edu.ucsb.demonextjsspringtodoapp.entities.Todo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends CrudRepository<Todo, Long> {
  List<Todo> findByUserId(String userId);
}
