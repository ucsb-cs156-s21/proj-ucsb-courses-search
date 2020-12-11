package edu.ucsb.courses.documents.statistics;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNull;

import java.util.List;

import org.junit.jupiter.api.Test;

import net.codebox.javabeantester.JavaBeanTester;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DivisionOccupancyTests {

    private static Logger logger = LoggerFactory.getLogger(DivisionOccupancyTests.class);

    @Test
    public void testGettersAndSetters() throws Exception {
        // See: https://github.com/codebox/javabean-tester
        // The classes that should NOT be tested with the Bean are the
        // ones that set and get List<> instances
        JavaBeanTester.test(DivisionOccupancy.class, "courseId");
    }

    @Test
    public void test_getCourseId() {
        DivisionOccupancy qd = new DivisionOccupancy("20204","PROBLEM SOLVING II","CMPSC   24 ", "56", "70");
        assertEquals(qd.getCourseId(), "CMPSC 24");
    }

    @Test
    public void test_setCourseId() {
        DivisionOccupancy qd = new DivisionOccupancy("20204","PROBLEM SOLVING II","CMPSC    24  ", "56", "70");
        qd.setCourseId("CMPSC 24");
        assertEquals(qd.getCourseId(), "CMPSC 24");
    }

    @Test
    public void test_notEqualNull() throws Exception {
        DivisionOccupancy qd = new DivisionOccupancy();
        assertNotEquals(qd, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        DivisionOccupancy qd = new DivisionOccupancy();
        assertNotEquals(qd, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        DivisionOccupancy qd = new DivisionOccupancy("20204","PROBLEM SOLVING II","CMPSC 24", "56", "70");
        assertEquals(qd, qd);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        DivisionOccupancy qd1 = new DivisionOccupancy("20204","PROBLEM SOLVING II","CMPSC 24", "56", "70");
        DivisionOccupancy qd2 = new DivisionOccupancy("20204","PROBLEM SOLVING II","CMPSC 24", "56", "70");
        assertEquals(qd1, qd2);
    }

    @Test
    public void test_hashCode() throws Exception {
        DivisionOccupancy qd1 = new DivisionOccupancy("20204","PROBLEM SOLVING II","CMPSC 24", "56", "70");
        DivisionOccupancy qd2 = new DivisionOccupancy("20204","PROBLEM SOLVING II","CMPSC 24", "56", "70");
        assertEquals(qd1.hashCode(), qd2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        DivisionOccupancy qd1 = new DivisionOccupancy("20204","PROBLEM SOLVING II","CMPSC 24", "56", "70");
        String expected="{ quarter='20204', title='PROBLEM SOLVING II', courseId='CMPSC 24', enrolled='56', maxEnrolled='70'}";
        assertEquals(expected, qd1.toString());
    }

    @Test
    public void test_fromJSON_withError() throws Exception {
        String badJSON = "this is not good json!";
        List<DivisionOccupancy> lqd = DivisionOccupancy.listFromJSON(badJSON);
        assertNull(lqd);
    }

}