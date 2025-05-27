package com.focusr.Precot.QA.model.audit;

import java.time.LocalDate;
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
@Table(name = "QA_DEVIATION_FORM_HISTORY", schema = AppConstants.schema)
public class DeviationFormHistory extends UserDateAudit{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DEVIATION_ID")
	private Long deviationId;
	
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
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	// Section 1 - START 
	
	@Column(name = "DATE_OF_INITIATION")
	private LocalDate dateOfInitiation;
				
	@Column(name = "INITIATING_DEPARTMENT")
	private String initiatingDepartment;
	
	@Column(name = "DEVIATION_NUMBER")
	private String deviationNumber;
	
	@Column(name = "DESCRIPTION_OF_DEVIATION")
	private String descriptionOfDeviation;
	
	@Column(name = "IMPACT_ASSESSMENT")
	private String impactAssessment;
	
	@Column(name = "IMMEDIATE_ACTION_TAKEN")
	private String immediateActionTaken;
	
	@Column(name = "QA_REVIEW_COMMENTS")
	private String qaReviewComments;
	
	@Column(name = "INVESTIGATION")
	private String investigation;
	
	@Column(name = "QA_ASSESSMENT")
	private String qaAssessment;
	
	@Column(name = "CAPA")
	private String CAPA;
	
	@Column(name = "CLOSURE_DATE_EXTENTION_REQUEST")
	private String closureDateExtentionRequest;
	
	@Column(name = "DATE_OF_REQUEST")
	private String dateOfRequest;
	
	@Column(name = "JUSTIFICATION_OF_REQUEST")
	private String justificationOfRequest;
	
	@Column(name = "ATTACHMENTS_SUPPORTING_DOCS")
	private String attachmentsSupportingDocs;
	
	@Column(name = "CLOSURE_OF_DEVIATION")
	private String closureOfDeviation;
	
	@Column(name = "FINAL_APPROVAL_OF_CLOSURE")
	private String finalApprovalOfClosure;
	
	@Column(name = "VERSION")
	private int version;
	
	//SECTION1 INFO
	@Column(name = "SEC1_SUPERVISOR_STATUS")
	private String sec1SupervisorStatus;
		
	@Column(name = "SEC1_SUPERVISOR_SAVE_ON")
	private Date sec1SupervisorSaveOn;

	@Column(name = "SEC1_SUPERVISOR_SAVE_BY")
	private String sec1SupervisorSaveBy;

	@Column(name = "SEC1_SUPERVISOR_SAVE_ID")
	private Long sec1SupervisorSaveId;
		
	@Column(name = "SEC1_SUPERVISOR_SUBMIT_ON")
	private Date sec1SupervisorSubmitOn;

	@Column(name = "SEC1_SUPERVISOR_SUBMIT_BY")
	private String sec1SupervisorSubmitBy;

	@Column(name = "SEC1_SUPERVISOR_SUBMIT_ID")
	private Long sec1SupervisorSubmitId;

	@Column(name = "SEC1_SUPERVISOR_SIGN")
	private String sec1SupervisorSign;
	
	@Column(name = "SEC1_HOD_DESIGNEE_STATUS")
	private Date sec1HodDesigneeStatus;

	@Column(name = "SEC1_HOD_DESIGNEE_SUBMIT_ON")
	private Date sec1HodDesigneeSubmitOn;

	@Column(name = "SEC1_HOD_DESIGNEE_SUBMIT_BY")
	private String sec1HodDesigneeSubmitBy;

	@Column(name = "SEC1_HOD_DESIGNEE_SUBMIT_ID")
	private Long sec1HodDesigneeSubmitId;

	@Column(name = "SEC1_HOD_DESIGNEE_SIGN")
	private String sec1HodDesigneeSign;
	
	@Column(name = "SEC1_QA_MANAGER_MR_REVIEW_STATUS")
	private String sec1QaManagerMrReviewStatus;
		
	@Column(name = "SEC1_QA_MANAGER_MR_REVIEW_SAVE_ON")
	private Date sec1QaManagerMrReviewSaveOn;

	@Column(name = "SEC1_QA_MANAGER_MR_REVIEW_SAVE_BY")
	private String sec1QaManagerMrReviewSaveBy;

	@Column(name = "SEC1_QA_MANAGER_MR_REVIEW_SAVE_ID")
	private Long sec1QaManagerMrReviewSaveId;
		
	@Column(name = "SEC1_QA_MANAGER_MR_REVIEW_SUBMIT_ON")
	private Date sec1QaManagerMrReviewSubmitOn;

	@Column(name = "SEC1_QA_MANAGER_MR_REVIEW_SUBMIT_BY")
	private String sec1QaManagerMrReviewSubmitBy;

	@Column(name = "SEC1_QA_MANAGER_MR_REVIEW_SUBMIT_ID")
	private Long sec1QaManagerMrReviewSubmitId;

	@Column(name = "SEC1_QA_MANAGER_MR_REVIEW_SIGN")
	private String sec1QaManagerMrReviewSign;
	
	@Column(name = "SEC1_QA_MANAGER_MR_INVG_STATUS")
	private String sec1QaManagerMrInvgStatus;
		
	@Column(name = "SEC1_QA_MANAGER_MR_INVGSAVE_ON")
	private Date sec1QaManagerMrInvgSaveOn;

	@Column(name = "SEC1_QA_MANAGER_MR_INVG_SAVE_BY")
	private String sec1QaManagerMrInvgSaveBy;

	@Column(name = "SEC1_QA_MANAGER_MR_INVG_SAVE_ID")
	private Long sec1QaManagerMrInvgSaveId;
		
	@Column(name = "SEC1_QA_MANAGER_MR_INVG_SUBMIT_ON")
	private Date sec1QaManagerMrInvgSubmitOn;

	@Column(name = "SEC1_QA_MANAGER_MR_INVG_SUBMIT_BY")
	private String sec1QaManagerMrInvgSubmitBy;

	@Column(name = "SEC1_QA_MANAGER_MR_INVG_SUBMIT_ID")
	private Long sec1QaManagerMrInvgSubmitId;

	@Column(name = "SEC1_QA_MANAGER_MR_INVG_SIGN")
	private String sec1QaManagerMrInvgSign;
	
	// SECTION2 - INFO
	@Column(name = "SEC2_SUPERVISOR_STATUS")
	private String sec2SupervisorStatus;
		
	@Column(name = "SEC2_SUPERVISOR_SAVE_ON")
	private Date sec3SupervisorSaveOn;

	@Column(name = "SEC2_SUPERVISOR_SAVE_BY")
	private String sec2SupervisorSaveBy;

	@Column(name = "SEC2_SUPERVISOR_SAVE_ID")
	private Long sec2SupervisorSaveId;
		
	@Column(name = "SEC2_SUPERVISOR_SUBMIT_ON")
	private Date sec2SupervisorSubmitOn;

	@Column(name = "SEC2_SUPERVISOR_SUBMIT_BY")
	private String sec2SupervisorSubmitBy;

	@Column(name = "SEC2_SUPERVISOR_SUBMIT_ID")
	private Long sec2DeptSupervisorSubmitId;

	@Column(name = "SEC2_SUPERVISOR_SIGN")
	private String sec2DeptSupervisorSign;
	
	@Column(name = "SEC2_HOD_DESIGNEE_STATUS")
	private Date sec2HodDesigneeStatus;

	@Column(name = "SEC2_HOD_DESIGNEE_SUBMIT_ON")
	private Date sec2HodDesigneeSubmitOn;

	@Column(name = "SEC2_HOD_DESIGNEE_SUBMIT_BY")
	private String sec2HodDesigneeSubmitBy;

	@Column(name = "SEC2_HOD_DESIGNEE_SUBMIT_ID")
	private Long sec2HodDesigneeSubmitId;

	@Column(name = "SEC2_HOD_DESIGNEE_SIGN")
	private String sec2HodDesigneeSign;
	
	@Column(name = "SEC2_QA_MANAGER_MR_STATUS")
	private String sec2QaManagerMrStatus;
		
	@Column(name = "SEC2_QA_MANAGER_MR_SAVE_ON")
	private Date sec2QaManagerMrSaveOn;

	@Column(name = "SEC2_QA_MANAGER_MR_REVIEW_SAVE_BY")
	private String sec2QaManagerMrSaveBy;

	@Column(name = "SEC2_QA_MANAGER_MR_SAVE_ID")
	private Long sec2QaManagerMrSaveId;
		
	@Column(name = "SEC2_QA_MANAGER_MR_REVIEW_SUBMIT_ON")
	private Date sec2QaManagerMrSubmitOn;

	@Column(name = "SEC2_QA_MANAGER_MR_SUBMIT_BY")
	private String sec2QaManagerMrSubmitBy;

	@Column(name = "SEC2_QA_MANAGER_MR_SUBMIT_ID")
	private Long sec2QaManagerMrSubmitId;

	@Column(name = "SEC2_QA_MANAGER_MR_SIGN")
	private String sec2QaManagerMrSign;
	
	// SECTION 3
	@Column(name = "SEC3_SUPERVISOR_STATUS")
	private String sec3SupervisorStatus;
		
	@Column(name = "SEC3_SUPERVISOR_SAVE_ON")
	private Date sec2SupervisorSaveOn;

	@Column(name = "SEC3_SUPERVISOR_SAVE_BY")
	private String sec3SupervisorSaveBy;

	@Column(name = "SEC3_SUPERVISOR_SAVE_ID")
	private Long sec3SupervisorSaveId;
		
	@Column(name = "SEC3_SUPERVISOR_SUBMIT_ON")
	private Date sec3SupervisorSubmitOn;

	@Column(name = "SEC3_SUPERVISOR_SUBMIT_BY")
	private String sec3SupervisorSubmitBy;

	@Column(name = "SEC3_SUPERVISOR_SUBMIT_ID")
	private Long sec3DeptSupervisorSubmitId;

	@Column(name = "SEC3_SUPERVISOR_SIGN")
	private String sec3DeptSupervisorSign;
	
	@Column(name = "SEC3_HOD_DESIGNEE_STATUS")
	private Date sec3HodDesigneeStatus;

	@Column(name = "SEC3_HOD_DESIGNEE_SUBMIT_ON")
	private Date sec3HodDesigneeSubmitOn;

	@Column(name = "SEC3_HOD_DESIGNEE_SUBMIT_BY")
	private String sec3HodDesigneeSubmitBy;

	@Column(name = "SEC3_HOD_DESIGNEE_SUBMIT_ID")
	private Long sec3HodDesigneeSubmitId;

	@Column(name = "SEC3_HOD_DESIGNEE_SIGN")
	private String sec3HodDesigneeSign;
	
	@Column(name = "SEC3_QA_MANAGER_MR_STATUS")
	private String sec3QaManagerMrStatus;
		
	@Column(name = "SEC3_QA_MANAGER_MR_SAVE_ON")
	private Date sec3QaManagerMrSaveOn;

	@Column(name = "SEC3_QA_MANAGER_MR_REVIEW_SAVE_BY")
	private String sec3QaManagerMrSaveBy;

	@Column(name = "SEC3_QA_MANAGER_MR_SAVE_ID")
	private Long sec3QaManagerMrSaveId;
		
	@Column(name = "SEC3_QA_MANAGER_MR_REVIEW_SUBMIT_ON")
	private Date sec3QaManagerMrSubmitOn;

	@Column(name = "SEC3_QA_MANAGER_MR_SUBMIT_BY")
	private String sec3QaManagerMrSubmitBy;

	@Column(name = "SEC3_QA_MANAGER_MR_SUBMIT_ID")
	private Long sec3QaManagerMrSubmitId;

	@Column(name = "SEC3_QA_MANAGER_MR_SIGN")
	private String sec3QaManagerMrSign;
}
