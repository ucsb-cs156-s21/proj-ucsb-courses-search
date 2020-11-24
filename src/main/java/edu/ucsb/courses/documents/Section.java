package edu.ucsb.courses.documents;

import java.util.List;
import java.util.Objects;

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

    public Section(String enrollCode, String section, String session, String classClosed, String courseCancelled, String gradingOptionCode, Integer enrolledTotal, Integer maxEnroll, String secondaryStatus, boolean departmentApprovalRequired, boolean instructorApprovalRequired, String restrictionLevel, String restrictionMajor, String restrictionMajorPass, String restrictionMinor, String restrictionMinorPass, List<String> concurrentCourses, List<TimeLocation> timeLocations, List<Instructor> instructors) {
        this.enrollCode = enrollCode;
        this.section = section;
        this.session = session;
        this.classClosed = classClosed;
        this.courseCancelled = courseCancelled;
        this.gradingOptionCode = gradingOptionCode;
        this.enrolledTotal = enrolledTotal;
        this.maxEnroll = maxEnroll;
        this.secondaryStatus = secondaryStatus;
        this.departmentApprovalRequired = departmentApprovalRequired;
        this.instructorApprovalRequired = instructorApprovalRequired;
        this.restrictionLevel = restrictionLevel;
        this.restrictionMajor = restrictionMajor;
        this.restrictionMajorPass = restrictionMajorPass;
        this.restrictionMinor = restrictionMinor;
        this.restrictionMinorPass = restrictionMinorPass;
        this.concurrentCourses = concurrentCourses;
        this.timeLocations = timeLocations;
        this.instructors = instructors;
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

    public boolean isDepartmentApprovalRequired() {
        return this.departmentApprovalRequired;
    }

    public boolean getDepartmentApprovalRequired() {
        return this.departmentApprovalRequired;
    }

    public void setDepartmentApprovalRequired(boolean departmentApprovalRequired) {
        this.departmentApprovalRequired = departmentApprovalRequired;
    }

    public boolean isInstructorApprovalRequired() {
        return this.instructorApprovalRequired;
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

    public Section enrollCode(String enrollCode) {
        this.enrollCode = enrollCode;
        return this;
    }

    public Section section(String section) {
        this.section = section;
        return this;
    }

    public Section session(String session) {
        this.session = session;
        return this;
    }

    public Section classClosed(String classClosed) {
        this.classClosed = classClosed;
        return this;
    }

    public Section courseCancelled(String courseCancelled) {
        this.courseCancelled = courseCancelled;
        return this;
    }

    public Section gradingOptionCode(String gradingOptionCode) {
        this.gradingOptionCode = gradingOptionCode;
        return this;
    }

    public Section enrolledTotal(Integer enrolledTotal) {
        this.enrolledTotal = enrolledTotal;
        return this;
    }

    public Section maxEnroll(Integer maxEnroll) {
        this.maxEnroll = maxEnroll;
        return this;
    }

    public Section secondaryStatus(String secondaryStatus) {
        this.secondaryStatus = secondaryStatus;
        return this;
    }

    public Section departmentApprovalRequired(boolean departmentApprovalRequired) {
        this.departmentApprovalRequired = departmentApprovalRequired;
        return this;
    }

    public Section instructorApprovalRequired(boolean instructorApprovalRequired) {
        this.instructorApprovalRequired = instructorApprovalRequired;
        return this;
    }

    public Section restrictionLevel(String restrictionLevel) {
        this.restrictionLevel = restrictionLevel;
        return this;
    }

    public Section restrictionMajor(String restrictionMajor) {
        this.restrictionMajor = restrictionMajor;
        return this;
    }

    public Section restrictionMajorPass(String restrictionMajorPass) {
        this.restrictionMajorPass = restrictionMajorPass;
        return this;
    }

    public Section restrictionMinor(String restrictionMinor) {
        this.restrictionMinor = restrictionMinor;
        return this;
    }

    public Section restrictionMinorPass(String restrictionMinorPass) {
        this.restrictionMinorPass = restrictionMinorPass;
        return this;
    }

    public Section concurrentCourses(List<String> concurrentCourses) {
        this.concurrentCourses = concurrentCourses;
        return this;
    }

    public Section timeLocations(List<TimeLocation> timeLocations) {
        this.timeLocations = timeLocations;
        return this;
    }

    public Section instructors(List<Instructor> instructors) {
        this.instructors = instructors;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Section)) {
            return false;
        }
        Section section = (Section) o;
        return Objects.equals(enrollCode, section.enrollCode) && Objects.equals(section, section.section) && Objects.equals(session, section.session) && Objects.equals(classClosed, section.classClosed) && Objects.equals(courseCancelled, section.courseCancelled) && Objects.equals(gradingOptionCode, section.gradingOptionCode) && Objects.equals(enrolledTotal, section.enrolledTotal) && Objects.equals(maxEnroll, section.maxEnroll) && Objects.equals(secondaryStatus, section.secondaryStatus) && departmentApprovalRequired == section.departmentApprovalRequired && instructorApprovalRequired == section.instructorApprovalRequired && Objects.equals(restrictionLevel, section.restrictionLevel) && Objects.equals(restrictionMajor, section.restrictionMajor) && Objects.equals(restrictionMajorPass, section.restrictionMajorPass) && Objects.equals(restrictionMinor, section.restrictionMinor) && Objects.equals(restrictionMinorPass, section.restrictionMinorPass) && Objects.equals(concurrentCourses, section.concurrentCourses) && Objects.equals(timeLocations, section.timeLocations) && Objects.equals(instructors, section.instructors);
    }

    @Override
    public int hashCode() {
        return Objects.hash(enrollCode, section, session, classClosed, courseCancelled, gradingOptionCode, enrolledTotal, maxEnroll, secondaryStatus, departmentApprovalRequired, instructorApprovalRequired, restrictionLevel, restrictionMajor, restrictionMajorPass, restrictionMinor, restrictionMinorPass, concurrentCourses, timeLocations, instructors);
    }

    @Override
    public String toString() {
        return "{" +
            " enrollCode='" + getEnrollCode() + "'" +
            ", section='" + getSection() + "'" +
            ", session='" + getSession() + "'" +
            ", classClosed='" + getClassClosed() + "'" +
            ", courseCancelled='" + getCourseCancelled() + "'" +
            ", gradingOptionCode='" + getGradingOptionCode() + "'" +
            ", enrolledTotal='" + getEnrolledTotal() + "'" +
            ", maxEnroll='" + getMaxEnroll() + "'" +
            ", secondaryStatus='" + getSecondaryStatus() + "'" +
            ", departmentApprovalRequired='" + isDepartmentApprovalRequired() + "'" +
            ", instructorApprovalRequired='" + isInstructorApprovalRequired() + "'" +
            ", restrictionLevel='" + getRestrictionLevel() + "'" +
            ", restrictionMajor='" + getRestrictionMajor() + "'" +
            ", restrictionMajorPass='" + getRestrictionMajorPass() + "'" +
            ", restrictionMinor='" + getRestrictionMinor() + "'" +
            ", restrictionMinorPass='" + getRestrictionMinorPass() + "'" +
            ", concurrentCourses='" + getConcurrentCourses() + "'" +
            ", timeLocations='" + getTimeLocations() + "'" +
            ", instructors='" + getInstructors() + "'" +
            "}";
    }


}