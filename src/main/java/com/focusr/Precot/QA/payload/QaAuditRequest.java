package com.focusr.Precot.QA.payload;

import lombok.Data;

@Data
public class QaAuditRequest {

	private String department;
	private String departmentName;
	private String form_name;
	private String form_no;
	private String from_date;
	private String to_date;
	private String shift;
	private String week;
	private String month;
	private String year;
	private String gr_date;
	private String supplier_name;
	private String iir_no;
	private String invoice_no;
	private String ccf_no;
	private String machine_no;
	private String bmr_no;
	private String porder;
	private String cir_no;
	private String seq_no;
    private String changeControlNo;
    private String traineeIdNumber;
    private String dateOfInitiation;
    private String deviationNumber;
}
