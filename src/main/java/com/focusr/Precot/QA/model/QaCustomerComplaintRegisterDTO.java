package com.focusr.Precot.QA.model;

import java.math.BigInteger;

import lombok.Data;

@Data
public class QaCustomerComplaintRegisterDTO {

	private String format_name;

	private String format_no;

	private BigInteger revision_no;

	private String sop_number;

	private String unit;

	private String complaint_received_date;
	
	private String ccf_no;

	private String customer_name;
	
	private String customer_complaint_ref_no;
	
	private String production_date;
	
	private String batch_no;
	
	// Nature of Complaints
	private String strength_of_product;
	
	private String packing;
	
	private String grammage;
	
	private String chemical;
	
	private String lesser_count;
	
	private String contamination;
	
	private String less_qty;
	
	private String others;

	private String complaint_sample_received;
	
	private String sample_received_on;
	
	private String complaint_replied_on;
	
	private String status;

	public QaCustomerComplaintRegisterDTO(String format_name, String format_no, BigInteger revision_no, String sop_number,
			String unit, String complaint_received_date, String ccf_no, String customer_name,
			String customer_complaint_ref_no, String production_date, String batch_no, String strength_of_product,
			String packing, String grammage, String chemical, String lesser_count, String contamination,
			String less_qty, String others, String complaint_sample_received, String sample_received_on,
			String complaint_replied_on, String status) {
		super();
		this.format_name = format_name;
		this.format_no = format_no;
		this.revision_no = revision_no;
		this.sop_number = sop_number;
		this.unit = unit;
		this.complaint_received_date = complaint_received_date;
		this.ccf_no = ccf_no;
		this.customer_name = customer_name;
		this.customer_complaint_ref_no = customer_complaint_ref_no;
		this.production_date = production_date;
		this.batch_no = batch_no;
		this.strength_of_product = strength_of_product;
		this.packing = packing;
		this.grammage = grammage;
		this.chemical = chemical;
		this.lesser_count = lesser_count;
		this.contamination = contamination;
		this.less_qty = less_qty;
		this.others = others;
		this.complaint_sample_received = complaint_sample_received;
		this.sample_received_on = sample_received_on;
		this.complaint_replied_on = complaint_replied_on;
		this.status = status;
	}
	
}
