package com.focusr.Precot.QA.model.audit;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.QA.model.SupplierAuditReport;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;
@Data
@Entity
@Table(name = "QA_SUPPLIER_AUDIT_REPORT_HISTORY", schema = AppConstants.schema)
public class SupplierAuditReportHistory extends UserDateAudit{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HISTORY_ID")
	private Long reportId;
	
	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String sopNumber;

	@Column(name = "REPORT_DATE")
	private LocalDate reportDate;
	
	@Column(name = "SUPPLIER_NAME")
	private String supplierName;

	@Column(name = "SUPPLIER_REPRESENTATIVE")
	private String supplierRepresentative;

	@Column(name = "AUDITORS")
	private String auditors;
	
	@Column(name = "AUDITOR_NAME_TO_SIGN")
	private String auditorNameToSign;
	
	@Column(name = "AUDITOR_DATE_TO_SIGN")
	private String auditorDateToSign;
	
	@Column(name = "SUPPLIER_STATUS")
	private String supplierStatus;
	
	@Column(name = "SUPPLIER_DATE_TO_SIGN")
	private String supplierDateToSign;
	
	@Column(name = "SUPPLIER_EMAIL_ID")
	private String supplierEmailId;
	
	@Column(name = "AUDITOR_EMAIL_ID")
	private String auditorEmailId;
	
	@Column(name = "ADDRESS")
	private String address;
	
	@Column(name = "OBJECTIVES")
	private String objectives;
	
	@Column(name = "SCOPE")
	private String scope;
	
	@Column(name = "METHODOLOGY")
	private String methodology;
	
	@Column(name = "AREAS_AUDITED")
	private String areasAudited;
	
	@Column(name = "ATTACHMENTS")
	private String attachments;
	
	@Column(name = "OBSERVATION")
	private String observation;
	
	// Auditor INFO
	@Column(name = "AUDITOR_STATUS")
	private String auditorStatus;
			
	@Column(name = "AUDITOR_SAVE_ON")
	private Date auditorSaveOn;

	@Column(name = "AUDITOR_SAVE_BY")
	private String auditorSaveBy;

	@Column(name = "AUDITOR_SAVE_ID")
	private Long auditorSaveId;
			
	@Column(name = "AUDITOR_SUBMIT_ON")
	private Date auditorSubmitOn;

	@Column(name = "AUDITOR_SUBMIT_BY")
	private String auditorSubmitBy;

	@Column(name = "AUDITOR_SUBMIT_ID")
	private Long auditorSubmitId;

	@Column(name = "AUDITOR_SIGN")
	private String auditorSign;
	
	@Column(name = "PDF_SUBMIT_ON")
	private Date pdfSubmitOn;

	@Column(name = "PDF_SUBMIT_BY")
	private String pdfSubmitBy;

	@Column(name = "PDF_SUBMIT_ID")
	private Long pdfSubmitId;

	@Column(name = "PDF_SUBMIT_BY_SIGN")
	private String pdfSubmitBySign;

		
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "VERSION")
	private int version;
	
	@Lob
	@Column(name="REPORT_PDF")
	private byte[] reportPdf;
	
	@Column(name="FILE_NAME")
	private String fileName;

}
