package com.focusr.Precot.util.Qc;

import com.focusr.Precot.payload.padpunching.PadPunchingAuditRequest;

import lombok.Data;

@Data
public class QcAuditRequest {

	private String department;
	private String form_name;
	private String from_date;
	private String to_date;
	
//  ARF001
	private String millBatchNo;
	
//ARF003
	private String materialDocNo;
	
//  F026
	private String productionDate;
	private String testingDate;
	private String lotNumber;
//F001&F002&F003	

	private Long shiftNum;
//F004	
	private String bleachingBmrNo;
	
//F012	
	private String eqIdNo; 
	
//F019
	private String loadNo;
	
	private String week;
	private String month;
	private String year;
	
	private String product;
	private String customer;
	
	private String shift;
	private String chemical;
	
	private String eq_id;
	private String subbatch;
}
