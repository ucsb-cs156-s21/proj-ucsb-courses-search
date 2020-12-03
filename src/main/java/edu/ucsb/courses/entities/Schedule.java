
package edu.ucsb.courses.entities;


import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.apache.commons.lang3.builder.EqualsBuilder;

@Entity
public class Schedule {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  @Column(nullable = false)
  private String name;
  @Column(nullable = false)
  private String quarter;
  @Column(nullable = false)
  private String userId;

  public Schedule(Long id, String name, String quarter, String userId) {
    this.id = id;
    this.name = name;
    this.quarter = quarter;
    this.userId = userId;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getQuarter() {
    return this.quarter;
  }

  public void setQuarter(String quarter) {
    this.quarter = quarter;
  }

  public String getUserId() {
    return this.userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  @Override
  public boolean equals(Object o) {
    if (o == this)
      return true;
    if (!(o instanceof Schedule)) {
      return false;
    }
    Schedule schedule = (Schedule) o;
    EqualsBuilder builder = new EqualsBuilder();
    builder.append(id, schedule.getId()).append(name, schedule.getName()).append(quarter, schedule.getQuarter())
        .append(userId, schedule.getUserId());
    return builder.build();
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, quarter, userId);
  }

  @Override
  public String toString() {
    return "{" + " id='" + getId() + "'" + ", name='" + getName() + "'" + ", quarter='" + getQuarter() + "'"
        + ", userId='" + getUserId() + "'" + "}";
  }

}
