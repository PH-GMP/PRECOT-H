package com.focusr.Precot.payload.engineering;

import lombok.Data;

@Data
public class EngineeringAuditRequest {

	
	
	private String department;
	private String form_name;
	private String from_date;
	private String to_date;
	
	
	private String bisNo ;
	
	
	private String rcaNo;
	
	private String machineIdNo;
	
	private String worNo;
	
	
}
