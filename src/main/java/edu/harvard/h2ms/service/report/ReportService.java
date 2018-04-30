package edu.harvard.h2ms.service.report;

import java.util.Map;

public interface ReportService {

  /**
   * Generates report
   *
   * @param reportType
   * @return report in string
   */
  public String requestReport(String reportType, Map<String, String> notificationParameters);

  public String requestReport(String reportType);
}
