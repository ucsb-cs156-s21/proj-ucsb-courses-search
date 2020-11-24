package edu.ucsb.courses.documents;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.codebox.javabeantester.JavaBeanTester;

public class FinalExamTests {

    private static Logger logger = LoggerFactory.getLogger(FinalExamTests.class);

    @Test
    public void testGettersAndSetters() throws Exception {
      // See: https://github.com/codebox/javabean-tester
      JavaBeanTester.test(FinalExam.class);
    }

    @Test
    public void test_notEqualNull() throws Exception {
        FinalExam fe = new FinalExam();
        assertNotEquals(fe, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        FinalExam fe = new FinalExam();
        assertNotEquals(fe, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        FinalExam fe = new FinalExam();
        fe.setExamDay("Monday");
        assertEquals(fe, fe);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        FinalExam fe1 = new FinalExam();
        fe1.setExamDay("Monday");
        FinalExam fe2 = new FinalExam();
        fe2.setExamDay("Monday");
        assertEquals(fe1, fe2);
    }

    @Test
    public void test_hashCode() throws Exception {
        FinalExam fe1 = new FinalExam();
        fe1.setExamDay("Monday");
        FinalExam fe2 = new FinalExam();
        fe2.setExamDay("Monday");
        assertEquals(fe1.hashCode(), fe2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        FinalExam fe = new FinalExam();
        fe.setExamDay("Monday");
        String expected="";
        assertEquals(expected, fe.toString());
    }

}