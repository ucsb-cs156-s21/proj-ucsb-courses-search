package edu.ucsb.courses.documents.statistics;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.commons.lang3.builder.EqualsBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AvgClassSize {

    private static Logger logger = LoggerFactory.getLogger(QuarterDept.class);

    private String _id;         //dept
    private int avgClassSize;

    public AvgClassSize() {
    }

    public AvgClassSize(String _id, int avgClassSize) {
        this._id = _id;
        this.avgClassSize = avgClassSize;
    }

    public String get_id() {
        return this._id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public int getavgClassSize() {
        return this.avgClassSize;
    }

    public void setavgClassSize(int avgClassSize) {
        this.avgClassSize = avgClassSize;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof AvgClassSize)) {
            return false;
        }
        AvgClassSize qd = (AvgClassSize) o;

        EqualsBuilder builder = new EqualsBuilder();
        builder.append(_id, qd.get_id()).append(avgClassSize, qd.getavgClassSize());
        return builder.build();

    }

    @Override
    public int hashCode() {
        return Objects.hash(_id, avgClassSize);
    }


    @Override
    public String toString() {
        return "{" +
            " _id='" + _id + "'" +
            ", avgClassSize='" + avgClassSize + "'" +
            "}";
    }
    
    public static List<AvgClassSize> listFromJSON(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            List<AvgClassSize> lqd = objectMapper.readValue(json, new TypeReference<List<AvgClassSize>>(){});
            return lqd;
        } catch (JsonProcessingException jpe) {
            logger.error("JsonProcessingException:" + jpe);
            return null;
        }
        
    }

}