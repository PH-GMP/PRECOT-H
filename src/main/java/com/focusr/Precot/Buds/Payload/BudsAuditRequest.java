package com.focusr.Precot.Buds.Payload;

import lombok.Data;

@Data
public class BudsAuditRequest {

	private String department;
	
	private String formName;
	
	private String fromDate;
	
	private String toDate;
	
		// FORM - PRODUCT CHANGE OVER
	
	private String orderNumber;
	
		// FORM - DAILY PRODUCTION 
	
	private String machineName;
	
		// LOGBOOK
	
	private String year;
	
	private String month;
	
	private String shift;
	
	private String date;
	
		// EQUIPMENT 
	
	private String bmrNumber;
	
}
