package edu.ucsb.courses.repositories;

import java.util.List;

import edu.ucsb.courses.entities.ScheduleItem;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleItemRepository extends CrudRepository<ScheduleItem, Long> {
  List<ScheduleItem> findBySchedule_id(Long schedule_id);
  void deleteBySchedule_id(Long schedule_id);
}