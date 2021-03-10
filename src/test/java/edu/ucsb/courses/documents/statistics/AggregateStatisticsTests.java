package edu.ucsb.courses.documents.statistics;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNull;

import java.util.List;

import org.junit.jupiter.api.Test;

import net.codebox.javabeantester.JavaBeanTester;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AggregateStatisticsTests {
    private static Logger logger = LoggerFactory.getLogger(AggregateStatistics.class);

    @Test
    public void testGettersAndSetters() throws Exception {
        // See: https://github.com/codebox/javabean-tester
        // The classes that should NOT be tested with the Bean are the
        // ones that set and get List<> instances
        JavaBeanTester.test(AggregateStatistics.class);
    }

    @Test
    public void test_notEqualNull() throws Exception {
        AggregateStatistics as = new AggregateStatistics();
        assertNotEquals(as, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        AggregateStatistics as = new AggregateStatistics();
        assertNotEquals(as, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        AggregateStatistics as = new AggregateStatistics("CMPSC", 40, 40, 50, 0.80, 45);
        assertEquals(as, as);
    }

    @Test
    public void test_equalsAnother() throws Exception {

        // test different department
        AggregateStatistics as1 = new AggregateStatistics("CMPSC", 40, 40, 50, 0.80, 45);
        AggregateStatistics as2 = new AggregateStatistics("ANTH", 40, 40, 50, 0.80, 45);
        assertNotEquals(as1, as2);

        // test different maxEnroll
        AggregateStatistics as3 = new AggregateStatistics("CMPSC", 40, 40, 50, 0.80, 45);
        AggregateStatistics as4 = new AggregateStatistics("CMPSC", 50, 40, 50, 0.80, 45);
        assertNotEquals(as3, as4);

        // test different enrolledTotal
        AggregateStatistics as5 = new AggregateStatistics("CMPSC", 40, 40, 50, 0.80, 45);
        AggregateStatistics as6 = new AggregateStatistics("CMPSC", 40, 50, 50, 0.80, 45);
        assertNotEquals(as5, as6);

        // test different numCourses
        AggregateStatistics as7 = new AggregateStatistics("CMPSC", 40, 40, 50, 0.80, 45);
        AggregateStatistics as8 = new AggregateStatistics("CMPSC", 40, 40, 60, 0.80, 45);
        assertNotEquals(as7, as8);

        // test different courseOccupancy
        AggregateStatistics as9 = new AggregateStatistics("CMPSC", 40, 40, 50, 0.80, 45);
        AggregateStatistics as10 = new AggregateStatistics("CMPSC", 40, 40, 50, 0.90, 45);
        assertNotEquals(as9, as10);

        // test different avgClassSize
        AggregateStatistics as11 = new AggregateStatistics("CMPSC", 40, 40, 50, 0.80, 45);
        AggregateStatistics as12 = new AggregateStatistics("CMPSC", 40, 40, 50, 0.80, 55);
        assertNotEquals(as11, as12);
        
    }

    @Test
    public void test_hashCode() throws Exception {
        AggregateStatistics as1 = new AggregateStatistics("CMPSC", 40, 40, 50, 0.80, 45);
        AggregateStatistics as2 = new AggregateStatistics("CMPSC", 40, 40, 50, 0.80, 45);
        assertEquals(as1.hashCode(), as2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        AggregateStatistics as = new AggregateStatistics("CMPSC", 40, 40, 50, 0.8, 45);
        String expected="{ _id='CMPSC', maxEnroll='40', enrolledTotal='40', numCourses='50', courseOccupancy='0.8', avgClassSize='45'}";
        assertEquals(expected, as.toString());
    }

    @Test
    public void test_fromJSON_withError() throws Exception {
        String badJSON = "this is not good json!";
        List<AggregateStatistics> las = AggregateStatistics.listFromJSON(badJSON);
        assertNull(las);
    }

    @Test
    public void test_fromJSON() throws Exception {
        String json = "[ { \"_id\": \"CMPSC\",\n" +
                "\"maxEnroll\": 40,\n" +
                "\"enrolledTotal\": 40,\n" +
                "\"numCourses\": 50,\n" +
                "\"courseOccupancy\": 0.8,\n" +
                "\"avgClassSize\": 45}]";

        List<AggregateStatistics> las = AggregateStatistics.listFromJSON(json);

        AggregateStatistics expectedAggregateStatistic = new AggregateStatistics("CMPSC", 40, 40, 50, 0.8, 45);
        assertEquals(expectedAggregateStatistic, las.get(0));
    }
}