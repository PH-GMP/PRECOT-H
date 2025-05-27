package com.focusr.Precot.QA.model.audit;

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
@Table(name = "QA_INTERNAL_AUDIT_REPORT_HISTORY", schema = AppConstants.schema)
public class InternalAuditReportHistory extends UserDateAudit{

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
	
	@Column(name = "AUDIT_YEAR")
	private String auditYear;
	
	@Column(name = "AUDIT_MONTH")
	private String auditMonth;
	
	@Column(name = "AUDITEE_NAME")
	private String auditeeName;
	
	@Column(name = "AUDITOR_NAME")
	private String auditorName;
	
	@Column(name = "IAR_NO")
	private String iarNo;
	
	@Column(name = "REPORT_DATE")
	private String reportDate;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "STANDARD")
	private String standard;
	
	@Column(name = "AUDIT_REMARKS")
	private String auditRemarks;
	
	@Column(name = "TOTAL_NO_OF_NC")
	private int totalNoOfNc;
	
	@Column(name = "NUMBER_OF_MINOR_NC")
	private int noOfMinorNc;
	
	@Column(name = "NUMBER_OF_MAJOR_NC")
	private int noOfMajorNc;
	
	@Column(name = "REASON")
	private String Reason;
	
	// AUDITEE INFO
	@Column(name = "AUDITEE_STATUS")
	private String auditeeStatus;
	
	@Column(name = "AUDITEE_SAVE_ON")
	private Date auditeeSaveOn;

	@Column(name = "AUDITEE_SAVE_BY")
	private String auditeeSaveBy;

	@Column(name = "AUDITEE_SAVE_ID")
	private Long auditeeSaveId;
	
	@Column(name = "AUDITEE_SUBMIT_ON")
	private Date auditeeSubmitOn;

	@Column(name = "AUDITEE_SUBMIT_BY")
	private String auditeeSubmitBy;

	@Column(name = "AUDITEE_SUBMIT_ID")
	private Long auditeeSubmitId;

	@Column(name = "AUDITEE_SIGN")
	private String auditeeSign;

	// AUDITOR
	@Column(name = "AUDITOR_STATUS")
	private String auditorStatus;

	@Column(name = "AUDITOR_SUBMIT_ON")
	private Date auditorSubmitOn;

	@Column(name = "AUDITOR_SUBMIT_BY")
	private String auditorSubmitBy;

	@Column(name = "AUDITOR_SUBMIT_ID")
	private Long auditorSubmitId;

	@Column(name = "AUDITOR_SIGN")
	private String auditorSign;
		
	// QA_MR
	@Column(name = "QA_MR_STATUS")
	private String qaMrStatus;

	@Column(name = "QA_MR_SUBMIT_ON")
	private Date qaMrSubmitOn;

	@Column(name = "QA_MR_SUBMIT_BY")
	private String qaMrSubmitBy;

	@Column(name = "QA_MR_SUBMIT_ID")
	private Long qaMrSubmitId;

	@Column(name = "QA_MR_SIGN")
	private String qaMrSign;
	
	@Column(name = "VERSION")
	private int version;
	
	@OneToMany(targetEntity = AuditReportClauseInfoHistory.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<AuditReportClauseInfoHistory> getClauseInfoListHistory;
}
