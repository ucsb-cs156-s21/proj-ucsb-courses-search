package edu.ucsb.courses.documents.statistics;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Objects;

public class OpenCourse {

    private static Logger logger = LoggerFactory.getLogger(FullCourse.class);

    private String quarter;
    private String title;
    private String courseId;
    private int numOpenSeats;
    private int totalEnroll;
    private int maxEnroll;

    public OpenCourse(){}

    public OpenCourse(String quarter, String title, String courseId, int numOpenSeats, int totalEnroll, int maxEnroll) {
        this.quarter = quarter;
        this.title = title;
        this.courseId = courseId;
        this.numOpenSeats = numOpenSeats;
        this.totalEnroll = totalEnroll;
        this.maxEnroll = maxEnroll;
    }

    public int getTotalEnroll() {
        return totalEnroll;
    }

    public void setTotalEnroll(int totalEnroll) {
        this.totalEnroll = totalEnroll;
    }

    public int getMaxEnroll() {
        return maxEnroll;
    }

    public void setMaxEnroll(int maxEnroll) {
        this.maxEnroll = maxEnroll;
    }

    public String getQuarter() {
        return quarter;
    }

    public void setQuarter(String quarter) {
        this.quarter = quarter;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCourseId() {
        return courseId;
    }

    public int getNumOpenSeats() {
        return numOpenSeats;
    }

    public void setNumOpenSeats(int numOpenSeats) {
        this.numOpenSeats = numOpenSeats;
    }

    public void setCourseId(String courseId) {
        // See FullCourse Document
        this.courseId = String.join(" ", courseId.split("[\\s\\p{Z}]+"));
    }

    @Override
    public boolean equals(Object o){
        if(o == this)
            return true;
        if(!(o instanceof OpenCourse))
            return false;

        OpenCourse oc = (OpenCourse) o;

        EqualsBuilder builder = new EqualsBuilder();
        builder.append(quarter, oc.getQuarter()).append(title, oc.getTitle()).append(courseId, oc.getCourseId())
                .append(totalEnroll, oc.getTotalEnroll()).append(maxEnroll, oc.getMaxEnroll()).append(numOpenSeats, oc.getNumOpenSeats());
        return builder.build();
    }

    @Override
    public int hashCode(){
        return Objects.hash(quarter, title, courseId, totalEnroll, maxEnroll, numOpenSeats);
    }

    @Override
    public String toString() {
        return "{" +
                " quarter='" + getQuarter() + "'" +
                ", title='" + getTitle() + "'" +
                ", courseId='" + getCourseId() + "'" +
                ", totalEnroll='" + getTotalEnroll() + "'" +
                ", maxEnroll='" + getMaxEnroll() + "'" +
                ", numOpenSeats='" + getNumOpenSeats() + "'" +
                "}";
    }

    public static List<OpenCourse> listFromJSON(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            List<OpenCourse> lqd = objectMapper.readValue(json, new TypeReference<List<OpenCourse>>(){});
            return lqd;
        } catch (JsonProcessingException jpe) {
            logger.error("JsonProcessingException:" + jpe);
            return null;
        }

    }

}
