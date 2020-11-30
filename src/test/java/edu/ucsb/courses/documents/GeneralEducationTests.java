package edu.ucsb.courses.documents;

import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertEquals;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.codebox.javabeantester.JavaBeanTester;

public class GeneralEducationTests {

    private static Logger logger = LoggerFactory.getLogger(GeneralEducationTests.class);

    @Test
    public void testGettersAndSetters() throws Exception {
        // See: https://github.com/codebox/javabean-tester
        JavaBeanTester.test(GeneralEducation.class);
    }

    @Test
    public void test_notEqualNull() throws Exception {
        GeneralEducation ge = new GeneralEducation();
        assertNotEquals(ge, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        GeneralEducation ge = new GeneralEducation();
        assertNotEquals(ge, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        GeneralEducation ge = new GeneralEducation();
        ge.setGeCode("F");
        ge.setGeCollege("L&S");
        assertEquals(ge, ge);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        GeneralEducation ge1 = new GeneralEducation();
        ge1.setGeCode("F");
        ge1.setGeCollege("L&S");
        GeneralEducation ge2 = new GeneralEducation();
        ge2.setGeCode("F");
        ge2.setGeCollege("L&S");
        assertEquals(ge1, ge2);
    }

    @Test
    public void test_hashCode() throws Exception {
        GeneralEducation ge1 = new GeneralEducation();
        ge1.setGeCode("F");
        ge1.setGeCollege("L&S");
        GeneralEducation ge2 = new GeneralEducation();
        ge2.setGeCode("F");
        ge2.setGeCollege("L&S");
        assertEquals(ge1.hashCode(), ge2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        GeneralEducation ge1 = new GeneralEducation("F","L&S");
        String expected = "{ geCode='F', geCollege='L&S'}";
        assertEquals(expected, ge1.toString());
    }

}