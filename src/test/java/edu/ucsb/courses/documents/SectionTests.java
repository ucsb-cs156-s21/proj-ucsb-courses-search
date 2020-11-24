package edu.ucsb.courses.documents;

import static org.junit.Assert.assertEquals;

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

}