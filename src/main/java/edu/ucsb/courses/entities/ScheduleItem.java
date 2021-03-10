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
    private String lectureCode;
    @Column(nullable = true)
    private String discussionCode;

    @ManyToOne
    @JoinColumn( name = "app_user_id")
    private AppUser appUser;
    @ManyToOne
    @JoinColumn( name = "schedule_id")
    private Schedule schedule;


    public ScheduleItem(Long id, String lectureCode, String discussionCode, AppUser appUser, Schedule schedule) {
        
        this.id = id;
        this.lectureCode = lectureCode;
        this.discussionCode = discussionCode;
        this.appUser = appUser;
        this.schedule = schedule;
    }

    public ScheduleItem(){
    }


    public Long getId() {
      return this.id;
    }

    public void setId(Long id) {
      this.id = id;
    }

    public AppUser getAppUser() {
        return this.appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public String getLectureCode() {
        return this.lectureCode;
    }

    public void setLectureCode(String lectureCode) {
        this.lectureCode = lectureCode;
    }

    public String getDiscussionCode() {
        return this.discussionCode;
    }

    public void setDiscussionCode(String discussionCode) {
        this.discussionCode = discussionCode;
    }

    public Schedule getSchedule() {
        return this.schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
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
        builder.append(id, c.getId()).append(lectureCode, c.getLectureCode()).append(discussionCode, c.getDiscussionCode()).append(appUser,c.getAppUser()).append(schedule, c.getSchedule());
        return builder.build();
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, lectureCode, discussionCode, appUser, schedule);
    }

    @Override
    public String toString() {
        return "{" + " id='"+ getId() + "'" + ", lectureCode='" + getLectureCode()
                + "'" + ", discussionCode='" + getDiscussionCode()
                + "'" + ", appUser='" + getAppUser()
                + "'" + ", schedule='" + getSchedule() + "'}";
    }

}
