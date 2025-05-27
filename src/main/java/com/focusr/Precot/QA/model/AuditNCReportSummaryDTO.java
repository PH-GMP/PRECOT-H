package com.focusr.Precot.QA.model;

import lombok.Data;

@Data
public class AuditNCReportSummaryDTO {
	private Long reportId;
	private String auditYear;
	private String iarNo;
	private String ncrNo;
	private String department;
	private String firstAuditorStatus;
	private String secondAuditorStatus;
	private String auditeeStatus;
	private String qaMrStatus;
	private String qaMrSubmitStatus;
	private String qaMrApprovalStatus;
	
	private String reason;
	
	public AuditNCReportSummaryDTO(Long reportId,String auditYear,String iarNo,String ncrNo,String department,
				String firstAuditorStatus,String auditeeStatus,String secondAuditorStatus,
				String qaMrStatus,String qaMrSubmitStatus,String qaMrApprovalStatus,String reason) 
	{
		this.reportId = reportId;
		this.auditYear = auditYear;
		this.iarNo = iarNo;
		this.ncrNo = ncrNo;
		this.department = department;
		this.firstAuditorStatus = firstAuditorStatus;
		this.auditeeStatus = auditeeStatus;
		this.secondAuditorStatus = secondAuditorStatus;
		this.qaMrStatus = qaMrStatus;
		this.qaMrSubmitStatus = qaMrSubmitStatus;
		this.qaMrApprovalStatus = qaMrApprovalStatus;
		this.reason = reason;
	}

}
