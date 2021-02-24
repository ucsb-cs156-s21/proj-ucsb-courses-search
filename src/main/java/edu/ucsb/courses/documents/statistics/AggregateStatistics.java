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

public class AggregateStatistics {

    private static Logger logger = LoggerFactory.getLogger(AggregateStatistics.class);

    private String _id;
    private String quarter;
    private String title;
    private String courseId;
    private String enrolled;
    private String maxEnrolled;

    public AggregateStatistics() {
    }

    public AggregateStatistics(String quarter, String title, String courseId, String enrolled, String maxEnrolled) {
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
        if (!(o instanceof AggregateStatistics)) {
            return false;
        }
        AggregateStatistics agStat = (AggregateStatistics) o;

        EqualsBuilder builder = new EqualsBuilder();
        builder.append(quarter, agStat.getQuarter()).append(title, agStat.getTitle()).append(courseId, agStat.getCourseId()).append(enrolled, agStat.getEnrolled()).append(maxEnrolled, agStat.getMaxEnrolled());
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
    
    public static List<AggregateStatistics> listFromJSON(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            List<AggregateStatistics> lqd = objectMapper.readValue(json, new TypeReference<List<AggregateStatistics>>(){});
            return lqd;
        } catch (JsonProcessingException jpe) {
            logger.error("JsonProcessingException:" + jpe);
            return null;
        }
        
    }

}
