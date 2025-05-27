//package com.focusr.Precot.QA.model;
//
//import java.util.Date;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;
//import javax.persistence.UniqueConstraint;
//
//import com.focusr.Precot.util.AppConstants;
//
//import lombok.Data;
//
//@Data
//@Entity
//@Table(name = "QA_CUSTOMER_COMPLAINT_REGISTER", schema = AppConstants.schema)
//public class QaCustomerComplaintRegister {
//
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "COMPLAINT_ID")
//	private Long complaint_id;
//
//	@Column(name = "FORMAT_NAME")
//	private String format_name;
//
//	@Column(name = "FORMAT_NO")
//	private String format_no;
//
//	@Column(name = "REVISION_NO")
//	private Long revision_no;
//
//	@Column(name = "REF_SOP_NO")
//	private String sop_number;
//
//	@Column(name = "UNIT")
//	private String unit;
//
//	@Column(name = "DATE_OF_COMPLAINT")
//	private String date_of_complaint;
//
//	@Column(name = "COMPLAINT_NO")
//	private String complaint_no;
//
//	@Column(name = "STATUS")
//	private String customer_name;
//
//	@Column(name = "SAMPLE_RECEIVED_ON")
//	private String customer_refference_number;
//
//	@Column(name = "PRODUCT_DESCRIPTION")
//	private String product_description;
//
//	@Column(name = "STATUS")
//	private String fg_no;
//
//	@Column(name = "SAMPLE_RECEIVED_ON")
//	private String nature_of_complaint;
//
//	@Column(name = "DETAILS_OF_COMPLAINT_SAMPLE")
//	private String details_of_complaint_sample;
//
//	@Column(name = "SAMPLE_RECEIVED_ON")
//	private String sample_received_on;
//
//	@Column(name = "COMPLAINT_REPLIED_ON")
//	private String complaint_replied_on;
//
//	@Column(name = "STATUS")
//	private String status;
//
//	@Column(name = "QA_MR_STATUS")
//	private String qa_mr_status;
//
//	@Column(name = "QA_MR_SAVE_ON")
//	private Date qa_mr_save_on;
//
//	@Column(name = "QA_MR_SAVE_BY")
//	private String qa_mr_save_by;
//
//	@Column(name = "QA_MR_SAVE_ID")
//	private Long qa_mr_save_id;
//
//	@Column(name = "QA_MR_SUBMIT_ON")
//	private Date qa_mr_submit_on;
//
//	@Column(name = "QA_MR_SUBMIT_BY")
//	private String qa_mr_submit_by;
//
//	@Column(name = "QA_MR_SUBMIT_ID")
//	private Long qa_mr_submit_id;
//
//	@Column(name = "QA_MR_SIGN")
//	private String qa_mr_sign;
//
//}
