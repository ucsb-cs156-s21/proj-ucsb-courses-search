package com.ucsb.demonextjsspringtodoapp.repositories;

import java.util.List;

import com.ucsb.demonextjsspringtodoapp.models.Todo;

import org.springframework.data.repository.CrudRepository;

public interface TodoRepository extends CrudRepository<Todo, Long> {
  List<Todo> findByUserId(String userId);
}