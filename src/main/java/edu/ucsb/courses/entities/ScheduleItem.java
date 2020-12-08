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
public class ScheduleItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String quarter;
    @Column(nullable = false)
    private String courseId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = true)
    private String description;
    @Column(nullable = false)
    private String classSection;
    @Column(nullable = false)
    private String generalEducation;
    @Column(nullable = true)
    private String finalExam;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    public ScheduleItem(Long id, String quarter, String courseId, String title, String description, String classSection, String generalEducation, String finalExam) {
        
        this.id = id;
        this.quarter = quarter;
        this.courseId = courseId;
        this.title = title;
        this.description = description;
        this.classSection = classSection;
        this.generalEducation = generalEducation;
        this.finalExam = finalExam;
        
    }
    
    public ScheduleItem(){
        this.id = 0L;
        this.quarter = "null";
        this.courseId = "null";
        this.title = "null";
        this.description = "null";
        this.classSection = "null";
        this.generalEducation = "null";
        this.finalExam = "null";
    }

    public Long getId() {
      return this.id;
    }

    public void setId(Long id) {
      this.id = id;
    }
    
    public String getQuarter() {
        return this.quarter;
    }

    public void setQuarter(String quarter) {
        this.quarter = quarter;
    }

    public String getCourseId() {
        return this.courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getClassSection() {
        return this.classSection;
    }

    public void setClassSection(String classSection) {
        this.classSection = classSection;
    }

    public String getGeneralEducation() {
        return this.generalEducation;
    }

    public void setGeneralEducation(String generalEducation) {
        this.generalEducation = generalEducation;
    }

    public String getFinalExam() {
        return this.finalExam;
    }

    public void setFinalExam(String finalExam) {
        this.finalExam = finalExam;
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
        builder.append(courseId, c.getCourseId()).append(quarter, c.getQuarter());
        return builder.build();
    }

    @Override
    public int hashCode() {
        return Objects.hash(quarter, courseId, title, description, classSection , generalEducation, finalExam);
    }

    @Override
    public String toString() {
        return "{" + " quarter='" + getQuarter() + "'" + ", courseId='" + getCourseId() + "'" + ", title='" + getTitle()
                + "'" + ", description='" + getDescription() + "'" + ", classSection='" + getClassSection() + "'"
                + ", generalEducation='" + getGeneralEducation() + "'" + ", finalExam='" + getFinalExam() + "'" + "}";
    }

}
