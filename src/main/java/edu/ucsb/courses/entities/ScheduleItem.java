package edu.ucsb.courses.entities;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import org.apache.commons.lang3.builder.EqualsBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Entity
public class  ScheduleItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String courseId;
    @Column(nullable = false)
    private String enrollCode;
    @Column(nullable = false)
    private String userId;
    @Column(nullable = false)
    private Long scheduleId;


    public ScheduleItem(Long id, String courseId, String enrollCode, String userId, Long schedule_id) {
        
        this.id = id;
        this.enrollCode = enrollCode;
        this.courseId = courseId;
        this.userId = userId;
        this.scheduleId = schedule_id;
    }

    public ScheduleItem(){
        this.id = 0L;
        this.courseId = "null";
    }


    public Long getId() {
      return this.id;
    }

    public void setId(Long id) {
      this.id = id;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCourseId() {
        return this.courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getEnrollCode() {
        return this.enrollCode;
    }

    public void setEnrollCode(String enrollCode) {
        this.enrollCode = enrollCode;
    }

    public Long getScheduleId() {
        return this.scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ScheduleItem)) {
            return false;
        }
        ScheduleItem c = (ScheduleItem) o;
        EqualsBuilder builder = new EqualsBuilder();
        builder.append(courseId, c.getCourseId()).append(enrollCode, c.getEnrollCode()).append(scheduleId, c.getScheduleId()).append(userId,c.getUserId());
        return builder.build();
    }

    @Override
    public int hashCode() {
        return Objects.hash(courseId, enrollCode, scheduleId);
    }

    @Override
    public String toString() {
        return "{id="+ getId() +" courseId='" + getCourseId() + "'" + ", enrollCode='" + getEnrollCode()
                + "'" + ", scheduleId='" + getScheduleId() + "'}";
    }

}
