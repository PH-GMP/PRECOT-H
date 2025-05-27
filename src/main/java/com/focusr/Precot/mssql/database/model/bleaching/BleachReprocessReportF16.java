package com.focusr.Precot.mssql.database.model.bleaching;

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
@Table(name = "BLEACH_REPROCESS_REPORT_F16", schema = AppConstants.schema)
public class BleachReprocessReportF16 extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "FORM_NUMBER")
	private String formNumber;
	
	@Column(name = "FORMAT_NAME")
	private String formName;
	
	@Column(name = "REVISION_NUMBER")
	private String revisionNumber;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "REJECT_REASON")
	private String rejectReason;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	
		// FIELDS 
	
	@Column(name = "PROCESS_DATE")
	private String processDate;
	
	@Column(name = "BMR_NUMBER")
	private String bmrNumber;
	
	@Column(name = "SUB_BATCH_NUMBER")
	private String subBatchNumber;
	
	@Column(name = "BALE_NUMBER")
	private String baleNumber;
	
	@Column(name = "REASON_REPROCESS")
	private String reasonReprocess;
	
	@Column(name = "FAILURE_STAGE")
	private String failureStage;
	
	@Column(name = "REPROCESS_QUANTITY")
	private String reprocessQuantity;
	
	@Column(name = "REFERENCE_NC_NUMBER")
	private String referenceNCnumber;
	
	@Column(name = "REPROCESS_STAGE")
	private String reprocessStage;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	
		// STATUS
	
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisorStatus;
	
	@Column(name = "SUPERVISOR_SIGN")
	private String supervisorSign;
	
	@Column(name = "SUPERVISOR_SAVED_BY")
	private String supervisorSaveBy;
	
	@Column(name = "SUPERVISOR_SAVED_ON")
	private Date supervisorSavedOn;
	
	@Column(name = "SUPERVISOR_SAVED_ID")
	private Long supervisorSavedId;
	
	@Column(name = "SUPERVISOR_SUBMITTED_ID")
	private Long supervisorSubmittedId;
	
	@Column(name = "SUPERVISOR_SUBMITTED_BY")
	private String supervisorSubmittedBy;
	
	@Column(name = "SUPERVISOR_SUBMITTED_ON")
	private Date supervisorSubmittedOn;
	
	
		// hod
	
	@Column(name = "HOD_STATUS")
	private String hodStatus;
	
	@Column(name = "HOD_SIGN")
	private String hodSign;
	
	@Column(name = "HOD_SUBMITTED_BY")
	private String hodSubmittedBy;

	@Column(name = "HOD_SUBMITTED_ID")
	private Long hodSubmittedId;
	
	@Column(name = "HOD_SUBMITTED_DATE")
	private Date hodSubmittedDate;
	
	
		// QA
	
	@Column(name = "QA_STATUS")
	private String qaStatus;
	
	@Column(name = "QA_SIGN")
	private String qaSign;
	
	@Column(name = "QA_SUBMITTED_BY")
	private String qaSubmittedBy;

	@Column(name = "qa_SUBMITTED_ID")
	private Long qaSubmittedId;
	
	@Column(name = "QA_SUBMITTED_DATE")
	private Date qaSubmittedDate;
	
}

