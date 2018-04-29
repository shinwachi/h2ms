package edu.harvard.h2ms.domain.core;

import javax.persistence.Column;
import javax.persistence.Entity;
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

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne()
  @JoinColumn(name = "notification_id", nullable = false)
  private Notification notification;

  @Column(name = "notification_interval")
  private Long notificationInterval;

  @Column(name = "last_notified_time")
  private Long lastNotifiedTime;

  /* dummy constructor */
  public NotificationSubscription() {
    super();
  }

  public NotificationSubscription(User user, long notificationInterval) {
    this.user = user;
    this.notificationInterval = notificationInterval;
    this.lastNotifiedTime = 0L;
  }
}
