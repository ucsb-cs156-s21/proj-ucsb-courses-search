package edu.ucsb.courses.documents.statistics;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Objects;

public class TotalCoursesDept {

    private static Logger logger = LoggerFactory.getLogger(QuarterDept.class);

    private String _id;         //deptCode
    private int totalCourses;

    public TotalCoursesDept(){}

    public TotalCoursesDept(String _id, int totalCourses){
        this._id = _id;
        this.totalCourses = totalCourses;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public int getTotalCourses() {
        return totalCourses;
    }

    public void setTotalCourses(int totalCourses) {
        this.totalCourses = totalCourses;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TotalCoursesDept that = (TotalCoursesDept) o;
        return totalCourses == that.totalCourses && _id.equals(that._id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(_id, totalCourses);
    }

    @Override
    public String toString(){
        return "{" + " _id='" + _id + "'" + ", totalCourses='" + totalCourses + "'}";
    }

    public static List<TotalCoursesDept> listFromJSON(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            List<TotalCoursesDept> lqd = objectMapper.readValue(json, new TypeReference<List<TotalCoursesDept>>(){});
            return lqd;
        } catch (JsonProcessingException jpe) {
            logger.error("JsonProcessingException:" + jpe);
            return null;
        }

    }
}
