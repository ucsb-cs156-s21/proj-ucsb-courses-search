package com.ucsb.demonextjsspringtodoapp.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Todo {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  @Column(nullable = false)
  private String value;
  @Column(nullable = false)
  private boolean done;
  @Column(nullable = false)
  private String userId;

  public Todo() {
  }

  public Todo(Long id, String value, boolean done, String userId) {
    this.id = id;
    this.value = value;
    this.done = done;
    this.userId = userId;
  }

  @Override
  public String toString() {
    return String.format("Todo[ id=%d, value=%s, done=%s, userId=%s ]", id, value, done, userId);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null || getClass() != obj.getClass())
      return false;
    Todo other = (Todo) obj;
    return id == other.id && value.equals(other.value) && done == other.done
        && userId.equals(other.userId);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public boolean getDone() {
    return done;
  }

  public void setDone(boolean done) {
    this.done = done;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }
}
