package edu.ucsb.courses.documents;

import java.util.Objects;

import org.apache.commons.lang3.builder.EqualsBuilder;

public class Instructor {
    private String instructor;
    private String functionCode;


    public Instructor() {
    }

    public Instructor(String instructor, String functionCode) {
        this.instructor = instructor;
        this.functionCode = functionCode;
    }

    public String getInstructor() {
        return this.instructor;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public String getFunctionCode() {
        return this.functionCode;
    }

    public void setFunctionCode(String functionCode) {
        this.functionCode = functionCode;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Instructor)) {
            return false;
        }
        Instructor ins = (Instructor) o;
        EqualsBuilder builder = new EqualsBuilder();
        builder.append(instructor, ins.getInstructor()).append(functionCode, ins.getFunctionCode());
        return builder.build();
    }

    @Override
    public int hashCode() {
        return Objects.hash(instructor, functionCode);
    }

    @Override
    public String toString() {
        return "{" +
            " instructor='" + getInstructor() + "'" +
            ", functionCode='" + getFunctionCode() + "'" +
            "}";
    }


}
