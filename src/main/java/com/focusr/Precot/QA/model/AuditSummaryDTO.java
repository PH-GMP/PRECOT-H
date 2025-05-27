package com.focusr.Precot.QA.model;

import lombok.Data;

@Data
public class AuditSummaryDTO {
	
	private Long scheduleId;
	private String auditScheduleYear;
	private String auditScheduleMonth;
	private String auditScheduleStatus;
	public AuditSummaryDTO(Long scheduleId , String auditScheduleYear, String auditScheduleMonth, String auditScheduleStatus)
	{
		this.scheduleId = scheduleId;
		this.auditScheduleYear = auditScheduleYear;
		this.auditScheduleMonth = auditScheduleMonth;
		this.auditScheduleStatus = auditScheduleStatus;
	}
	
}
