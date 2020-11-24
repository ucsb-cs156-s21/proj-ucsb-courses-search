package edu.ucsb.courses.documents;

import java.util.Objects;

import org.apache.commons.lang3.builder.EqualsBuilder;

// import edu.ucsb.cs156.ucsb_courses_search.services.UCSBBuildingService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TimeLocation {

    private static Logger logger = LoggerFactory.getLogger(TimeLocation.class);

    private String room;
    private String building;
    private String roomCapacity;
    private String days; 
    private String beginTime; 
    private String endTime;


    public TimeLocation() {
    }

    public TimeLocation(String room, String building, String roomCapacity, String days, String beginTime, String endTime) {
        this.room = room;
        this.building = building;
        this.roomCapacity = roomCapacity;
        this.days = days;
        this.beginTime = beginTime;
        this.endTime = endTime;
    }

    public String getRoom() {
        return this.room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getBuilding() {
        return this.building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getRoomCapacity() {
        return this.roomCapacity;
    }

    public void setRoomCapacity(String roomCapacity) {
        this.roomCapacity = roomCapacity;
    }

    public String getDays() {
        return this.days;
    }

    public void setDays(String days) {
        this.days = days;
    }

    public String getBeginTime() {
        return this.beginTime;
    }

    public void setBeginTime(String beginTime) {
        this.beginTime = beginTime;
    }

    public String getEndTime() {
        return this.endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public TimeLocation beginTime(String beginTime) {
        this.beginTime = beginTime;
        return this;
    }

    public TimeLocation endTime(String endTime) {
        this.endTime = endTime;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Course)) {
            return false;
        }
        TimeLocation tl = (TimeLocation) o;
        EqualsBuilder builder = new EqualsBuilder();
        builder.append(days, tl.getDays()).append(beginTime, tl.getBeginTime()).append(endTime,tl.getEndTime());
        return builder.build();
    }

    @Override
    public int hashCode() {
        return Objects.hash(room, building, roomCapacity, days, beginTime, endTime);
    }

    @Override
    public String toString() {
        return "{" +
            " room='" + getRoom() + "'" +
            ", building='" + getBuilding() + "'" +
            ", roomCapacity='" + getRoomCapacity() + "'" +
            ", days='" + getDays() + "'" +
            ", beginTime='" + getBeginTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            "}";
    }


}