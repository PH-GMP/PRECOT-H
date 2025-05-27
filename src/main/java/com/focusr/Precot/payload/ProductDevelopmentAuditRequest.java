package com.focusr.Precot.payload;

import lombok.Data;

@Data
public class ProductDevelopmentAuditRequest {
	
	
	private String department;
	private String form_name;
	private String from_date;
	private String to_date;
	
	private String pdsNo;
	

}
