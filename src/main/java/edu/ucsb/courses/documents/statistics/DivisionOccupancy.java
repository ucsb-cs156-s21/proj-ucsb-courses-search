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

public class DivisionOccupancy {

    private static Logger logger = LoggerFactory.getLogger(DivisionOccupancy.class);

    private String quarter;
    private String name;
    private int courseCount;

    public DivisionOccupancy() {
    }

    public DivisionOccupancy(String quarter, String name, int courseCount) {
        this.quarter = quarter;
        this.name = name;
        this.courseCount = courseCount;
    }

    public String getQuarter() {
        return this.quarter;
    }

    public void setQuarter(String quarter) {
        this.quarter = quarter;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public int getCourseCount() {
        return this.courseCount;
    }

    public void setCourseCount(int courseCount) {
        this.courseCount = courseCount;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof DivisionOccupancy)) {
            return false;
        }
        DivisionOccupancy qd = (DivisionOccupancy) o;

        EqualsBuilder builder = new EqualsBuilder();
        builder.append(quarter, qd.getQuarter()).append(name, qd.getName());
        return builder.build();

    }

    @Override
    public int hashCode() {
        return Objects.hash(quarter, name);
    }


    @Override
    public String toString() {
        return "{" +
            " quarter='" + quarter + "'" +
            ", name='" + name + "'" +
            ", courseCount='" + courseCount + "'" +
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