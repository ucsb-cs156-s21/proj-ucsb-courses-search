package edu.ucsb.courses.models;

import java.lang.System;

import org.junit.jupiter.api.Test;
import org.junit.Before;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertNotEquals;
import org.junit.jupiter.api.Assertions;

import java.util.List;
import java.util.ArrayList;

import edu.ucsb.courses.entities.Schedule;
import edu.ucsb.courses.entities.ScheduleItem;
import edu.ucsb.courses.entities.AppUser;

public class PersonalScheduleTests {

    @Test
    public void testPersonalSchedule_getClasses() {
        Schedule s = new Schedule(1L, "sched1", "mySched", "S21", "id");
        List<ScheduleItem> l = new ArrayList<ScheduleItem>();
        AppUser u = new AppUser(1L, "cgaucho@ucsb.edu", "c", "gaucho");
        ScheduleItem i = new ScheduleItem(2L, "1234", "5678", u, s);
        l.add(i);
        PersonalSchedule p = new PersonalSchedule(s, l);

        assertTrue(l.equals(p.getClasses()));
    }

    @Test
    public void testPersonalSchedule_getSchedule() {
        Schedule s = new Schedule(1L, "sched1", "mySched", "S21", "id");
        List<ScheduleItem> l = new ArrayList<ScheduleItem>();
        AppUser u = new AppUser(1L, "cgaucho@ucsb.edu", "c", "gaucho");
        ScheduleItem i = new ScheduleItem(2L, "1234", "5678", u, s);
        l.add(i);
        PersonalSchedule p = new PersonalSchedule(s, l);

        assertTrue(s.equals(p.getSchedule()));
    }

    @Test
    public void testPersonalSchedule_equalsSelf() {
        Schedule test = new Schedule(1L, "sched1", "mySched", "S21", "id");
        List<ScheduleItem> testTwo = new ArrayList<ScheduleItem>();
        PersonalSchedule target = new PersonalSchedule(test,testTwo);
        assertTrue(target.equals(target));
    }

    @Test
    public void testPersonalSchedule_equalsCopy() {
        Schedule s = new Schedule(1L, "sched1", "mySched", "S21", "id");
        List<ScheduleItem> l = new ArrayList<ScheduleItem>();
        AppUser u = new AppUser(1L, "cgaucho@ucsb.edu", "c", "gaucho");
        ScheduleItem i = new ScheduleItem(2L, "1234", "5678", u, s);
        l.add(i);
        PersonalSchedule p = new PersonalSchedule(s, l);

        
        Schedule s2 = new Schedule(1L, "sched1", "mySched", "S21", "id");;
        List<ScheduleItem> l2 = new ArrayList<ScheduleItem>();
        AppUser u2 = new AppUser(1L, "cgaucho@ucsb.edu", "c", "gaucho");
        ScheduleItem i2 = new ScheduleItem(2L , "1234", "5678", u2, s2);
        l2.add(i2);
        PersonalSchedule p2 = new PersonalSchedule(s2, l2);
        assertTrue(p.equals(p2));
    }
    @Test
    public void testPersonalSchedule_notequalsSizes() {
        Schedule s = new Schedule(1L, "sched1", "mySched", "S21", "id");
        List<ScheduleItem> l = new ArrayList<ScheduleItem>();
        AppUser u = new AppUser(1L, "cgaucho@ucsb.edu", "c", "gaucho");
        ScheduleItem i = new ScheduleItem(2L, "1234", "5678", u, s);
        l.add(i);
        PersonalSchedule p = new PersonalSchedule(s, l);

        
        Schedule s2 = new Schedule(1L, "sched1", "mySched", "S21", "id");;
        List<ScheduleItem> l2 = new ArrayList<ScheduleItem>();
        AppUser u2 = new AppUser(1L, "cgaucho@ucsb.edu", "c", "gaucho");
        ScheduleItem i2 = new ScheduleItem(2L , "1234", "5678", u2, s2);
        ScheduleItem i3 = new ScheduleItem(3L , "1234", "5678", u2, s2);
        l2.add(i2);
        l2.add(i3);
        PersonalSchedule p2 = new PersonalSchedule(s2, l2);
        assertTrue(!(p.equals(p2)));
    }

    @Test
    public void testPersonalSchedule_notequalsContains() {
        Schedule s = new Schedule(1L, "sched1", "mySched", "S21", "id");
        List<ScheduleItem> l = new ArrayList<ScheduleItem>();
        AppUser u = new AppUser(1L, "cgaucho@ucsb.edu", "c", "gaucho");
        ScheduleItem i = new ScheduleItem(2L, "1234", "5678", u, s);
        l.add(i);
        PersonalSchedule p = new PersonalSchedule(s, l);

        
        Schedule s2 = new Schedule(1L, "sched1", "mySched", "S21", "id");;
        List<ScheduleItem> l2 = new ArrayList<ScheduleItem>();
        AppUser u2 = new AppUser(1L, "cgaucho@ucsb.edu", "c", "gaucho");
        ScheduleItem i2 = new ScheduleItem(2L , "1111", "2222", u2, s2);
        l2.add(i2);
        PersonalSchedule p2 = new PersonalSchedule(s2, l2);
        assertTrue(!(p.equals(p2)));
    }

    @Test
    public void testPersonalSchedule_notequalsSchedule() {
        Schedule s = new Schedule(1L, "sched1", "mySched", "S21", "id");
        List<ScheduleItem> l = new ArrayList<ScheduleItem>();
        AppUser u = new AppUser(1L, "cgaucho@ucsb.edu", "c", "gaucho");
        ScheduleItem i = new ScheduleItem(2L, "1234", "5678", u, s);
        l.add(i);
        PersonalSchedule p = new PersonalSchedule(s, l);

        Schedule s2 = new Schedule(1L, "???", "???", "???", "???");
        List<ScheduleItem> l2 = new ArrayList<ScheduleItem>();
        AppUser u2 = new AppUser(1L, "???@ucsb.edu", "?", "???");
        ScheduleItem i2 = new ScheduleItem(3L, "1234", "5678", u2, s2);
        l2.add(i2);
        PersonalSchedule p2 = new PersonalSchedule(s2, l2);
        assertTrue(!(p.equals(p2)));
    }

    @Test
    public void testPersonalSchedule_notPersonalSchedule() {
        Schedule s = new Schedule(1L, "sched1", "mySched", "S21", "id");
        List<ScheduleItem> l = new ArrayList<ScheduleItem>();
        AppUser u = new AppUser(1L, "cgaucho@ucsb.edu", "c", "gaucho");
        ScheduleItem i = new ScheduleItem(2L, "1234", "5678", u, s);
        l.add(i);
        PersonalSchedule p = new PersonalSchedule(s, l);

        Schedule s2 = new Schedule(1L, "???", "???", "???", "???");
        
        assertTrue(!(p.equals(s2)));
    }

    @Test
    public void testPersonalSchedule_toString() {
        Schedule s = new Schedule(1L, "sched1", "mySched", "S21", "id");
        List<ScheduleItem> l = new ArrayList<ScheduleItem>();
        AppUser u = new AppUser(1L, "cgaucho@ucsb.edu", "c", "gaucho");
        ScheduleItem i = new ScheduleItem(2L, "1234", "5678", u, s);
        l.add(i);
        PersonalSchedule p = new PersonalSchedule(s, l);

        String expected = "Schedule[ id=1, name=sched1, description=mySched, quarter=S21, userId=id ]\n{ id='2', lectureCode='1234', discussionCode='5678', appUser='AppUser[ id=1, email=cgaucho@ucsb.edu, firstName=c, lastName=gaucho ]', schedule='Schedule[ id=1, name=sched1, description=mySched, quarter=S21, userId=id ]'}\n";
        
        assertEquals(p.toString(),expected);
    }

    @Test
    public void testPersonalSchedule_hashCode() {
        Schedule s = new Schedule(1L, "sched1", "mySched", "S21", "id");
        List<ScheduleItem> l = new ArrayList<ScheduleItem>();
        AppUser u = new AppUser(1L, "cgaucho@ucsb.edu", "c", "gaucho");
        ScheduleItem i = new ScheduleItem(2L, "1234", "5678", u, s);
        l.add(i);
        PersonalSchedule p = new PersonalSchedule(s, l);

        Schedule s2 = new Schedule(1L, "sched1", "mySched", "S21", "id");
        List<ScheduleItem> l2 = new ArrayList<ScheduleItem>();
        AppUser u2 = new AppUser(1L, "cgaucho@ucsb.edu", "c", "gaucho");
        ScheduleItem i2 = new ScheduleItem(2L, "1234", "5678", u2, s2);
        l2.add(i2);
        PersonalSchedule p2 = new PersonalSchedule(s2, l2);
        assertEquals(p.hashCode(), p2.hashCode());
    }

}
