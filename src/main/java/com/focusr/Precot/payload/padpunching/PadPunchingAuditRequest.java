package com.focusr.Precot.payload.padpunching;

import lombok.Data;

@Data
public class PadPunchingAuditRequest {

	private String department;
	private String form_name;
	private String from_date;
	private String to_date;
	
	// 001
	private String f01_shift;

	// 002
	private String f02_shift;
	private String f02_machine_name;

	// 003
	private String f03_shift;
	private String f03_machine_name;

	// 004
	private String f04_shift;

	// 005
//	private String f05_shift;
	private String f05_machine_name;
	
	// 006
	private String f06_shift;
	
	//007 - date only
	
	//014
	private String f14_shift;
	private String f14_machine_name;
	private String f14_product_name;
	
	private String shift;
	private String machine;
	private String week;
	private String month;
	private String year;
}
