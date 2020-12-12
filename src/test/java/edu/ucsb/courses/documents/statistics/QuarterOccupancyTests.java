package edu.ucsb.courses.documents.statistics;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNull;

import java.util.List;

import org.junit.jupiter.api.Test;

import net.codebox.javabeantester.JavaBeanTester;

public class QuarterOccupancyTests {

    @Test
    public void testGettersAndSetters() throws Exception {
        // See: https://github.com/codebox/javabean-tester
        // The classes that should NOT be tested with the Bean are the
        // ones that set and get List<> instances
        JavaBeanTester.test(QuarterOccupancy.class);
    }

    @Test
    public void test_notEqualNull() throws Exception {
        QuarterOccupancy qd = new QuarterOccupancy();
        assertNotEquals(qd, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        QuarterOccupancy qd = new QuarterOccupancy();
        assertNotEquals(qd, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        QuarterOccupancy qd = new QuarterOccupancy("20204", "100", "200");
        assertEquals(qd, qd);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        QuarterOccupancy qd1 = new QuarterOccupancy("20211", "100", "200");
        QuarterOccupancy qd2 = new QuarterOccupancy("20204", "100", "200");
        qd1.set_id("20204");
        assertEquals(qd1, qd2);
    }

    @Test
    public void test_hashCode() throws Exception {
        QuarterOccupancy qd1 = new QuarterOccupancy("20211", "100", "200");
        QuarterOccupancy qd2 = new QuarterOccupancy("20211", "100", "200");
        assertEquals(qd1.hashCode(), qd2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        QuarterOccupancy qd1 = new QuarterOccupancy("20211", "100", "200");
        String expected="{ quarter='20211', enrolled='100', maxEnrolled='200'}";
        assertEquals(expected, qd1.toString());
    }

    @Test
    public void test_fromJSON_withError() throws Exception {
        String badJSON = "this is not good json!";
        List<QuarterOccupancy> lqd = QuarterOccupancy.listFromJSON(badJSON);
        assertNull(lqd);
    }
}
