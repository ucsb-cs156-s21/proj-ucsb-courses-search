package edu.ucsb.courses.documents.statistics;

import java.util.List;
import net.codebox.javabeantester.JavaBeanTester;
import org.aspectj.apache.bcel.classfile.Module;
import org.junit.jupiter.api.BeforeEach;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.junit.jupiter.api.Test;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

public class SingleCourseSearchTests {

    private static Logger logger = LoggerFactory.getLogger(QuarterDeptTests.class);
    private SingleCourseSearch test1, test2;

    @BeforeEach
    public void setup(){
        SingleCourseSearch scs = new SingleCourseSearch();
        SingleCourseSearch test1 = new SingleCourseSearch(1, "Agrawal");
        SingleCourseSearch test2 = new SingleCourseSearch(1, "Agrawal");
    }

    @Test
    public void testGettersAndSetters() throws Exception {
        // See: https://github.com/codebox/javabean-tester
        // The classes that should NOT be tested with the Bean are the
        // ones that set and get List<> instances
        JavaBeanTester.test(SingleCourseSearch.class);
    }

    @Test
    public void test_notEqualNull() throws Exception {
        assertNotEquals(test1, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        assertNotEquals(test1, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        assertEquals(test1, test1);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        assertEquals(test1, test2);
    }

    @Test
    public void test_hashCode() throws Exception {
        assertEquals(test1.hashCode(), test2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        String expected="{ professor='Agrawal', professorCount='1'}";
        assertEquals(expected.toString(), test1.toString());
    }

    @Test
    public void test_fromJSON_withError() throws Exception {
        String badJSON = "this is not good json!";
        List<SingleCourseSearch> lqd = SingleCourseSearch.listFromJSON(badJSON);
        assertNull(lqd);
    }

}