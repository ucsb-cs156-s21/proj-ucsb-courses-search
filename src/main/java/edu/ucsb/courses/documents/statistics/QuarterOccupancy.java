package edu.ucsb.courses.documents.statistics;

import com.fasterxml.jackson.annotation.JsonProperty;

public class QuarterOccupancy {
    @JsonProperty("quarter")
    private String _id;
    private String enrolled;
    private String maxEnrolled;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getEnrolled() {
        return enrolled;
    }

    public void setEnrolled(String enrolled) {
        this.enrolled = enrolled;
    }

    public String getMaxEnrolled() {
        return maxEnrolled;
    }

    public void setMaxEnrolled(String maxEnrolled) {
        this.maxEnrolled = maxEnrolled;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((_id == null) ? 0 : _id.hashCode());
        result = prime * result + ((enrolled == null) ? 0 : enrolled.hashCode());
        result = prime * result + ((maxEnrolled == null) ? 0 : maxEnrolled.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        QuarterOccupancy other = (QuarterOccupancy) obj;
        if (_id == null) {
            if (other._id != null)
                return false;
        } else if (!_id.equals(other._id))
            return false;
        if (enrolled == null) {
            if (other.enrolled != null)
                return false;
        } else if (!enrolled.equals(other.enrolled))
            return false;
        if (maxEnrolled == null) {
            if (other.maxEnrolled != null)
                return false;
        } else if (!maxEnrolled.equals(other.maxEnrolled))
            return false;
        return true;
    }
    
}
