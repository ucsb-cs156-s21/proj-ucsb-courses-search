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

    private String _id; // deptCode
    private int maxEnroll; 
    private int enrolledTotal; 
    private int numCourses;
    private double courseOccupancy;
    private int avgClassSize;


    public AggregateStatistics() {
    }

    public AggregateStatistics(String _id, int maxEnroll, int enrolledTotal, int numCourses, double courseOccupancy, int avgClassSize) {
        this._id = _id;
        this.maxEnroll = maxEnroll;
        this.enrolledTotal = enrolledTotal;
        this.numCourses = numCourses;
        this.courseOccupancy = courseOccupancy;
        this.avgClassSize = avgClassSize;
    }


    public String get_id() {
        return this._id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public int getMaxEnroll() {
        return this.maxEnroll;
    }

    public void setMaxEnroll(int maxEnroll) {
        this.maxEnroll = maxEnroll;
    }

    public int getEnrolledTotal() {
        return this.enrolledTotal;
    }

    public void setEnrolledTotal(int enrolledTotal) {
        this.enrolledTotal = enrolledTotal;
    }

    public int getNumCourses() {
        return this.numCourses;
    }

    public void setNumCourses(int numCourses) {
        this.numCourses = numCourses;
    }


    public double getCourseOccupancy() {
        return this.courseOccupancy;
    }

    public void setCourseOccupancy(double courseOccupancy) {
        this.courseOccupancy = courseOccupancy;
    }

    public int getAvgClassSize() {
        return this.avgClassSize;
    }

    public void setAvgClassSize(int avgClassSize) {
        this.avgClassSize = avgClassSize;
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
        builder.append(_id, agStat.get_id()).append(maxEnroll, agStat.getMaxEnroll()).append(enrolledTotal, agStat.getEnrolledTotal()).append(numCourses, agStat.getNumCourses()).append(courseOccupancy, agStat.getCourseOccupancy()).append(avgClassSize, agStat.getAvgClassSize());
        return builder.build();

    }

    @Override
    public int hashCode() {
        return Objects.hash(_id, maxEnroll, enrolledTotal, numCourses, courseOccupancy, avgClassSize);
    }


    @Override
    public String toString() { 
        return "{" +
            " _id='" + _id + "'" +
            ", maxEnroll='" + maxEnroll + "'" +
            ", enrolledTotal='" + enrolledTotal + "'" +
            ", numCourses='" + numCourses + "'" +
            ", courseOccupancy='" + courseOccupancy + "'" +
            ", avgClassSize='" + avgClassSize + "'" +
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
