package com.focusr.Precot.QA.model;

import lombok.Data;

@Data
public class TrainingCalendarSummaryDTO {
	private Long calendarId;
	private String year;
	private String qaDesigneeStatus;
	private String qaManagerMrStatus;
	private String reason;
	
	public TrainingCalendarSummaryDTO(Long calendarId,String year,String qaDesigneeStatus,String qaManagerMrStatus,String reason) 
	{
		this.calendarId = calendarId;
		this.year = year;
		this.qaDesigneeStatus = qaDesigneeStatus;
		this.qaManagerMrStatus = qaManagerMrStatus;
		this.reason = reason;
	}

}
