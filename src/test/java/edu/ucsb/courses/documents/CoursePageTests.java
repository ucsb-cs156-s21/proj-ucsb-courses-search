package edu.ucsb.courses.documents;

import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.ArrayList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import net.codebox.javabeantester.JavaBeanTester;

public class CoursePageTests {

    @Test
    public void testGettersAndSetters() throws Exception {
        // See: https://github.com/codebox/javabean-tester
        // The classes that should NOT be tested with the Bean are the
        // ones that set and get List<> instances
        JavaBeanTester.test(CoursePage.class,"classes");
    }

    @Test
    public void test_getAndSetClasses() {
        CoursePage cp = new CoursePage();
        List<Course> courses = new ArrayList<Course>();
        cp.setClasses(courses);
        assertEquals(courses, cp.getClasses());
    }

    @Test
    public void test_notEqualNull() throws Exception {
        CoursePage cp = new CoursePage();
        assertNotEquals(cp, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        CoursePage cp = new CoursePage();
        assertNotEquals(cp, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        CoursePage cp = new CoursePage(1,10,10,new ArrayList<Course>());
        assertEquals(cp, cp);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        CoursePage cp1 = new CoursePage(1,10,10,new ArrayList<Course>());
        CoursePage cp2 = new CoursePage(1,10,10,new ArrayList<Course>());
        assertEquals(cp1, cp2);
    }

    @Test
    public void test_hashCode() throws Exception {
        CoursePage cp1 = new CoursePage(1,10,10,new ArrayList<Course>());
        CoursePage cp2 = new CoursePage(1,10,10,new ArrayList<Course>());
        assertEquals(cp1.hashCode(), cp2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        CoursePage cp1 = new CoursePage(1,10,10,new ArrayList<Course>());
        assertEquals("{ pageNumber='1', pageSize='10', total='10', classes='[]'}",cp1.toString());
    }



}