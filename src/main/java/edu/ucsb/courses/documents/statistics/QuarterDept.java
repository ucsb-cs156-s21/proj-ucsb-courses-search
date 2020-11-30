package edu.ucsb.courses.documents.statistics;

import java.util.Objects;

import org.apache.commons.lang3.builder.EqualsBuilder;

public class QuarterDept {
    private String quarter;
    private String deptCode;
    private int courseCount;

    public QuarterDept() {
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
    

}