package edu.ucsb.courses.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.spy;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import edu.ucsb.courses.documents.Course;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ArchivedCourseRepositoryTests {

    private static Logger logger = LoggerFactory.getLogger(ArchivedCourseRepositoryTests.class);

    // How to test default method of an interface: https://stackoverflow.com/a/54915791
    ArchivedCourseRepository acrSpy = spy(ArchivedCourseRepository.class);

    @Test
    public void test_findOneByQuarterAndCourseId_String_String_String() {

        Course c = new Course();
        c.setCourseId("CMPSC   130A ");

        Optional<Course> optionalCourse = Optional.of(c);

        // Mock the findOneByQuarterAndCourseId that takes two strings
        Mockito.when(acrSpy.findOneByQuarterAndCourseId(any(String.class),any(String.class))).thenReturn(optionalCourse);

        Optional<Course> result = acrSpy.findOneByQuarterAndCourseId("20201", "CMPSC", "130A");

        Mockito.verify(acrSpy).findOneByQuarterAndCourseId("20201", c.getCourseId());

        assertTrue(result.isPresent());
        assertEquals(result.get(), c);
    }

}