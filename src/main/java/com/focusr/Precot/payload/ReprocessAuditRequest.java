package com.focusr.Precot.payload;

import lombok.Data;

@Data
public class ReprocessAuditRequest {

	private String department;
	
	private String formName;
	
	
	private String fromDate;
	
	private String toDate;
	
	private String date;
	
	private String bmrNumber;
	
	private String batchNumber;
}
