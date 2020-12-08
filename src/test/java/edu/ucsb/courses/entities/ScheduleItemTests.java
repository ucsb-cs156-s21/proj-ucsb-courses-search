package edu.ucsb.courses.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;

public class ScheduleItemTests {
  @Test
  public void testScheduleItem_toString() {
      ScheduleItem si = new ScheduleItem(123L, "CS       130A ", "07492","", 4L);
    assertEquals("{id=123 courseId='CS       130A ', enrollCode='07492', scheduleId='4}", si.toString());
  }

  @Test
  public void testScheduleItem_getAndSetId() {
      ScheduleItem si = new ScheduleItem(123L, "CS       130A ", "07492","", 4L);
    si.setId(4L);
    assertEquals(4L, si.getId());
  }

  @Test
  public void testScheduleItem_getAndSetQuarter() {
      ScheduleItem si = new ScheduleItem(123L, "CS       130A ", "07492","", 4L);
      si.setEnrollCode("07493");
      assertEquals("07493", si.getEnrollCode());
  }

  @Test
  public void testScheduleItem_getAndSetCourseId() {
      ScheduleItem si = new ScheduleItem(123L, "CS       130A ", "07492","", 4L);
      si.setCourseId("CS130A");
      assertEquals("CS130A", si.getCourseId());
  }

    @Test
    public void testScheduleItem_getAndSetScheduleId() {
        ScheduleItem si = new ScheduleItem(123L, "CS       130A ", "07492","", 4L);
        si.setScheduleId(4L);
        assertEquals(4L, si.getScheduleId());
    }

    
  @Test
  public void testScheduleItem_notEqualNull() {
      ScheduleItem si = new ScheduleItem(123L, "CS       130A ", "07492","", 4L);
    assertNotEquals(si, null);
  }

  @Test
  public void testScheduleItem_notEqualDifferentClass() {
      ScheduleItem si = new ScheduleItem(123L, "CS       130A ", "07492","", 4L);
    assertNotEquals(si, new Object());
  }

  @Test
  public void testScheduleItem_equalsSelf() {
      ScheduleItem si = new ScheduleItem(123L, "CS       130A ", "07492","", 4L);
    assertEquals(si, si);
  }

  @Test
  public void testScheduleItem_equalsCopy() {
      ScheduleItem si1 = new ScheduleItem(123L, "CS       130A ", "07492","", 4L);
      ScheduleItem si2 = new ScheduleItem(123L, "CS       130A ", "07492","", 4L);
      assertEquals(si1, si2);
  }
    
    
  @Test
  public void test_hashCode() {
      ScheduleItem si1 = new ScheduleItem(123L, "CS       130A ", "07492","", 4L);
      ScheduleItem si2 = new ScheduleItem(123L, "CS       130A ", "07492","", 4L);
      assertEquals(si1.hashCode(), si2.hashCode());
  }
}
