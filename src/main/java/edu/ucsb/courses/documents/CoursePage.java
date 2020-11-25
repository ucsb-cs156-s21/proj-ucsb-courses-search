package edu.ucsb.courses.documents;

import java.util.List;
import java.util.Objects;

import org.apache.commons.lang3.builder.EqualsBuilder;

import jdk.vm.ci.amd64.AMD64.CPUFeature;

public class CoursePage {
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
}