package edu.ucsb.courses.documents;

import java.util.List;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "courses")
public class Course {

    private Logger logger = LoggerFactory.getLogger(Course.class);

    private String quarter;
    private String courseId;
    private String title;
    private String description;
    private List<Section> classSections;
    private List<GeneralEducation> generalEducation;
    private FinalExam finalExam;


    public Course() {
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

    public List<Section> getClassSections() {
        return this.classSections;
    }

    public void setClassSections(List<Section> classSections) {
        this.classSections = classSections;
    }

    public List<GeneralEducation> getGeneralEducation() {
        return this.generalEducation;
    }

    public void setGeneralEducation(List<GeneralEducation> generalEducation) {
        this.generalEducation = generalEducation;
    }

    public FinalExam getFinalExam() {
        return this.finalExam;
    }

    public void setFinalExam(FinalExam finalExam) {
        this.finalExam = finalExam;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Course)) {
            return false;
        }
        Course course = (Course) o;
        return Objects.equals(quarter, course.quarter) && Objects.equals(courseId, course.courseId) && Objects.equals(title, course.title) && Objects.equals(description, course.description) && Objects.equals(classSections, course.classSections) && Objects.equals(generalEducation, course.generalEducation) && Objects.equals(finalExam, course.finalExam);
    }

    @Override
    public int hashCode() {
        return Objects.hash(quarter, courseId, title, description, classSections, generalEducation, finalExam);
    }

    @Override
    public String toString() {
        return "{" +
            " quarter='" + getQuarter() + "'" +
            ", courseId='" + getCourseId() + "'" +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", classSections='" + getClassSections() + "'" +
            ", generalEducation='" + getGeneralEducation() + "'" +
            ", finalExam='" + getFinalExam() + "'" +
            "}";
    }

 
    
}