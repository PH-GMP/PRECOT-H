package com.focusr.Precot.QA.model;

import lombok.Data;

@Data
public class AuditReportSummaryDTO {
	
	private Long reportId;
	private String auditYear;
	private String auditMonth;
	private String department;
	private String auditeeStatus;
	private String auditorStatus;
	private String qaMrStatus;
	private String reason;
	
	public AuditReportSummaryDTO(Long reportId, String auditYear, String auditMonth, String department,
			String auditeeStatus, String auditorStatus, String qaMrStatus, String reason) {
		super();
		this.reportId = reportId;
		this.auditYear = auditYear;
		this.auditMonth = auditMonth;
		this.department = department;
		this.auditeeStatus = auditeeStatus;
		this.auditorStatus = auditorStatus;
		this.qaMrStatus = qaMrStatus;
		this.reason = reason;
	}
	
//	public AuditReportSummaryDTO(Long reportId,String auditYear,String auditMonth,String department,String auditeeStatus,String auditorStatus,String qrMrStatus,String reason) 
//	{
//		this.reportId = reportId;
//		this.auditYear = auditYear;
//		this.auditMonth =  auditMonth;
//		this.department = department;
//		this.auditeeStatus = auditeeStatus;
//		this.auditorStatus = auditorStatus;
//		this.qaMrStatus = qaMrStatus;
//		this.reason=reason;
//	}
	
}
