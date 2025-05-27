package com.focusr.Precot.QA.model;
import java.time.LocalDate;

import lombok.Data;

@Data
public class CorrectiveActionReportSummaryDTO {
	private Long reportId;
	private String year;
	private String month;
	private LocalDate reportDate;
	private String qaInspectorStatus;
	private String qaDesigneeStatus;
	private String qaManagerMrStatus;
	private String reason;
	
	public CorrectiveActionReportSummaryDTO(Long reportId,String year,String month,LocalDate reportDate,String qaInspectorStatus,String qaDesigneeStatus,String qaManagerMrStatus,String reason) 
	{
		this.reportId = reportId;
		this.year = year;
		this.month = month;
		this.reportDate = reportDate;
		this.qaInspectorStatus = qaInspectorStatus;
		this.qaDesigneeStatus = qaDesigneeStatus;
		this.qaManagerMrStatus = qaManagerMrStatus;
		this.reason = reason;
	}

}