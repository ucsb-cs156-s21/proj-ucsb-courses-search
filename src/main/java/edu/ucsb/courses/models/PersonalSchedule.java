package edu.ucsb.courses.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import edu.ucsb.courses.entities.Schedule;
import edu.ucsb.courses.entities.ScheduleItem;

/**
 * Represents a user's personal schedule 
 *
 */

public class PersonalSchedule {

    private List<ScheduleItem> classes;
    private Schedule schedule;

    /**
     * Construct a Quarter object from a string s, either in QYY or YYYYQ format. If
     * s is of length three, QYY format is expected, if 5 then YYYYQ format is
     * expected. Otherwise an IllegalArgumentException is thrown.
     * 
     * @param s Quarter either in QYY or YYYYQ format
     */

    public PersonalSchedule(Schedule s, List<ScheduleItem> c) {
        this.schedule = s;
        this.classes = c;
    }

    public List<ScheduleItem> getClasses(){
        return this.classes;
    }

    public void setClasses(List<ScheduleItem> c){
        this.classes = c;
    }

    public Schedule getSchedule() {
        return this.schedule;
    }

    public void setSchedule(Schedule s){
        this.schedule = s;
    }

    public String toString() {
        String body = "";
        body += schedule.toString() + "\n";
        
        for(ScheduleItem i : this.classes) {
            body += i.toString() + "\n";
        }
        return body;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if(!(o instanceof PersonalSchedule)) {
            return false;
        }
        
        PersonalSchedule x = (PersonalSchedule) o;

        if(x.schedule.equals(this.schedule) && x.classes.size() == this.classes.size() && x.classes.containsAll(this.classes)){
            return true;
        }
        else{
            return false;
        }

    }

    @Override
    public int hashCode() {
        return Objects.hash(schedule,classes);
    }

}
