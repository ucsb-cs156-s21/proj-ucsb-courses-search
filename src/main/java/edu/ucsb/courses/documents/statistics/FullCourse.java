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

public class FullCourse {

    private static Logger logger = LoggerFactory.getLogger(FullCourse.class);

    private String quarter;
    private String deptCode;
    private String title;


    public FullCourse() {
    }

    public FullCourse(String quarter, String deptCode, String title) {
        this.quarter = quarter;
        this.deptCode = deptCode;
        this.title = title;
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

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public FullCourse quarter(String quarter) {
        this.quarter = quarter;
        return this;
    }

    public FullCourse deptCode(String deptCode) {
        this.deptCode = deptCode;
        return this;
    }

    public FullCourse title(String title) {
        this.title = title;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof FullCourse)) {
            return false;
        }
        FullCourse fc = (FullCourse) o;

        EqualsBuilder builder = new EqualsBuilder();
        builder.append(quarter, fc.getQuarter()).append(deptCode, fc.getDeptCode()).append(title, fc.getTitle());
        return builder.build();
    }

    @Override
    public int hashCode() {
        return Objects.hash(quarter, deptCode, title);
    }

    @Override
    public String toString() {
        return "{" +
            " quarter='" + getQuarter() + "'" +
            ", deptCode='" + getDeptCode() + "'" +
            ", title='" + getTitle() + "'" +
            "}";
    }

    public static List<FullCourse> listFromJSON(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            List<FullCourse> lqd = objectMapper.readValue(json, new TypeReference<List<FullCourse>>(){});
            return lqd;
        } catch (JsonProcessingException jpe) {
            logger.error("JsonProcessingException:" + jpe);
            return null;
        }
        
    }

}