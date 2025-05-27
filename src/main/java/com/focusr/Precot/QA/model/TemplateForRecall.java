package com.focusr.Precot.QA.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "TEMPLATE_FOR_RECALL", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE" }) })

public class TemplateForRecall extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "UNIT")
	private String unit;

	// FORM FIELDS

	@Column(name = "DATE")
	private String date;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "PRODUCT_NAME")
	private String product_name;

	@Column(name = "CUSTOMER_NAME")
	private String customer_name;

	@Column(name = "PO_NO_AND_DATE")
	private String po_no_and_date;

	@Column(name = "LOT_NO")
	private String lot_no;

	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "REASON_FOR_RECALL")
	private String reason_for_recall;

	@Column(name = "MANUFACTURING_DATE")
	private String manufacturing_date;

	@Column(name = "EXPIRY_DATE")
	private String expiry_date;

	@Column(name = "QUALITY_PRODUCED")
	private String quality_produced;

	@Column(name = "TOTAL_SHIPPED_QTY")
	private String total_shipped_qty;

	@Column(name = "DISPATCH_DATE")
	private String dispatch_date;

	@Column(name = "CONTAINER_NO")
	private String container_no;

	@Column(name = "QTY_IN_FG")
	private String qty_in_fg;

	@Column(name = "QTY_RECEIVED")
	private String qty_received;

	@Column(name = "QTY_SOLD")
	private String qty_sold;

	@Column(name = "QTY_UNDISTRIBUTED")
	private String qty_undistributed;

	@Column(name = "MEMBERS_PRESENT")
	private String members_present;

	@Column(name = "INFORMED_TO_CUSTOMER")
	private String informed_to_customer;

	@Column(name = "QTY_IN_DEPOT")
	private String qty_in_depot;

	@Column(name = "TIME_TAKEN_TO_TRACE")
	private String time_taken_to_trace;

	@Column(name = "FURTHER_ACTION")
	private String further_action;

	@Column(name = "CONCLUSUION")
	private String conclusuion;

	// QA INSPECTOR

	@Column(name = "QA_INSPECTOR_STATUS")
	private String qa_inspector_status;

	@Column(name = "QA_INSPECTOR_SAVED_ON")
	private Date qa_inspector_saved_on;

	@Column(name = "QA_INSPECTOR_SAVED_BY")
	private String qa_inspector_saved_by;

	@Column(name = "QA_INSPECTOR_SAVED_ID")
	private Long qa_inspector_saved_id;

	@Column(name = "QA_INSPECTOR_SUBMITTED_ON")
	private Date qa_inspector_submitted_on;

	@Column(name = "QA_INSPECTOR_SUBMITTED_BY")
	private String qa_inspector_submitted_by;

	@Column(name = "QA_INSPECTOR_SUBMITTED_ID")
	private Long qa_inspector_submitted_id;

	@Column(name = "QA_INSPECTOR_SIGN")
	private String qa_inspector_sign;

	// MANAGER STATUS

	@Column(name = "MANAGER_STATUS")
	private String manager_status;

	@Column(name = "MANAGER_SUBMITTED_ON")
	private Date manager_submitted_on;

	@Column(name = "MANAGER_SUBMITTED_BY")
	private String manager_submitted_by;

	@Column(name = "MANAGER_SUBMITTED_ID")
	private Long manager_submitted_id;

	@Column(name = "MANAGER_SIGN")
	private String manager_sign;

}
