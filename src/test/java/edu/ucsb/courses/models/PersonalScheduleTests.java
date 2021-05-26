package edu.ucsb.courses.models;

import org.junit.jupiter.api.Test;
import static org.junit.Assert;
import org.junit.jupiter.api.Assertions;

import java.util.List;
import java.util.ArrayList;

import edu.ucsb.courses.entities;

public class PersonalScheduleTests {

    private PersonalSchedule p;
    private Schedule s;
    private List<ScheduleItem> l;
    private ScheduleItem i;
    private AppUser u;

    @Before
    public void setUp() {
        s = new Schedule(1, "sched1", "mySched", "S21", "id");
        l = new List<ScheduleItem>();
        u = new AppUser(1, "cgaucho@ucsb.edu", "c", "gaucho");
        i = new ScheduleItem("1", "1234", "5678", u, s);
        l.add(c);
        p = new PersonalSchedule(s, l);
    }

    @Test
    public void test_getClasses() {
        assertTrue(l.equals(p.getClasses())):
    }

    @Test
    public void test_getSchedule() {
        assertTrue(s.equals(p.getSchedule()));
    }

    // private List<ScheduleItem> newL;
    // private ScheduleItem newI;
    // private Schedule newS;
    // newS = new Schedule((2, "sched2", "mySched", "S21", "id"));
    // newL = new List<ScheduleItem>();
    // newI = new ScheduleItem("2", "8765", "4321", u, newS));
    // newL.add(newI);

    // @Test
    // public void test_setClasses(newL) {

    // }

    @Test
    public void test_equalsSelf() {
        assertTrue(p.equals(p));
    }

    @Test
    public void test_equalsCopy() {
        private PersonalSchedule p2;
        private Schedule s2;
        private List<ScheduleItem> l2;
        private ScheduleItem i2;
        private AppUser u2;
        s2 = new Schedule(1, "sched1", "mySched", "S21", "id");
        l2 = new List<ScheduleItem>();
        u2 = new AppUser(1, "cgaucho@ucsb.edu", "c", "gaucho");
        i2 = new ScheduleItem("1", "1234", "5678", u2, s2);
        l2.add(c2);
        p2 = new PersonalSchedule(s2, l2);
        assertTrue(p.equals(p2));
    }

    @Test
    public void test_notequalsCopy() {
        private PersonalSchedule p2;
        private Schedule s2;
        private List<ScheduleItem> l2;
        private ScheduleItem i2;
        private AppUser u2;
        s2 = new Schedule(1, "???", "???", "???", "???");
        l2 = new List<ScheduleItem>();
        u2 = new AppUser(1, "???@ucsb.edu", "?", "???");
        i2 = new ScheduleItem("1", "1234", "5678", u2, s2);
        l2.add(c2);
        p2 = new PersonalSchedule(s2, l2);
        assertTrue(p.equals(p2));
    }

    @Test
    public void test_hashCode() {
        private PersonalSchedule p2;
        private Schedule s2;
        private List<ScheduleItem> l2;
        private ScheduleItem i2;
        private AppUser u2;
        s2 = new Schedule(1, "sched1", "mySched", "S21", "id");
        l2 = new List<ScheduleItem>();
        u2 = new AppUser(1, "cgaucho@ucsb.edu", "c", "gaucho");
        i2 = new ScheduleItem("1", "1234", "5678", u2, s2);
        l2.add(c2);
        p2 = new PersonalSchedule(s2, l2);
        assertEquals(p.hashCode(), p2.hashCode());
    }

}
