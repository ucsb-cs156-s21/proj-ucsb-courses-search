package edu.ucsb.courses.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.apache.commons.lang3.builder.EqualsBuilder;
import java.util.Objects;

@Entity
public class AppUser {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(nullable = false)
  private String email;
  @Column(nullable = false)
  private String firstName;
  @Column(nullable = false)
  private String lastName;

  public AppUser() {
  }

  public AppUser(Long id, String email, String firstName, String lastName) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public String getFirstName() {
    return this.firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return this.lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public String toString() {
    return String.format("AppUser[ id=%d, email=%s, firstName=%s, lastName=%s ]", id, email,
        firstName, lastName);
  }
  @Override
    public int hashCode() {
        return Objects.hash(id, email, firstName, lastName);
    }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    AppUser user = (AppUser) o;
    EqualsBuilder builder = new EqualsBuilder();
    builder.append(id, user.getId()).append(email, user.getEmail()).append(firstName, user.getFirstName()).append(lastName, user.getLastName());

    return builder.isEquals();
  }
}
