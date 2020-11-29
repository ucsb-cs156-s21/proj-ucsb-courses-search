package edu.ucsb.courses.documents;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.commons.lang3.builder.EqualsBuilder;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CoursePage {

    private final static Logger logger = LoggerFactory.getLogger(CoursePage.class);


    private int pageNumber;
    private int pageSize;
    private int total;
    List<Course> classes;

    public CoursePage() {
    }

    public CoursePage(int pageNumber, int pageSize, int total, List<Course> classes) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.total = total;
        this.classes = classes;
    }

    public int getPageNumber() {
        return this.pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public int getPageSize() {
        return this.pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTotal() {
        return this.total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<Course> getClasses() {
        return this.classes;
    }

    public void setClasses(List<Course> classes) {
        this.classes = classes;
    }

    @Override
    public boolean equals(Object o) { 
        if (o == this)
            return true;
        if (!(o instanceof CoursePage)) {
            return false;
        }
        CoursePage cp = (CoursePage) o;

        EqualsBuilder builder = new EqualsBuilder();
        builder.append(pageNumber, cp.getPageNumber()).append(pageSize, cp.getPageSize()).append(total,cp.getTotal()).append(classes,cp.getClasses());
        return builder.build();
    }

    @Override
    public int hashCode() {
        return Objects.hash(pageNumber, pageSize, total, classes);
    }

    @Override
    public String toString() {
        return "{" + " pageNumber='" + getPageNumber() + "'" + ", pageSize='" + getPageSize() + "'" + ", total='"
                + getTotal() + "'" + ", classes='" + getClasses() + "'" + "}";
    }


    /**
     * Create a CoursePage object from json representation
     * 
     * @param json String of json returned by API endpoint {@code /classes/search}
     * @return a new CoursePage object
     * @see <a href=
     *      "https://developer.ucsb.edu/content/academic-curriculums">https://developer.ucsb.edu/content/academic-curriculums</a>
     */
    public static CoursePage fromJSON(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    
            CoursePage coursePage = objectMapper.readValue(json, CoursePage.class);
            return coursePage;
        } catch (JsonProcessingException jpe) {
            logger.error("JsonProcessingException:" + jpe);
            return null;
        }
        
    }

}