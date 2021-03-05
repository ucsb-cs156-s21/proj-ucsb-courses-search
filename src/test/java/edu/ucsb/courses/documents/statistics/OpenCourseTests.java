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

public class OpenCourseTests {

    private static Logger logger = LoggerFactory.getLogger(FullCourseTests.class);
    private OpenCourse oc1, oc2;

    @BeforeEach
    public void setup(){
        oc1 = new OpenCourse("20211", "ADV APP PROGRAMMING", "CMPSC 156", 75, 100, 25);
        oc2 = new OpenCourse("20211", "ADV APP PROGRAMMING", "CMPSC 156", 75, 100, 25);
    }

    @Test
    public void testGettersAndSetters() throws Exception{
        // See: https://github.com/codebox/javabean-tester
        // The classes that should NOT be tested with the Bean are the
        // ones that set and get List<> instances
        JavaBeanTester.test(OpenCourse.class);
    }

    @Test
    public void test_notEqualNull(){
        OpenCourse oc = new OpenCourse();
        assertNotEquals(oc, null);
    }

    @Test
    public void test_notEqualsAnotherClass(){
        OpenCourse oc = new OpenCourse();
        assertNotEquals(oc, new Object());
    }

    @Test
    public void test_equalsSelf(){
        OpenCourse oc = new OpenCourse();
        assertEquals(oc, oc);
    }

    @Test
    public void test_equalsAnother(){
        assertEquals(oc1, oc2);
    }

    @Test
    public void test_hashCode(){
        assertEquals(oc1.hashCode(), oc2.hashCode());
    }

    @Test
    public void test_toString(){
        StringBuilder expected = new StringBuilder();
        expected.append("{ quarter='20211'");
        expected.append(", title='ADV APP PROGRAMMING'");
        expected.append(", courseId='CMPSC 156'");
        expected.append(", totalEnroll='75'");
        expected.append(", maxEnroll='100'");
        expected.append(", numOpenSeats='25'}");

        assertEquals(expected.toString(), oc1.toString());
    }

    @Test
    public void test_fromJSON_withError() throws Exception{
        String badJSON = "this is not good json!";
        List<OpenCourse> openCourseList = OpenCourse.listFromJSON(badJSON);
        assertNull(openCourseList);
    }

    @Test
    public void test_fromJSON() throws Exception{
        StringBuilder json = new StringBuilder();

        json.append("[ { \"quarter\": \"20211\",\n");
        json.append("\"title\": \"ADV APP PROGRAMMING\",\n");
        json.append("\"courseId\": \"CMPSC 156\",\n");
        json.append("\"numOpenSeats\": 25,\n");
        json.append("\"totalEnroll\": 75,\n");
        json.append("\"maxEnroll\": 100\n");
        json.append("} ]");

        List<OpenCourse> openCourseList = OpenCourse.listFromJSON(json.toString());
        assertEquals(oc1, openCourseList.get(0));
    }
}
