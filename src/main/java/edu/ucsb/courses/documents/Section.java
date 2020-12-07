package edu.ucsb.courses.documents;

import java.util.List;
import java.util.Objects;

import org.apache.commons.lang3.builder.EqualsBuilder;

public class Section {

    /** a unique number assigned to a section */
    private String enrollCode;
    /** section number of the course */
    private String section;
    /** session only for summer quarter */
    private String session;
    /** if the class is closed */
    private String classClosed;
    /** is course cancelled */
    private String courseCancelled;
    /**
     * Grading Options Code like Pass/No Pass (P/NP) Or Letter Grades (L).
     * 
     * @see <a href=
     *      "https://developer.ucsb.edu/content/student-record-code-lookups">
     *      https://developer.ucsb.edu/content/student-record-code-lookups</a>
     * 
     */
    private String gradingOptionCode;

    /** total number of enrollments in the course */
    private Integer enrolledTotal;
    /** max number of students can be enrolled in the section */
    private Integer maxEnroll;

    /** Secondary Status of the course */
    private String secondaryStatus;

    /** Is department approval required for enrollment in the section */
    private boolean departmentApprovalRequired;

    /** Is instructor approval required for enrollment in the section */
    private boolean instructorApprovalRequired;

    /** Is there restriction on the level of the course */
    private String restrictionLevel;

    /** Is there restriction on the major of the student */
    private String restrictionMajor;

    /** Is there restriction on the major and pass time of the student */
    private String restrictionMajorPass;

    /** Is there restriction on the minor of the student */
    private String restrictionMinor;

    /** Is there restriction on the minor and pass time of the student */
    private String restrictionMinorPass;

    /** Concurrent courses for the section */
    private List<String> concurrentCourses;

    /**
     * List of {@link TimeLocation} objects for this course
     */
    private List<TimeLocation> timeLocations;
    /**
     * List of {@link Instructor} objects for this course
     */
    private List<Instructor> instructors;

    public Section() {
    }

    public String getEnrollCode() {
        return this.enrollCode;
    }

    public void setEnrollCode(String enrollCode) {
        this.enrollCode = enrollCode;
    }

    public String getSection() {
        return this.section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getSession() {
        return this.session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public String getClassClosed() {
        return this.classClosed;
    }

    public void setClassClosed(String classClosed) {
        this.classClosed = classClosed;
    }

    public String getCourseCancelled() {
        return this.courseCancelled;
    }

    public void setCourseCancelled(String courseCancelled) {
        this.courseCancelled = courseCancelled;
    }

    public String getGradingOptionCode() {
        return this.gradingOptionCode;
    }

    public void setGradingOptionCode(String gradingOptionCode) {
        this.gradingOptionCode = gradingOptionCode;
    }

    public Integer getEnrolledTotal() {
        return this.enrolledTotal;
    }

    public void setEnrolledTotal(Integer enrolledTotal) {
        this.enrolledTotal = enrolledTotal;
    }

    public Integer getMaxEnroll() {
        return this.maxEnroll;
    }

    public void setMaxEnroll(Integer maxEnroll) {
        this.maxEnroll = maxEnroll;
    }

    public String getSecondaryStatus() {
        return this.secondaryStatus;
    }

    public void setSecondaryStatus(String secondaryStatus) {
        this.secondaryStatus = secondaryStatus;
    }

    public boolean getDepartmentApprovalRequired() {
        return this.departmentApprovalRequired;
    }

    public void setDepartmentApprovalRequired(boolean departmentApprovalRequired) {
        this.departmentApprovalRequired = departmentApprovalRequired;
    }

    public boolean getInstructorApprovalRequired() {
        return this.instructorApprovalRequired;
    }

    public void setInstructorApprovalRequired(boolean instructorApprovalRequired) {
        this.instructorApprovalRequired = instructorApprovalRequired;
    }

    public String getRestrictionLevel() {
        return this.restrictionLevel;
    }

    public void setRestrictionLevel(String restrictionLevel) {
        this.restrictionLevel = restrictionLevel;
    }

    public String getRestrictionMajor() {
        return this.restrictionMajor;
    }

    public void setRestrictionMajor(String restrictionMajor) {
        this.restrictionMajor = restrictionMajor;
    }

    public String getRestrictionMajorPass() {
        return this.restrictionMajorPass;
    }

    public void setRestrictionMajorPass(String restrictionMajorPass) {
        this.restrictionMajorPass = restrictionMajorPass;
    }

    public String getRestrictionMinor() {
        return this.restrictionMinor;
    }

    public void setRestrictionMinor(String restrictionMinor) {
        this.restrictionMinor = restrictionMinor;
    }

    public String getRestrictionMinorPass() {
        return this.restrictionMinorPass;
    }

    public void setRestrictionMinorPass(String restrictionMinorPass) {
        this.restrictionMinorPass = restrictionMinorPass;
    }

    public List<String> getConcurrentCourses() {
        return this.concurrentCourses;
    }

    public void setConcurrentCourses(List<String> concurrentCourses) {
        this.concurrentCourses = concurrentCourses;
    }

    public List<TimeLocation> getTimeLocations() {
        return this.timeLocations;
    }

    public void setTimeLocations(List<TimeLocation> timeLocations) {
        this.timeLocations = timeLocations;
    }

    public List<Instructor> getInstructors() {
        return this.instructors;
    }

    public void setInstructors(List<Instructor> instructors) {
        this.instructors = instructors;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Section)) {
            return false;
        }
        Section s = (Section) o;
        EqualsBuilder builder = new EqualsBuilder();
        builder.append(enrollCode, s.getEnrollCode());
        return builder.build();
    }

    @Override
    public int hashCode() {
        return Objects.hash(enrollCode);
    }

    @Override
    public String toString() {
        return "{" + " enrollCode='" + getEnrollCode() + "'" + ", section='" + getSection() + "'" + ", session='"
                + getSession() + "'" + ", classClosed='" + getClassClosed() + "'" + ", courseCancelled='"
                + getCourseCancelled() + "'" + ", gradingOptionCode='" + getGradingOptionCode() + "'"
                + ", enrolledTotal='" + getEnrolledTotal() + "'" + ", maxEnroll='" + getMaxEnroll() + "'"
                + ", secondaryStatus='" + getSecondaryStatus() + "'" + ", departmentApprovalRequired='"
                + getDepartmentApprovalRequired() + "'" + ", instructorApprovalRequired='"
                + getInstructorApprovalRequired() + "'" + ", restrictionLevel='" + getRestrictionLevel() + "'"
                + ", restrictionMajor='" + getRestrictionMajor() + "'" + ", restrictionMajorPass='"
                + getRestrictionMajorPass() + "'" + ", restrictionMinor='" + getRestrictionMinor() + "'"
                + ", restrictionMinorPass='" + getRestrictionMinorPass() + "'" + ", concurrentCourses='"
                + getConcurrentCourses() + "'" + ", timeLocations='" + getTimeLocations() + "'" + ", instructors='"
                + getInstructors() + "'" + "}";
    }

}