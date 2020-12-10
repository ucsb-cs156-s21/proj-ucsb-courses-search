package edu.ucsb.courses.documents.statistics;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNull;

import java.util.List;

import org.junit.jupiter.api.Test;

import net.codebox.javabeantester.JavaBeanTester;

public class AvgClassSizeTests {

    @Test
    public void testGettersAndSetters() throws Exception {
        // See: https://github.com/codebox/javabean-tester
        // The classes that should NOT be tested with the Bean are the
        // ones that set and get List<> instances
        JavaBeanTester.test(AvgClassSize.class);
    }

    @Test
    public void test_notEqualNull() throws Exception {
        AvgClassSize qd = new AvgClassSize();
        assertNotEquals(qd, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        AvgClassSize qd = new AvgClassSize();
        assertNotEquals(qd, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        AvgClassSize qd = new AvgClassSize("20204", 52);
        assertEquals(qd, qd);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        AvgClassSize qd1 = new AvgClassSize("20211", 52);
        AvgClassSize qd2 = new AvgClassSize("20204", 52);
        qd1.set_id("20204");
        assertEquals(qd1, qd2);
    }

    @Test
    public void test_hashCode() throws Exception {
        AvgClassSize qd1 = new AvgClassSize("20211", 52);
        AvgClassSize qd2 = new AvgClassSize("20211", 52);
        assertEquals(qd1.hashCode(), qd2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        AvgClassSize qd1 = new AvgClassSize("20211", 52);
        String expected="{ _id='20211', avgClassSize='52'}";
        assertEquals(expected, qd1.toString());
    }

    @Test
    public void test_fromJSON_withError() throws Exception {
        String badJSON = "this is not good json!";
        List<AvgClassSize> lqd = AvgClassSize.listFromJSON(badJSON);
        assertNull(lqd);
    }
}