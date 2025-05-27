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
@Table(name = "QA_INTERNAL_AUDIT_NC_REPORT", schema = AppConstants.schema,
uniqueConstraints=@UniqueConstraint(columnNames= {"AUDIT_YEAR","IAR_NO","DEPARTMENT","NCR_NO"}))
public class InternalAuditNCReport extends UserDateAudit{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "REPORT_ID")
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
	
	// Requirement NO
	@Column(name = "IAR_NO")
	private String iarNo;
		
	@Column(name = "REPORT_DATE")
	private Date reportDate;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "NCR_NO")
	private String ncrNo;
	
	@Column(name = "CLAUSE_NO")
	private String clauseNo;
	
	@Column(name = "NATURE_OF_NON_CONFORMITY")
	private String natureOfNonConformity;
	
	@Column(name = "SEVERITY")
	private String severity;
	
	@Column(name = "AGREED_COMPLETION_DATE")
	private Date agreedCompletionDate;
	
	@Column(name = "SIGNATURE_OF_AUDITOR")
	private String signatureOfAuditor;
	
	@Column(name = "SIGNATURE_OF_AUDITEE")
	private String signatureOfAuditee;
	
	@Column(name = "CORRECTIONS")
	private String corrections;
	
	@Column(name = "ROOT_CAUSE_1")
	private String rootCause1;
	
	@Column(name = "ROOT_CAUSE_2")
	private String rootCause2;
	
	@Column(name = "ROOT_CAUSE_3")
	private String rootCause3;
	
	@Column(name = "ROOT_CAUSE_4")
	private String rootCause4;
	
	@Column(name = "ROOT_CAUSE_5")
	private String rootCause5;
	
	@Column(name = "CORRECTIVE_PREVENTIVE_ACTION")
	private String correctivePreventiveAction;
	
	@Column(name = "VERIFICATION_OF_ACTION_TAKEN")
	private String verificationOfActionTaken;
	
	@Column(name = "AUDITOR_COMMENTS")
	private String auditorComments;
	
	@Column(name = "NCR_CLOSING_DATE")
	private Date ncrClosingDate;
	
	@Column(name = "NAME_OF_AUDITOR")
	private String nameOfAuditor;
		
	@Column(name = "STATUS_OF_NC")
	private String statusOfNC;
	
	@Column(name = "CORRECTIVE_ACTION_FOUND_TO_BE")
	private String correctiveActionFoundToBe;
	
	@Column(name = "NCR_IS")
	private String ncrIs;
	
	@Column(name = "NCR_CLOSED_ON_TIME")
	private String ncrClosedOnTime;
	
	@Column(name = "REASON")
	private String reason;
	
	
	//FIRST AUDITOR INFO
	@Column(name = "FIRST_AUDITOR_STATUS")
	private String firstAuditorStatus;
		
	@Column(name = "FIRST_AUDITOR_SAVE_ON")
	private Date firstAuditorSaveOn;

	@Column(name = "FIRST_AUDITOR_SAVE_BY")
	private String firstAuditorSaveBy;

	@Column(name = "FIRST_AUDITOR_SAVE_ID")
	private Long firstAuditorSaveId;
	
	@Column(name = "FIRST_AUDITOR_SUBMIT_ON")
	private Date firstAuditorSubmitOn;

	@Column(name = "FIRST_AUDITOR_SUBMIT_BY")
	private String firstAuditorSubmitBy;

	@Column(name = "FIRST_AUDITOR_SUBMIT_ID")
	private Long firstAuditorSubmitId;

	@Column(name = "FIRST_AUDITOR_SIGN")
	private String firstAuditorSign;
	
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
	
	//SECOND AUDITOR INFO
	@Column(name = "SECOND_AUDITOR_STATUS")
	private String secondAuditorStatus;
		
	@Column(name = "SECOND_AUDITOR_SAVE_ON")
	private Date secondAuditorSaveOn;

	@Column(name = "SECOND_AUDITOR_SAVE_BY")
	private String secondAuditorSaveBy;

	@Column(name = "SECOND_AUDITOR_SAVE_ID")
	private Long secondAuditorSaveId;
	
	@Column(name = "SECOND_AUDITOR_SUBMIT_ON")
	private Date secondAuditorSubmitOn;

	@Column(name = "SECOND_AUDITOR_SUBMIT_BY")
	private String secondAuditorSubmitBy;

	@Column(name = "SECOND_AUDITOR_SUBMIT_ID")
	private Long secondAuditorSubmitId;

	@Column(name = "SECOND_AUDITOR_SIGN")
	private String secondAuditorSign;
				
	// QA_MR
	
	@Column(name = "QA_MR_APPROVAL_STATUS")
	private String qaMrApprovalStatus;
	
	@Column(name = "QA_MR_STATUS")
	private String qaMrStatus;
	
	@Column(name = "QA_MR_SUBMIT_STATUS")
	private String qaMrSubmitStatus;
	
	@Column(name = "QA_MR_SAVE_ON")
	private Date qaMrSaveOn;

	@Column(name = "QA_MR_SAVE_BY")
	private String qaMrSaveBy;

	@Column(name = "QA_MR_SAVE_ID")
	private Long qaMrSaveId;

	@Column(name = "QA_MR_SUBMIT_ON")
	private Date qaMrSubmitOn;

	@Column(name = "QA_MR_SUBMIT_BY")
	private String qaMrSubmitBy;

	@Column(name = "QA_MR_SUBMIT_ID")
	private Long qaMrSubmitId;

	@Column(name = "QA_MR_SIGN")
	private String qaMrSign;
}
