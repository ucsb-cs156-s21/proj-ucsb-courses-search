package edu.ucsb.courses.documents;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.codebox.javabeantester.JavaBeanTester;

public class CourseTests {
    private static Logger logger = LoggerFactory.getLogger(CourseTests.class);

    @Test
    public void testGettersAndSetters() throws Exception {
        // See: https://github.com/codebox/javabean-tester
        // The classes that should NOT be tested with the Bean are the
        // ones that set and get List<> instances
        JavaBeanTester.test(Course.class, "classSections", "generalEducation");
    }

    @Test
    public void test_getAndSetClassSections() {
        Course c = new Course();
        List<Section> sections = new ArrayList<Section>();

        c.setClassSections(sections);
        assertEquals(sections, c.getClassSections());
    }

    @Test
    public void test_getAndSetGeneralEducation() {
        Course c = new Course();
        List<GeneralEducation> ges = new ArrayList<GeneralEducation>();

        c.setGeneralEducation(ges);
        assertEquals(ges, c.getGeneralEducation());
    }

    @Test
    public void test_notEqualNull() throws Exception {
        Course c = new Course();
        assertNotEquals(c, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        Course c = new Course();
        assertNotEquals(c, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        Course c = new Course();
        c.setCourseId("CMPSC   130A ");
        assertEquals(c, c);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        Course c1 = new Course();
        c1.setCourseId("CMPSC   130A ");
        Course c2 = new Course();
        c2.setCourseId("CMPSC   130A ");
        assertEquals(c1, c2);
    }

    @Test
    public void test_hashCode() throws Exception {
        Course c1 = new Course();
        c1.setCourseId("CMPSC   130A ");
        Course c2 = new Course();
        c2.setCourseId("CMPSC   130A ");
        assertEquals(c1.hashCode(), c2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        Course c1 = new Course();
        c1.setCourseId("CMPSC   130A ");
        String expected="{ quarter='null', courseId='CMPSC   130A ', title='null', description='null', classSections='null', generalEducation='null', finalExam='null'}";
        assertEquals(expected, c1.toString());
    }
}