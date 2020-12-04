package edu.ucsb.courses.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;

public class ScheduleItemTests {
  @Test
  public void testScheduleItem_toString() {
    ScheduleItem si = new ScheduleItem(123L, "W20", "CS       130A ", "Computer Science", "coding", "section toString", "genEd", "Final Exam");
    assertEquals("{ quarter='W20', courseId='CS       130A ', title='Computer Science', description='coding', classSection='section toString', generalEducation='genEd', finalExam='Final Exam'}", si.toString());
  }

  @Test
  public void testScheduleItem_getAndSetId() {
    ScheduleItem si = new ScheduleItem();
    si.setId(4L);
    assertEquals(4L, si.getId());
  }

  @Test
  public void testScheduleItem_getAndSetQuarter() {
      ScheduleItem si = new ScheduleItem();
      si.setQuarter("W20");
      assertEquals("W20", si.getQuarter());
  }

  @Test
  public void testScheduleItem_getAndSetCourseId() {
      ScheduleItem si = new ScheduleItem();
      si.setCourseId("CS130A");
      assertEquals("CS130A", si.getCourseId());
  }

  @Test
  public void testScheduleItem_getAndSetTitle() {
      ScheduleItem si = new ScheduleItem();
      si.setTitle("Computer Science");
      assertEquals("Computer Science", si.getTitle());
  }

  @Test
  public void testScheduleItem_getAndSetDescription() {
      ScheduleItem si = new ScheduleItem();
      si.setDescription("Coding");
      assertEquals("Coding", si.getDescription());
  }
  
  @Test
  public void testScheduleItem_getAndSetClassSection() {
      ScheduleItem si = new ScheduleItem();
      si.setClassSection("Section Data");
      assertEquals("Section Data", si.getClassSection());
  }

  @Test
  public void testScheduleItem_getAndSetGeneralEducation() {
      ScheduleItem si = new ScheduleItem();
      si.setGeneralEducation("Gen Ed Data");
      assertEquals("Gen Ed Data", si.getGeneralEducation());
  }

  @Test
  public void testScheduleItem_getAndSetFinalExam() {
      ScheduleItem si = new ScheduleItem();
      si.setFinalExam("Coding");
      assertEquals("Coding", si.getFinalExam());
  }
    
  @Test
  public void testScheduleItem_notEqualNull() {
    ScheduleItem si = new ScheduleItem();
    assertNotEquals(si, null);
  }

  @Test
  public void testScheduleItem_notEqualDifferentClass() {
    ScheduleItem si = new ScheduleItem();
    assertNotEquals(si, new Object());
  }

  @Test
  public void testScheduleItem_equalsSelf() {
    ScheduleItem si = new ScheduleItem();
    assertEquals(si, si);
  }

  @Test
  public void testScheduleItem_equalsCopy() {
    ScheduleItem si1 = new ScheduleItem();
    ScheduleItem si2 = new ScheduleItem();
    assertEquals(si1, si2);
  }
    
    
  @Test
  public void test_hashCode() throws Exception {
      ScheduleItem si1 = new ScheduleItem(123L, "W20", "CS       130A ", "Computer Science", "coding", "section toString", "genEd", "Final Exam");
      ScheduleItem si2 = new ScheduleItem(123L, "W20", "CS       130A ", "Computer Science", "coding", "section toString", "genEd", "Final Exam");
      assertEquals(si1.hashCode(), si2.hashCode());
  }
}
