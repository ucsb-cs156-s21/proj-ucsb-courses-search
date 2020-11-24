package edu.ucsb.courses.documents;

import java.util.Objects;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FinalExam {

    private static Logger logger = LoggerFactory.getLogger(FinalExam.class);

    private boolean hasFinals;
    private String comments;
    private String examDay;
    private String examDate;
    private String beginTime;
    private String endTime;

    public FinalExam() {
    }

    public FinalExam(boolean hasFinals, String comments, String examDay, String examDate, String beginTime,
            String endTime) {
        this.hasFinals = hasFinals;
        this.comments = comments;
        this.examDay = examDay;
        this.examDate = examDate;
        this.beginTime = beginTime;
        this.endTime = endTime;
    }

    public boolean getHasFinals() {
        return this.hasFinals;
    }

    public void setHasFinals(boolean hasFinals) {
        this.hasFinals = hasFinals;
    }

    public String getComments() {
        return this.comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getExamDay() {
        return this.examDay;
    }

    public void setExamDay(String examDay) {
        this.examDay = examDay;
    }

    public String getExamDate() {
        return this.examDate;
    }

    public void setExamDate(String examDate) {
        this.examDate = examDate;
    }

    public String getBeginTime() {
        return this.beginTime;
    }

    public void setBeginTime(String beginTime) {
        this.beginTime = beginTime;
    }

    public String getEndTime() {
        return this.endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof FinalExam)) {
            return false;
        }
        FinalExam fe = (FinalExam) o;
        EqualsBuilder builder = new EqualsBuilder();
        builder.append(hasFinals, fe.getHasFinals()).append(comments, fe.getComments()).append(examDay, fe.getExamDay())
                .append(examDate, fe.getExamDate()).append(beginTime, fe.getBeginTime())
                .append(endTime, fe.getEndTime());
        return builder.build();

    }

    @Override
    public int hashCode() {
        return Objects.hash(hasFinals, comments, examDay, examDate, beginTime, endTime);
    }

    @Override
    public String toString() {
        return "{" + " hasFinals='" + getHasFinals() + "'" + ", comments='" + getComments() + "'" + ", examDay='"
                + getExamDay() + "'" + ", examDate='" + getExamDate() + "'" + ", beginTime='" + getBeginTime() + "'"
                + ", endTime='" + getEndTime() + "'" + "}";
    }

}