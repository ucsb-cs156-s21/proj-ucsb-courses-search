package edu.ucsb.courses.documents.statistics;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.junit.jupiter.api.Test;

import net.codebox.javabeantester.JavaBeanTester;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class QuarterDeptTests {

    private static Logger logger = LoggerFactory.getLogger(QuarterDeptTests.class);

    @Test
    public void testGettersAndSetters() throws Exception {
        // See: https://github.com/codebox/javabean-tester
        // The classes that should NOT be tested with the Bean are the
        // ones that set and get List<> instances
        JavaBeanTester.test(QuarterDept.class);
    }

    @Test
    public void test_notEqualNull() throws Exception {
        QuarterDept qd = new QuarterDept();
        assertNotEquals(qd, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        QuarterDept qd = new QuarterDept();
        assertNotEquals(qd, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        QuarterDept qd = new QuarterDept("20204","CMPSC",0);
        assertEquals(qd, qd);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        QuarterDept qd1 = new QuarterDept("20204","CMPSC",0);
        QuarterDept qd2 = new QuarterDept("20204","CMPSC",0);
        assertEquals(qd1, qd2);
    }

    @Test
    public void test_hashCode() throws Exception {
        QuarterDept qd1 = new QuarterDept("20204","CMPSC",0);
        QuarterDept qd2 = new QuarterDept("20204","CMPSC",0);
        assertEquals(qd1.hashCode(), qd2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        QuarterDept qd1 = new QuarterDept("20204","CMPSC",0);
        String expected="{ quarter='20204', deptCode='CMPSC', courseCount='0'}";
        assertEquals(expected, qd1.toString());
    }

    @Test
    public void test_fromJSON_withError() throws Exception {
        String badJSON = "not good json!";
        List<QuarterDept> lqd = QuarterDept.listFromJSON(badJSON);
        assertNull(lqd);
    }

}