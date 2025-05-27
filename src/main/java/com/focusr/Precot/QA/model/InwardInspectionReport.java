package com.focusr.Precot.QA.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_INWARD_INSPECTION_REPORT", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "GR_DATE","SUPPLIER_NAME","INVOICE_NO","IIR_NO" }) })
public class InwardInspectionReport extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	// common for all
	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "SOP_NO")
	private String sopNumber;

	@Column(name = "REVISION_NO")
	private String revisionNo;
	
	@Column(name = "DATE")
	private String date;
	
	// report
	@Column(name = "IIR_NO")
	private String iir_no;
	
	@Column(name = "BATCH_NO")
	private String batch_no;
	
	@Column(name = "LOT_QTY")
	private String lot_qty;
	
	@Column(name = "ITEM_DESCRIPTION")
	private String item_description;
	
	@Column(name = "AQL_SAMPLE_SIZE")
	private String aql_sample_size;
	
	@Column(name = "SUPPLIER_NAME")
	private String supplier_name;
	
	@Column(name = "PO_NO")
	private String po_no;
	
	@Column(name = "ITEM_CODE")
	private String item_code;
	
	@Column(name = "INVOICE_NO")
	private String invoice_no;
	
	@Column(name = "GR_DATE")
	private String gr_date;
	
	@Column(name = "GR_NO")
	private String gr_no;
	
	@Column(name = "PDS_NO")
	private String pds_no;
	
	@Column(name = "COA_REFERENCE_NO")
	private String coa_reference_no;
	
	@Column(name = "ACCEPTED")
	private String accepted;
	
	@Column(name = "REJECTED")
	private String rejected;
	
	@Column(name = "LOT_STATUS")
	private String lot_status;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	//FLIM
	@Column(name = "NO_OF_ROLLS")
	private String no_of_rolls;
	
	@Column(name = "NO_OF_SAMPLE_ROLLS")
	private String no_of_sample_rolls;
	
	@Column(name = "SAMPLE_QUANTITY")
	private String sample_quantity;
	
	//Status
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

	// QA MANAGER
	@Column(name = "QA_MANAGER_STATUS")
	private String qa_manager_status;

	@Column(name = "QA_MANAGER_SUBMITTED_ON")
	private Date qa_manager_submitted_on;

	@Column(name = "QA_MANAGER_SUBMITTED_BY")
	private String qa_manager_submitted_by;

	@Column(name = "QA_MANAGER_SUBMITTED_ID")
	private Long qa_manager_submitted_id;

	@Column(name = "QA_MANAGER_SIGN")
	private String qa_manager_sign;
	
	@Column(name = "REASON")
	private String reason;
	
	//mappings
//	 @OneToMany(mappedBy = "inwardinspectionreport", cascade = CascadeType.ALL)
//	    private List<InwardInspectionReportLine1> line1;
//	 
//	 @OneToMany(mappedBy = "inwardinspectionreport", cascade = CascadeType.ALL)
//	    private List<InwardInspectionReportLine2> line2;
	
	@OneToMany(targetEntity = InwardInspectionReportLine1.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "ID", referencedColumnName = "ID")
	private List<InwardInspectionReportLine1> line1;
	
	@OneToMany(targetEntity = InwardInspectionReportLine2.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "ID", referencedColumnName = "ID")
	private List<InwardInspectionReportLine2> line2;
	

	
	
	
}
