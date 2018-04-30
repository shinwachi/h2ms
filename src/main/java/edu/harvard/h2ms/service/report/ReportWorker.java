package edu.harvard.h2ms.service.report;

import java.util.Map;

public interface ReportWorker {

  public String getType();

  public String createReport(Map<String, String> notificationParameters);
}
