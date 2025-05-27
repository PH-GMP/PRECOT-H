package com.focusr.Precot.QA.model;

import lombok.Data;

@Data
public class InternalAuditSummaryDTO {

	private Long reportId;
	private String iarNo;
	private String department;
	private String clauseNos;
	private int totalNcs;
	private int minorNcs;
	private int majorNcs;
	private int observations;
	private String statusOfNcs;
	private String standard;
}
