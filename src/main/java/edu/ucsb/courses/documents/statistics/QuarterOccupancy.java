package edu.ucsb.courses.documents.statistics;

import java.util.List;
import java.util.Objects;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class QuarterOccupancy {
    
    private static Logger logger = LoggerFactory.getLogger(QuarterOccupancy.class);
    
    @JsonProperty("quarter")
    private String _id;
    private String enrolled;
    private String maxEnrolled;
    
    public QuarterOccupancy() {
        
    }
    
    public QuarterOccupancy(String _id, String enrolled, String maxEnrolled) {
        this._id = _id;
        this.enrolled = enrolled;
        this.maxEnrolled = maxEnrolled;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getEnrolled() {
        return enrolled;
    }

    public void setEnrolled(String enrolled) {
        this.enrolled = enrolled;
    }

    public String getMaxEnrolled() {
        return maxEnrolled;
    }

    public void setMaxEnrolled(String maxEnrolled) {
        this.maxEnrolled = maxEnrolled;
    }

    @Override
    public int hashCode() {
        return Objects.hash(_id, enrolled, maxEnrolled);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        QuarterOccupancy other = (QuarterOccupancy) obj;
        EqualsBuilder builder = new EqualsBuilder();
        builder.append(_id, other._id).append(enrolled, other.enrolled).append(maxEnrolled, other.maxEnrolled);
        
        return builder.build();
    }
    
    @Override
    public String toString() {
        return "{" +
            " quarter='" + _id + "'" +
            ", enrolled='" + enrolled + "'" +
            ", maxEnrolled='" + maxEnrolled + "'" +
            "}";
    }
    
    public static List<QuarterOccupancy> listFromJSON(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            List<QuarterOccupancy> lqd = objectMapper.readValue(json, new TypeReference<List<QuarterOccupancy>>(){});
            return lqd;
        } catch (JsonProcessingException jpe) {
            logger.error("JsonProcessingException:" + jpe);
            return null;
        }
        
    }
    
}
