package edu.ucsb.courses.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import edu.ucsb.courses.entities.Schedule;
import edu.ucsb.courses.entities.ScheduleItem;

/**
 * Represents a user's personal schedule by schedule Id
 * 
 * This model will be used on /get/{scheduleId} to send back a Schedule 
 * and a List of ScheduleItem associated with that scheduleId
 */

public class PersonalSchedule {

    private List<ScheduleItem> classes;
    private Schedule schedule;

    /**
     * Construct a PersonalSchedule with Schedule and List of ScheduleItems
     * 
     * @param s Non optional Schedule Object
     * @param c ArrayList of ScheduleItems Object
     */

    public PersonalSchedule(Schedule s, List<ScheduleItem> c) {
        this.schedule = s;
        this.classes = c;
    }

    public PersonalSchedule(){
        this.schedule = null;
        this.classes = null;
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
