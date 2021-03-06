package edu.ucsb.courses.documents.statistics;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNull;

import java.util.List;

import org.junit.jupiter.api.Test;

import net.codebox.javabeantester.JavaBeanTester;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TotalCoursesDeptTest {
    private static Logger logger = LoggerFactory.getLogger(TotalCoursesDept.class);

    @Test
    public void testGettersAndSetters() throws Exception {
        // See: https://github.com/codebox/javabean-tester
        // The classes that should NOT be tested with the Bean are the
        // ones that set and get List<> instances
        JavaBeanTester.test(TotalCoursesDept.class);
    }

    @Test
    public void test_notEqualNull() throws Exception {
        TotalCoursesDept td = new TotalCoursesDept();
        assertNotEquals(td, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        TotalCoursesDept td = new TotalCoursesDept();
        assertNotEquals(td, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        TotalCoursesDept td = new TotalCoursesDept("CMPSC", 20);
        assertEquals(td, td);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        TotalCoursesDept td1 = new TotalCoursesDept("CMPSC",20);
        TotalCoursesDept td2 = new TotalCoursesDept("CMPSC", 20);
        assertEquals(td1, td2);

        // test different number of total courses
        TotalCoursesDept td3 = new TotalCoursesDept("CMPSC",20);
        TotalCoursesDept td4 = new TotalCoursesDept("CMPSC", 25);
        assertNotEquals(td3, td4);

        // test different department
        TotalCoursesDept td5 = new TotalCoursesDept("CMPSC",20);
        TotalCoursesDept td6 = new TotalCoursesDept("MATH", 20);
        assertNotEquals(td5, td6);
    }

    @Test
    public void test_hashCode() throws Exception {
        TotalCoursesDept td1 = new TotalCoursesDept("CMPSC", 20);
        TotalCoursesDept td2 = new TotalCoursesDept("CMPSC",20);
        assertEquals(td1.hashCode(), td2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        TotalCoursesDept td = new TotalCoursesDept("CMPSC", 20);
        String expected="{ _id='CMPSC', totalCourses='20'}";
        assertEquals(expected, td.toString());
    }

    @Test
    public void test_fromJSON_withError() throws Exception {
        String badJSON = "this is not good json!";
        List<TotalCoursesDept> ltd = TotalCoursesDept.listFromJSON(badJSON);
        assertNull(ltd);
    }

    @Test
    public void test_fromJSON() throws Exception {
        String json = "[ { \"_id\": \"CMPSC\",\n" +
                "\"totalCourses\": 20}]";

        List<TotalCoursesDept> ltd = TotalCoursesDept.listFromJSON(json);

        TotalCoursesDept expectedTotalCourse = new TotalCoursesDept("CMPSC", 20);
        assertEquals(expectedTotalCourse, ltd.get(0));
    }
}
