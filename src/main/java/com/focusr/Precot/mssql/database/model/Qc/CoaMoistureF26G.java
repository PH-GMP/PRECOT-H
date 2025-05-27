package com.focusr.Precot.mssql.database.model.Qc;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "COA_MOISTURE_F26G", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "PRODUCT", "CUSTOMER", "TESTING_DATE" }) })
public class CoaMoistureF26G extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "DATE")
	private String date;

	@Column(name = "PRODUCT")
	private String product;

	@Column(name = "CUSTOMER")
	private String customer;

	@Column(name = "BATCH_NO")
	private String batch_no;

	@Column(name = "LOT_NO")
	private String lot_no;

	@Column(name = "PO_NO")
	private String po_no;

	@Column(name = "QUANTITY")
	private String quantity;

	// FIELDS

	@Column(name = "TESTING_DATE")
	private String testing_date;

//	@Column(name = "INITIAL_WEIGHT")
//	private String initial_weight;
//
//	@Column(name = "FINAL_WEIGHT")
//	private String final_weight;
//
//	@Column(name = "RESULT")
//	private String result;
//
//	@Column(name = "REMARKS")
//	private String remarks;

	@Column(name = "REASON")
	private String reason;

	// STATUS FOR ALL ROLES

	// CHEMIST

	@Column(name = "CHEMIST_STATUS")
	private String chemist_status;

	@Column(name = "CHEMIST_SAVED_ON")
	private Date chemist_saved_on;

	@Column(name = "CHEMIST_SAVED_BY")
	private String chemist_saved_by;

	@Column(name = "CHEMIST_SAVED_ID")
	private Long chemist_saved_id;

	@Column(name = "CHEMIST_SUBMIT_ON")
	private Date chemist_submit_on;

	@Column(name = "CHEMIST_SUBMIT_BY")
	private String chemist_submit_by;

	@Column(name = "CHEMIST_SUBMIT_ID")
	private Long chemist_submit_id;

	@Column(name = "CHEMIST_SIGN")
	private String chemist_sign;

	// QA EXECUTIVE

	@Column(name = "QA_EXE_STATUS")
	private String qa_exe_status;

	@Column(name = "QA_EXE_SUBMIT_ON")
	private Date qa_exe_submit_on;

	@Column(name = "QA_EXE_SUBMIT_BY")
	private String qa_exe_submit_by;

	@Column(name = "QA_EXE_SUBMIT_ID")
	private Long qa_exe_submit_id;

	@Column(name = "QA_EXE_SIGN")
	private String qa_exe_sign;

	// QC

	@Column(name = "MANAGER_STATUS")
	private String manager_status;

	@Column(name = "MANAGER_SUBMIT_ON")
	private Date manager_submit_on;

	@Column(name = "MANAGER_SUBMIT_BY")
	private String manager_submit_by;

	@Column(name = "MANAGER_SUBMIT_ID")
	private Long manager_submit_id;

	@Column(name = "MANAGER_SIGN")
	private String manager_sign;

	// AMC

	@OneToMany(targetEntity = CoaMoistureF26GLines.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "ID", referencedColumnName = "ID ")
	private List<CoaMoistureF26GLines> details;

}
