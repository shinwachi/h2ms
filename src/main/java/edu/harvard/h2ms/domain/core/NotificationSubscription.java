package edu.harvard.h2ms.domain.core;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

@Entity
@Table(name = "subscription")
public class NotificationSubscription {

  private static final Log log = LogFactory.getLog(NotificationSubscription.class);

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "ID")
  private Long id;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "notification_id", nullable = false)
  private Notification notification;

  @Column(name = "notification_interval", nullable = true)
  private Long notificationInterval;

  @Column(name = "last_notified_time")
  private Long lastNotifiedTime;

  /* dummy constructor */
  public NotificationSubscription() {
    super();
  }

  public NotificationSubscription(User user, Notification notification, long notificationInterval) {
    this.user = user;
    this.notification = notification;
    this.notificationInterval = notificationInterval;
    this.lastNotifiedTime = 0L;
  }

  public NotificationSubscription(User user, Notification notification) {
    this.user = user;
    this.notification = notification;
    this.notificationInterval = null;
    this.lastNotifiedTime = 0L;
  }

  public User getUser() {
    return this.user;
  }
}
