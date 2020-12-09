package edu.ucsb.courses.repositories;

import java.util.List;

import edu.ucsb.courses.entities.Schedule;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepository extends CrudRepository<Schedule, Long> {
  List<Schedule> findAll();
  List<Schedule> findByUserId(String userId);
}