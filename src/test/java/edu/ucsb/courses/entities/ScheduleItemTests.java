package edu.ucsb.courses.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;
import net.codebox.javabeantester.JavaBeanTester;

public class ScheduleItemTests {
  @Test
  public void testScheduleItem_toString() {
    ScheduleItem si = new ScheduleItem(123L, "07492", "07493", new AppUser(), new Schedule());
    String expected = "{ id='123', lectureCode='07492', discussionCode='07493', appUser='AppUser[ id=0, email=null, firstName=null, lastName=null ]', schedule='Schedule[ id=null, name=null, description=null, quarter=null, userId=null ]'}";
    assertEquals( expected, si.toString());
  }

  @Test
  public void testGettersAndSetters() throws Exception {
    // See: https://github.com/codebox/javabean-tester
    JavaBeanTester.test(ScheduleItem.class);
  }
    
  @Test
  public void testScheduleItem_notEqualNull() throws Exception {
    ScheduleItem si = new ScheduleItem(123L, "07492", "07493", new AppUser(), new Schedule());
    assertNotEquals(si, null);
  }

  @Test
  public void testScheduleItem_notEqualDifferentClass() throws Exception {
    ScheduleItem si = new ScheduleItem(123L, "07492", "07493", new AppUser(), new Schedule());
    assertNotEquals(si, new Object());
  }

  @Test
  public void testScheduleItem_equalsSelf() throws Exception{
    ScheduleItem si = new ScheduleItem(123L, "07492", "07493", new AppUser(), new Schedule());
    assertEquals(si, si);
  }

  @Test
  public void testScheduleItem_equalsCopy()throws Exception{
    ScheduleItem si1 = new ScheduleItem(123L, "07492", "07493", new AppUser(), new Schedule());
    ScheduleItem si2 = new ScheduleItem(123L, "07492", "07493", new AppUser(), new Schedule());
    assertEquals(si1, si2);
  }
    
    
  @Test
  public void test_hashCode() throws Exception{
    ScheduleItem si1 = new ScheduleItem(1L, "07492", "07493", new AppUser(), new Schedule());
    ScheduleItem si2 = new ScheduleItem(1L, "07492", "07493", new AppUser(), new Schedule());
    assertEquals(si1.hashCode(), si2.hashCode());
  }
}