package edu.ucsb.courses.documents;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.codebox.javabeantester.JavaBeanTester;


public class InstructorTests {
    private static Logger logger = LoggerFactory.getLogger(InstructorTests.class);

    @Test
    public void testGettersAndSetters() throws Exception {
      // See: https://github.com/codebox/javabean-tester
      JavaBeanTester.test(Instructor.class);
    }

    @Test
    public void test_notEqualNull() throws Exception {
        Instructor ins = new Instructor();
        assertNotEquals(ins, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        Instructor ins = new Instructor();
        assertNotEquals(ins, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        Instructor ins = new Instructor();
        ins.setInstructor("HENRY T YANG");
        assertEquals(ins, ins);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        Instructor ins1 = new Instructor();
        ins1.setInstructor("HENRY T YANG");
        Instructor ins2 = new Instructor();
        ins2.setInstructor("HENRY T YANG");
        assertEquals(ins1, ins2);
    }

    @Test
    public void test_hashCode() throws Exception {
        Instructor ins1 = new Instructor();
        ins1.setInstructor("HENRY T YANG");
        Instructor ins2 = new Instructor();
        ins2.setInstructor("HENRY T YANG");
        assertEquals(ins1.hashCode(), ins2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        Instructor ins = new Instructor("HENRY T YANG","Instructor of Record");
        String expected="{ instructor='HENRY T YANG', functionCode='Instructor of Record'}";
        assertEquals(expected, ins.toString());
    }

}
