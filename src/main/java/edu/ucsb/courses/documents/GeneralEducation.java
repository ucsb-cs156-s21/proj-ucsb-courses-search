package edu.ucsb.courses.documents;

import java.util.Objects;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GeneralEducation {

    private static Logger logger = LoggerFactory.getLogger(GeneralEducation.class);

    private String geCode;
    private String geCollege;

    public GeneralEducation() {
    }

    public GeneralEducation(String geCode, String geCollege) {
        this.geCode = geCode;
        this.geCollege = geCollege;
    }

    public String getGeCode() {
        return this.geCode;
    }

    public void setGeCode(String geCode) {
        this.geCode = geCode;
    }

    public String getGeCollege() {
        return this.geCollege;
    }

    public void setGeCollege(String geCollege) {
        this.geCollege = geCollege;
    }

   

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof GeneralEducation)) {
            return false;
        }
        GeneralEducation ge = (GeneralEducation) o;
        EqualsBuilder builder = new EqualsBuilder();
        builder.append(geCode, ge.getGeCode()).append(geCollege, ge.getGeCollege());
        return builder.build();
    }

    @Override
    public int hashCode() {
        return Objects.hash(geCode, geCollege);
    }

    @Override
    public String toString() {
        return "{" + " geCode='" + getGeCode() + "'" + ", geCollege='" + getGeCollege() + "'" + "}";
    }

}