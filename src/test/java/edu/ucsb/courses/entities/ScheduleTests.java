package edu.ucsb.courses.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;

public class ScheduleTests {
  @Test
  public void testSchedule_notEqualNull() throws Exception {
    long id = Long.parseLong("1");
    Schedule schedule = new Schedule(id,"","","F20","1");
    assertNotEquals(schedule, null);
  }

  @Test
  public void testSchedule_gettersAndSetters() throws Exception {
    long id = Long.parseLong("1");
    Schedule schedule = new Schedule(id,"","","F20","1");
    assertEquals(schedule.getId(),id);
    assertEquals(schedule.getName(),"");
    assertEquals(schedule.getDescription(),"");
    assertEquals(schedule.getQuarter(), "F20");
    assertEquals(schedule.getUserId(), "1");

    id = Long.parseLong("2");
    schedule.setId(id);
    schedule.setName("Test schedule");
    schedule.setDescription("Favorite");
    schedule.setQuarter("W21");
    schedule.setUserId("2");
    assertEquals(schedule.getId(),id);
    assertEquals(schedule.getName(),"Test schedule");
    assertEquals(schedule.getDescription(),"Favorite");
    assertEquals(schedule.getQuarter(), "W21");
    assertEquals(schedule.getUserId(), "2");
  }

  @Test
  public void testSchedule_notEqualAnotherSchedule() throws Exception {
    long id = Long.parseLong("1");
    Schedule schedule = new Schedule(id,"","","F20","1");
    long id2 = Long.parseLong("2");
    Schedule schedule2 = new Schedule(id2,"","","F20","1");
    assertNotEquals(schedule, new Object());
    assertNotEquals(schedule, schedule2);
  }

  @Test
  public void testSchedule_equalsSelf() throws Exception {
    long id = Long.parseLong("1");
    Schedule schedule = new Schedule(id,"","","F20","1");
    assertEquals(schedule, schedule);
  }

  @Test
  public void testSchedule_toString() throws Exception {
    long id = Long.parseLong("1");
    Schedule schedule = new Schedule(id,"","","F20","1");
    assertEquals(schedule.toString(), "Schedule[ id=1, name=, description=, quarter=F20, userId=1 ]");
  }

  @Test
  public void testSchedule_hashCode(){
    long id = Long.parseLong("1");
    Schedule s1 = new Schedule(id,"Test","A test schedule.","F20","1");
    Schedule s2 = new Schedule(id,"Test","A test schedule.","F20","1");
    assertEquals(s1.hashCode(),s2.hashCode());
  }
}