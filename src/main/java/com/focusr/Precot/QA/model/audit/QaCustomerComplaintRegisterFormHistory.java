package com.focusr.Precot.QA.model.audit;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_CUSTOMER_COMPLAINT_REGISTER_FORM_HISTORY", schema = AppConstants.schema)
public class QaCustomerComplaintRegisterFormHistory extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HISTORY_ID")
	private Long history_id;

	@Column(name = "FORMAT_NAME")
	private String format_name;

	@Column(name = "FORMAT_NO")
	private String format_no;

	@Column(name = "REVISION_NO")
	private Long revision_no;

	@Column(name = "REF_SOP_NO")
	private String sop_number;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "DATE")
	private String date;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "FINANCIAL_YEAR")
	private String financial_year;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "CCF_NO")
	private String ccf_no;

	@Column(name = "COMPLAINT_RECEIVED_DATE")
	private String complaint_received_date;

	@Column(name = "CUSTOMER_NAME")
	private String customer_name;

	@Column(name = "CUSTOMER_COMPLAINT_REF_NO")
	private String customer_complaint_ref_no;

	@Column(name = "BATCH_NO")
	private String batch_no;

	@Column(name = "PRODUCTION_DATE")
	private String production_date;

	@Column(name = "INVOICE_NO")
	private String invoice_no;

	@Column(name = "PRODUCT_NAME")
	private String product_name;

	@Column(name = "SALE_ORDER_NO")
	private String sale_order_no;

	@Column(name = "CONTAINER_NO")
	private String container_no;

	@Column(name = "COMPLAINT_SAMPLE_RECEIVED")
	private String complaint_sample_received;

	@Column(name = "STRENGTH_OF_PRODUCT")
	private String strength_of_product;

	@Column(name = "PACKING")
	private String packing;

	@Column(name = "GRAMMAGE")
	private String grammage;

	@Column(name = "CHEMICAL")
	private String chemical;

	@Column(name = "LESSER_COUNT")
	private String lesser_count;

	@Column(name = "CONTAMINATION")
	private String contamination;

	@Column(name = "LESS_QTY")
	private String less_qty;

	@Column(name = "OTHERS")
	private String others;

	// COUNT FOR TREND CHART
	@Column(name = "COUNT_OF_NATURE_OF_COMPLAINTS")
	private String count_of_nature_of_complaints;

	@Column(name = "CRITICAL")
	private String critical;

	@Column(name = "MAJOR")
	private String major;

	@Column(name = "MINOR")
	private String minor;

	@Column(name = "NATURE_OF_NON_CONFORMITY")
	private String nature_of_non_conformity;

	@Column(name = "WHY1")
	private String why1;

	@Column(name = "WHY2")
	private String why2;

	@Column(name = "WHY3")
	private String why3;

	@Column(name = "WHY4")
	private String why4;

	@Column(name = "WHY5")
	private String why5;

	@Column(name = "CORRECTIVE_ACTION")
	private String corrective_action;

	@Column(name = "VERIFICATION_FOR_EFFECTIVENESS")
	private String verification_for_effectiveness;

	@Column(name = "TARGET_DATE")
	private String target_date;

	@Column(name = "QA_MR_STATUS")
	private String qa_mr_status;

	@Column(name = "QA_MR_SUBMIT_ON")
	private Date qa_mr_submit_on;

	@Column(name = "QA_MR_SUBMIT_BY")
	private String qa_mr_submit_by;

	@Column(name = "QA_MR_SUBMIT_ID")
	private Long qa_mr_submit_id;

	@Column(name = "QA_MR_SIGN")
	private String qa_mr_sign;

	@Column(name = "HOD_STATUS")
	private String hod_status;

	@Column(name = "HOD_SUBMIT_ON")
	private Date hod_submit_on;

	@Column(name = "HOD_SUBMIT_BY")
	private String hod_submit_by;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hod_submit_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;

	@Column(name = "REASON")
	private String reason;

	// CUSTOMER COMPLAINT REGISTER
	@Column(name = "SAMPLE_RECEIVED_ON")
	private String sample_received_on;

	@Column(name = "COMPLAINT_REPLIED_ON")
	private String complaint_replied_on;

	@Column(name = "STATUS")
	private String status;

	// version
	@Column(name = "VERSION")
	private int version;

}
