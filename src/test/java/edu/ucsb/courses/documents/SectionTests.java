package edu.ucsb.courses.documents;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.codebox.javabeantester.JavaBeanTester;

public class SectionTests {
    private static Logger logger = LoggerFactory.getLogger(SectionTests.class);

    @Test
    public void testGettersAndSetters() throws Exception {
      // See: https://github.com/codebox/javabean-tester
      JavaBeanTester.test(Section.class, "concurrentCourses","timeLocations","instructors");
    }

    @Test
    public void test_getAndSetConcurrentCourses() {
        Section s = new Section();
        List<String> concurrentCourses = new ArrayList<String>();

        s.setConcurrentCourses(concurrentCourses);
        assertEquals(concurrentCourses, s.getConcurrentCourses());
    }

    @Test
    public void test_getAndSetInstuctors() {
        Section s = new Section();
        List<Instructor> instructors = new ArrayList<Instructor>();

        s.setInstructors(instructors);
        assertEquals(instructors, s.getInstructors());
    }

    @Test
    public void test_getAndSetTimeLocations() {
        Section s = new Section();
        List<TimeLocation> timeLocations = new ArrayList<TimeLocation>();

        s.setTimeLocations(timeLocations);
        assertEquals(timeLocations, s.getTimeLocations());
    }

    @Test
    public void test_notEqualNull() throws Exception {
        Section s = new Section();
        assertNotEquals(s, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        Section s = new Section();
        assertNotEquals(s, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        Section s = new Section();
        s.setEnrollCode("12345");
        assertEquals(s, s);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        Section s1 = new Section();
        s1.setEnrollCode("12345");
        Section s2 = new Section();
        s2.setEnrollCode("12345");
        assertEquals(s1, s2);
    }

    @Test
    public void test_hashCode() throws Exception {
        Section s1 = new Section();
        s1.setEnrollCode("12345");
        Section s2 = new Section();
        s2.setEnrollCode("12345");
        assertEquals(s1.hashCode(), s2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        Section s1 = new Section();
        s1.setEnrollCode("12345");
        String expected="{ enrollCode='12345', section='null', session='null', classClosed='null', courseCancelled='null', gradingOptionCode='null', enrolledTotal='null', maxEnroll='null', secondaryStatus='null', departmentApprovalRequired='false', instructorApprovalRequired='false', restrictionLevel='null', restrictionMajor='null', restrictionMajorPass='null', restrictionMinor='null', restrictionMinorPass='null', concurrentCourses='null', timeLocations='null', instructors='null'}";
        assertEquals(expected, s1.toString());
    }


}