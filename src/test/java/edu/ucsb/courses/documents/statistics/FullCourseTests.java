package edu.ucsb.courses.documents.statistics;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNull;

import java.util.List;

import org.junit.jupiter.api.Test;

import net.codebox.javabeantester.JavaBeanTester;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FullCourseTests {

    private static Logger logger = LoggerFactory.getLogger(FullCourseTests.class);

    @Test
    public void testGettersAndSetters() throws Exception {
        // See: https://github.com/codebox/javabean-tester
        // The classes that should NOT be tested with the Bean are the
        // ones that set and get List<> instances
        JavaBeanTester.test(FullCourse.class);
    }

    @Test
    public void test_notEqualNull() throws Exception {
        FullCourse qd = new FullCourse();
        assertNotEquals(qd, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        FullCourse qd = new FullCourse();
        assertNotEquals(qd, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        FullCourse qd = new FullCourse("20204","CMPSC");
        assertEquals(qd, qd);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        FullCourse qd1 = new FullCourse("20204","CMPSC");
        FullCourse qd2 = new FullCourse("20204","CMPSC");
        assertEquals(qd1, qd2);
    }

    @Test
    public void test_hashCode() throws Exception {
        FullCourse qd1 = new FullCourse("20204","CMPSC");
        FullCourse qd2 = new FullCourse("20204","CMPSC");
        assertEquals(qd1.hashCode(), qd2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        FullCourse qd1 = new FullCourse("20204","CMPSC");
        String expected="{ quarter='20204', title='CMPSC'}";
        assertEquals(expected, qd1.toString());
    }

    @Test
    public void test_fromJSON_withError() throws Exception {
        String badJSON = "this is not good json!";
        List<FullCourse> lqd = FullCourse.listFromJSON(badJSON);
        assertNull(lqd);
    }

}