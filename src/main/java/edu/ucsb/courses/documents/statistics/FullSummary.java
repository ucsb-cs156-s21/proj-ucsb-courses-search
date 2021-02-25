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

public class FullSummary {

    private static Logger logger = LoggerFactory.getLogger(FullSummary.class);

    private String _id;
    private String numCourses;
    private String numFullCourses;

    public FullSummary() {

    }

    public FullSummary(String _id, String numCourses, String numFullCourses) {
        this._id = _id;
        this.numCourses = numCourses;
        this.numFullCourses = numFullCourses;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getNumCourses() {
        return numCourses;
    }

    public void setNumCourses(String numCourses) {
        this.numCourses = numCourses;
    }

    public String getNumFullCourses() {
        return numFullCourses;
    }

    public void setNumFullCourses(String numFullCourses) {
        this.numFullCourses = numFullCourses;
    }

    @Override
    public int hashCode() {
        return Objects.hash(_id, numCourses, numFullCourses);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        FullSummary other = (FullSummary) obj;
        EqualsBuilder builder = new EqualsBuilder();
        builder.append(_id, other._id).append(numCourses, other.numCourses).append(numFullCourses, other.numFullCourses);

        return builder.build();
    }

    @Override
    public String toString() {
        return "{" +
            " _id='" + _id + "'" +
            ", numCourses='" + numCourses + "'" +
            ", numFullCourses='" + numFullCourses + "'}";
    }

    public static List<FullSummary> listFromJSON(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            List<FullSummary> lqd = objectMapper.readValue(json, new TypeReference<List<FullSummary>>(){});
            return lqd;
        } catch (JsonProcessingException jpe) {
            logger.error("JsonProcessingException:" + jpe);
            return null;
        }

    }

}
