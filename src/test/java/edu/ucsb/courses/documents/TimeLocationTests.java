package edu.ucsb.courses.documents;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.codebox.javabeantester.JavaBeanTester;


public class TimeLocationTests {
    private static Logger logger = LoggerFactory.getLogger(TimeLocationTests.class);

    @Test
    public void testGettersAndSetters() throws Exception {
      // See: https://github.com/codebox/javabean-tester
      JavaBeanTester.test(TimeLocation.class);
    }


    @Test
    public void test_notEqualNull() throws Exception {
        TimeLocation tl = new TimeLocation();
        assertNotEquals(tl, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        TimeLocation tl = new TimeLocation();
        assertNotEquals(tl, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        TimeLocation tl = new TimeLocation();
        tl.setDays(" T R   ");
        tl.setBeginTime("14:00");
        tl.setEndTime("15:15");
        assertEquals(tl, tl);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        TimeLocation tl1 = new TimeLocation();
        tl1.setDays(" T R   ");
        tl1.setBeginTime("14:00");
        tl1.setEndTime("15:15");
        TimeLocation tl2 = new TimeLocation();
        tl2.setDays(" T R   ");
        tl2.setBeginTime("14:00");
        tl2.setEndTime("15:15");
        assertEquals(tl1, tl2);
    }

    @Test
    public void test_hashCode() throws Exception {
        TimeLocation tl1 = new TimeLocation();
        tl1.setDays(" T R   ");
        tl1.setBeginTime("14:00");
        tl1.setEndTime("15:15");
        TimeLocation tl2 = new TimeLocation();
        tl2.setDays(" T R   ");
        tl2.setBeginTime("14:00");
        tl2.setEndTime("15:15");
        assertEquals(tl1.hashCode(), tl2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        TimeLocation tl1 = new TimeLocation();
        tl1.setDays(" T R   ");
        tl1.setBeginTime("14:00");
        tl1.setEndTime("15:15");
        String expected="{ room='null', building='null', roomCapacity='null', days=' T R   ', beginTime='14:00', endTime='15:15'}";
        assertEquals(expected, tl1.toString());
    }


}