package edu.harvard.h2ms.domain.core;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "notifications")
public class Notification {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "ID")
  private Long id;

  @ManyToMany
  @JoinTable(
    name = "user_role",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "notification_id")
  )
  private Set<User> subscribers;

  @Column(name = "name")
  private String name;

  @Column(name = "report_type")
  private String reportType;

  @Column(name = "notification_title")
  private String notificationTitle;

  @Column(name = "notification_body")
  private String notificationBody;

  public Notification(
      String name, String reportType, String notificationTitle, String notificationBody) {
    this.name = name;
    this.reportType = reportType;
    this.notificationTitle = notificationTitle;
    this.notificationBody = notificationBody;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getReportType() {
    return reportType;
  }

  public void setReportType(String reportType) {
    this.reportType = reportType;
  }

  public String getNotificationTitle() {
    return notificationTitle;
  }

  public void setNotificationTitle(String notificationTitle) {
    this.notificationTitle = notificationTitle;
  }

  public String getNotificationBody() {
    return notificationBody;
  }

  public void setNotificationBody(String notificationBody) {
    this.notificationBody = notificationBody;
  }

  @Override
  public String toString() {
    StringBuilder builder = new StringBuilder();
    builder
        .append("Notification [id=")
        .append(id)
        .append(", name=")
        .append(name)
        .append(", reportType=")
        .append(reportType)
        .append(", notificationTitle=")
        .append(notificationTitle)
        .append(", notificationBody=")
        .append(notificationBody);

    return builder.toString();
  }
}
