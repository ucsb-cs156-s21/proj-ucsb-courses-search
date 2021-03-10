
package edu.ucsb.courses.repositories;

import java.util.List;

import edu.ucsb.courses.entities.Schedule;
import edu.ucsb.courses.entities.ScheduleItem;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleItemRepository extends CrudRepository<ScheduleItem, Long> {
  List<ScheduleItem> findByScheduleId(Long id);
  void deleteByScheduleId(Long id);
}
