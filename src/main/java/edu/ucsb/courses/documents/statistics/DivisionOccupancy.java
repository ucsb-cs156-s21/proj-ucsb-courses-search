package edu.ucsb.courses.documents.statistics;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.commons.lang3.builder.EqualsBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DivisionOccupancy {

    private static Logger logger = LoggerFactory.getLogger(DivisionOccupancy.class);

    private String _id;
    private String quarter;
    private String title;
    private String courseId;
    private String enrolled;
    private String maxEnrolled;

    public DivisionOccupancy() {
    }

    public DivisionOccupancy(String quarter, String title, String courseId, String enrolled, String maxEnrolled) {
        this.quarter = quarter;
        this.title = title;
        this.courseId = courseId;
        this.enrolled = enrolled;
        this.maxEnrolled = maxEnrolled;
    }


    public String getQuarter() {
        return this.quarter;
    }

    public void setQuarter(String quarter) {
        this.quarter = quarter;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCourseId() {
        return String.join(" ", this.courseId.split("[\\s\\p{Z}]+"));   // split/join function from Thursday, Dec. 3 Prof. Conrad Lecture
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }


    public String getMaxEnrolled() {
        return this.maxEnrolled;
    }

    public void setMaxEnrolled(String maxEnrolled) {
        this.maxEnrolled = maxEnrolled;
    }

    public String getEnrolled() {
        return this.enrolled;
    }

    public void setEnrolled(String enrolled) {
        this.enrolled = enrolled;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof DivisionOccupancy)) {
            return false;
        }
        DivisionOccupancy divOc = (DivisionOccupancy) o;

        EqualsBuilder builder = new EqualsBuilder();
        builder.append(quarter, divOc.getQuarter()).append(title, divOc.getTitle()).append(courseId, divOc.getCourseId()).append(enrolled, divOc.getEnrolled()).append(maxEnrolled, divOc.getMaxEnrolled());
        return builder.build();

    }

    @Override
    public int hashCode() {
        return Objects.hash(quarter, title, getCourseId(), enrolled, maxEnrolled);
    }


    @Override
    public String toString() {
        return "{" +
            " quarter='" + quarter + "'" +
            ", title='" + title + "'" +
            ", courseId='" + getCourseId() + "'" +
            ", enrolled='" + enrolled + "'" +
            ", maxEnrolled='" + maxEnrolled + "'" +
            "}";
    }
    
    public static List<DivisionOccupancy> listFromJSON(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            List<DivisionOccupancy> lqd = objectMapper.readValue(json, new TypeReference<List<DivisionOccupancy>>(){});
            return lqd;
        } catch (JsonProcessingException jpe) {
            logger.error("JsonProcessingException:" + jpe);
            return null;
        }
        
    }

}
