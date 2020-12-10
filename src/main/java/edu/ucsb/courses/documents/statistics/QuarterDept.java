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

public class QuarterDept {

    private static Logger logger = LoggerFactory.getLogger(QuarterDept.class);

    private String quarter;
    private String deptCode;
    private int courseCount;

    public QuarterDept() {
    }

    public QuarterDept(String quarter, String deptCode, int courseCount) {
        this.quarter = quarter;
        this.deptCode = deptCode;
        this.courseCount = courseCount;
    }

    public String getQuarter() {
        return this.quarter;
    }

    public void setQuarter(String quarter) {
        this.quarter = quarter;
    }

    public String getDeptCode() {
        return this.deptCode;
    }

    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
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
        if (!(o instanceof QuarterDept)) {
            return false;
        }
        QuarterDept qd = (QuarterDept) o;

        EqualsBuilder builder = new EqualsBuilder();
        builder.append(quarter, qd.getQuarter()).append(deptCode, qd.getDeptCode());
        return builder.build();

    }

    @Override
    public int hashCode() {
        return Objects.hash(quarter, deptCode);
    }


    @Override
    public String toString() {
        return "{" +
            " quarter='" + quarter + "'" +
            ", deptCode='" + deptCode + "'" +
            ", courseCount='" + courseCount + "'" +
            "}";
    }
    
    public static List<QuarterDept> listFromJSON(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            List<QuarterDept> lqd = objectMapper.readValue(json, new TypeReference<List<QuarterDept>>(){});
            return lqd;
        } catch (JsonProcessingException jpe) {
            logger.error("JsonProcessingException:" + jpe);
            return null;
        }
        
    }

}