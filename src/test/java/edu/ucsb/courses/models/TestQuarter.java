package edu.ucsb.courses.models;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.doThrow;

import java.util.List;
import java.util.ArrayList;

public class TestQuarter {

    @Test
    public void test_constructor_20194() {
        Quarter q = new Quarter(20194);
        assertEquals(20194, q.getValue());
        assertEquals("F19", q.toString());
    }

    @Test
    public void test_constructor_F19() {
        Quarter q = new Quarter("F19");
        assertEquals(20194, q.getValue());
        assertEquals("F19", q.toString());
    }

    @Test
    public void test_constructor_20201_int() {
        Quarter q = new Quarter(20201);
        assertEquals(20201, q.getValue());
        assertEquals("W20", q.toString());
    }

    @Test
    public void test_constructor_20201_String() {
        Quarter q = new Quarter("20201");
        assertEquals(20201, q.getValue());
        assertEquals("W20", q.toString());
    }

    @Test
    public void test_constructor_W20() {
        Quarter q = new Quarter("W20");
        assertEquals(20201, q.getValue());
        assertEquals("W20", q.toString());
    }

    @Test(expected=IllegalArgumentException.class)
    public void test_constructor_bad_input() {
        Quarter q = new Quarter("foo");
    }


    @Test
    public void test_constructor_S20() {
        Quarter q = new Quarter("S20");
        assertEquals(20202, q.getValue());
        assertEquals("S20", q.toString());
    }

    
    @Test
    public void test_constructor_M20() {
        Quarter q = new Quarter("M20");
        assertEquals(20203, q.getValue());
        assertEquals("M20", q.toString());
    }


    @Test
    public void test_constructor_F01() {
        Quarter q = new Quarter("F01");
        assertEquals(20014, q.getValue());
        assertEquals("F01", q.toString());
    }

    @Test
    public void test_constructor_S99() {
        Quarter q = new Quarter("S99");
        assertEquals(19992, q.getValue());
        assertEquals("S99", q.toString());
    }

    @Test
    public void test_increment_F19() {
        Quarter q = new Quarter("F19");
        assertEquals(20201, q.increment());
        assertEquals("W20", q.toString());
    }

    @Test
    public void test_increment_W20() {
        Quarter q = new Quarter("W20");
        assertEquals(20202, q.increment());
        assertEquals("S20", q.toString());
    }

    @Test
    public void test_increment_S20() {
        Quarter q = new Quarter("S20");
        assertEquals(20203, q.increment());
        assertEquals("M20", q.toString());
    }

    @Test
    public void test_increment_M20() {
        Quarter q = new Quarter("M20");
        assertEquals(20204, q.increment());
        assertEquals("F20", q.toString());
    }


    @Test
    public void test_decrement_F19() {
        Quarter q = new Quarter("F19");
        assertEquals(20193, q.decrement());
        assertEquals("M19", q.toString());
    }

    @Test
    public void test_decrement_W20() {
        Quarter q = new Quarter("W20");
        assertEquals(20194, q.decrement());
        assertEquals("F19", q.toString());
    }

    @Test
    public void test_decrement_S20() {
        Quarter q = new Quarter("S20");
        assertEquals(20201, q.decrement());
        assertEquals("W20", q.toString());
    }

    @Test
    public void test_decrement_M20() {
        Quarter q = new Quarter("M20");
        assertEquals(20202, q.decrement());
        assertEquals("S20", q.toString());
    }


    // TEST STATIC METHODS

    @Test
    public void test_yyyyqToInt() {
        assertEquals(20194, Quarter.yyyyqToInt("20194"));
    }

    @Test(expected=IllegalArgumentException.class)
    public void test_yyyyqToInt__badLastDigit() {
        Quarter.yyyyqToInt("20195");
    }

    @Test(expected=IllegalArgumentException.class)
    public void test_yyyyqToInt__notAnInteger() {
        Quarter.yyyyqToInt("foo");
    }

    @Test
    public void test_yyyyqToQyy() {
        assertEquals("F19", Quarter.yyyyqToQyy(20194));
    }

    @Test(expected=IllegalArgumentException.class)
    public void test_yyyyqToQyy__badLastDigit() {
        Quarter.yyyyqToQyy(20195);
    }

    @Test
    public void test_getQ() {
        assertEquals("F", Quarter.getQ(20194));
    }

    @Test(expected=IllegalArgumentException.class)
    public void test_getQ_badLastDigit() {
        Quarter.getQ(20195);
    }

    @Test
    public void test_getYY() {
        assertEquals("19", Quarter.getYY(20194));
    }

    @Test(expected=IllegalArgumentException.class)
    public void test_getYY_badLastDigit() {
        Quarter.getYY(20195);
    }

    @Test
    public void test_getYYYY() {
        assertEquals("2019", Quarter.getYYYY(20194));
    }

    @Test(expected=IllegalArgumentException.class)
    public void test_getYYYY_badLastDigit() {
        Quarter.getYYYY(20195);
    }

    @Test
    public void test_qyyToQyyyy__F19() {
        assertEquals(20194, Quarter.qyyToQyyyy("F19"));
    }

    @Test
    public void test_qyyToQyyyy__W20() {
        assertEquals(20201, Quarter.qyyToQyyyy("W20"));
    }

    @Test
    public void test_qyyToQyyyy__S20() {
        assertEquals(20202, Quarter.qyyToQyyyy("S20"));
    }

    @Test
    public void test_qyyToQyyyy__M20() {
        assertEquals(20203, Quarter.qyyToQyyyy("M20"));
    }

    @Test
    public void test_qyyToQyyyy__F99() {
        assertEquals(19994, Quarter.qyyToQyyyy("F99"));
    }

    @Test
    public void test_qyyToQyyyy__W03() {
        assertEquals(20031, Quarter.qyyToQyyyy("W03"));
    }

    @Test
    public void test_qyyToQyyyy__S89() {
        assertEquals(19892, Quarter.qyyToQyyyy("S89"));
    }

    @Test(expected=IllegalArgumentException.class)
    public void test_qyyToQyyyy_badQuarter() {
        Quarter.qyyToQyyyy("X20");
    }

    @Test(expected=IllegalArgumentException.class)
    public void test_qyyToQyyyy_wrongLength1() {
        Quarter.qyyToQyyyy("F");
    }

    @Test(expected=IllegalArgumentException.class)
    public void test_qyyToQyyyy_wrongLength5() {
        Quarter.qyyToQyyyy("F2019");
    }

    @Test(expected=IllegalArgumentException.class)
    public void test_qyyToQyyyy__badChar() {
        Quarter.qyyToQyyyy("F2X");
    }

    @Test
    public void test_quarterList_S20_F19() {
        ArrayList<Quarter> expected = new ArrayList<Quarter>();
        expected.add(new Quarter("S20"));
        expected.add(new Quarter("W20"));
        expected.add(new Quarter("F19"));
        assertEquals(expected, Quarter.quarterList("S20","F19"));
    }

    @Test
    public void test_quarterList_F19_S20() {
        List<Quarter> expected = new ArrayList<Quarter>();
        expected.add(new Quarter("F19"));
        expected.add(new Quarter("W20"));
        expected.add(new Quarter("S20"));
       
        assertEquals(expected, Quarter.quarterList("F19","S20"));
    }

}
