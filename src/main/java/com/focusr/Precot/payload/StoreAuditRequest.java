package com.focusr.Precot.payload;


import lombok.Data;

@Data
public class StoreAuditRequest {

	

	private String department;
	private String form_name;
	private String from_date;
	private String to_date;
	
	// 003
	private String invoiceNo ;
	private String description;


	// 008
	private String forkliftNo;

	// 006
	private String gatePassNo;


	
	
}
