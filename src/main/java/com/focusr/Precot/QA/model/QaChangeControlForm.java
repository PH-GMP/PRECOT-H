package com.focusr.Precot.QA.model;

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
@Table(name = "QA_CHANGE_CONTROL_FORM", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "CHANGE_CONTROL_TO" }) })
public class QaChangeControlForm extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FORM_ID")
	private Long formId;
	
	@Column(name = "TAB_NAME")
	private String tabName;
	
	@Column(name = "ACTION")
	private String action;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String sopNumber;

	@Column(name = "UNIT")
	private String unit;

	// TAB 1

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "DATE")
	private String date;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "TYPE_OF_CHANGE_CONTROL")
	private String typeOfChangeControl;

	@Column(name = "CHANGE_CONTROL_TO")
	private String changeControlTo;

	@Column(name = "EXISTING_PROCEDURE", length = 1000)
	private String existingProcedure;

	@Column(name = "PROPOSED_CHANGE", length = 1000)
	private String proposedChange;

	@Column(name = "REASON_FOR_CHANGE", length = 1000)
	private String reasonForChange;

	@Column(name = "ATTACHMENTS")
	private String attachments;
	
	@Column(name = "STATUS_TAB_1")
	private String statusTab1;

	@Column(name = "HOD_SAVE_ON_TAB_1")
	private Date hodSaveOnTab1;

	@Column(name = "HOD_SAVE_BY_TAB_1")
	private String hodSaveByTab1;

	@Column(name = "HOD_SAVE_ID_TAB_1")
	private Long hodSaveIdTab1;

	@Column(name = "HOD_SUBMIT_ON_TAB_1")
	private Date hodSubmitOnTab1;

	@Column(name = "HOD_SUBMIT_BY_TAB_1")
	private String hodSubmitByTab1;

	@Column(name = "HOD_SUBMIT_ID_TAB_1")
	private Long hodSubmitIdTab1;

	@Column(name = "HOD_SIGN_TAB_1")
	private String hodSignTab1;

	// TAB 2

	@Column(name = "CHANGE_CONTROL_NUMBER")
	private String changeControlNumber;
	
	@Column(name = "TARGET_DATE")
	private String targetDate;
	
	@Column(name = "STATUS_TAB_2")
	private String statusTab2;

	@Column(name = "QA_MANAGER_SAVE_ON_TAB_2")
	private Date qaManagerSaveOnTab2;

	@Column(name = "QA_MANAGER_SAVE_BY_TAB_2")
	private String qaManagerSaveByTab2;

	@Column(name = "QA_MANAGER_SAVE_ID_TAB_2")
	private Long qaManagerSaveIdTab2;

	@Column(name = "QA_MANAGER_SUBMIT_ON_TAB_2")
	private Date qaManagerSubmitOnTab2;

	@Column(name = "QA_MANAGER_SUBMIT_BY_TAB_2")
	private String qaManagerSubmitByTab2;

	@Column(name = "QA_MANAGER_SUBMIT_ID_TAB_2")
	private Long qaManagerSubmitIdTab2;

	@Column(name = "QA_MANAGER_SIGN_TAB_2")
	private String qaManagerSignTab2;

	// TAB 3

	@Column(name = "CATEGORY_OF_CHANGE")
	private String categoryOfChange;

	@Column(name = "RISK_ASSESSMENT")
	private String riskAssessment;

	@Column(name = "PRODUCT")
	private String product;

	@Column(name = "FACILITY")
	private String facility;

	@Column(name = "EQUIPMENT")
	private String equipment;

	@Column(name = "TRAINING_REQUIREMENTS")
	private String trainingRequirements;

	@Column(name = "TRAINING_REQUIREMENTS_TEXT")
	private String trainingRequirementsText;

	@Column(name = "APPROVAL_BY_CONTRACT_GIVER")
	private String approvalByContractGiver;

	@Column(name = "APPROVAL_BY_CONTRACT_GIVER_TEXT")
	private String approvalByContractGiverText;

	@Column(name = "COMMENTS_TAB_3", length = 1000)
	private String commentsTab3;

	@Column(name = "STATUS_TAB_3")
	private String statusTab3;

	@Column(name = "QA_MANAGER_SAVE_ON_TAB_3")
	private Date qaManagerSaveOnTab3;

	@Column(name = "QA_MANAGER_SAVE_BY_TAB_3")
	private String qaManagerSaveByTab3;

	@Column(name = "QA_MANAGER_SAVE_ID_TAB_3")
	private Long qaManagerSaveIdTab3;

	@Column(name = "QA_MANAGER_SUBMIT_ON_TAB_3")
	private Date qaManagerSubmitOnTab3;

	@Column(name = "QA_MANAGER_SUBMIT_BY_TAB_3")
	private String qaManagerSubmitByTab3;

	@Column(name = "QA_MANAGER_SUBMIT_ID_TAB_3")
	private Long qaManagerSubmitIdTab3;

	@Column(name = "QA_MANAGER_SIGN_TAB_3")
	private String qaManagerSignTab3;

	// TAB 4
	
	@Column(name = "STATUS_TAB_4")
	private String statusTab4;

	@Column(name = "QC_COMMENTS")
	private String qcComments;

	@Column(name = "QC_SIGN")
	private String qcSign;

	@Column(name = "DEVELOPMENT_COMMENTS")
	private String developmentComments;

	@Column(name = "DEVELOPMENT_SIGN")
	private String developmentSign;

	@Column(name = "BLEACHING_COMMENTS")
	private String bleachingComments;

	@Column(name = "BLEACHING_SIGN")
	private String bleachingSign;

	@Column(name = "SPUNLACE_COMMENTS")
	private String SpunlaceComments;

	@Column(name = "SPUNLACE_SIGN")
	private String SpunlaceSign;

	@Column(name = "COTTON_BUDS_COMMENTS")
	private String cottonBudsComments;

	@Column(name = "COTTON_BUDS_SIGN")
	private String cottonBudsSign;

	@Column(name = "PAD_PUNCHING_COMMENTS")
	private String padPunchingComments;

	@Column(name = "PAD_PUNCHING_SIGN")
	private String padPunchingSign;

	@Column(name = "QA_COMMENTS")
	private String qaComments;

	@Column(name = "QA_SIGN")
	private String qaSign;

	@Column(name = "PPC_COMMENTS")
	private String ppcComments;

	@Column(name = "PPC_SIGN")
	private String ppcSign;

	@Column(name = "ENGINEERING_COMMENTS")
	private String engineeringComments;

	@Column(name = "ENGINEERING_SIGN")
	private String engineeringSign;

	@Column(name = "WAREHOUSE_COMMENTS")
	private String wareHouseComments;

	@Column(name = "WAREHOUSE_SIGN")
	private String wareHouseSign;

	@Column(name = "OTHERS_COMMENTS")
	private String othersComments;

	@Column(name = "OTHERS_SIGN")
	private String othersSign;

	// TAB 5

	@Column(name = "ACTION_ITEM")
	private String actionItem;

	// MANY

	@Column(name = "ADDITIONAL_COMMENTS", length = 1000)
	private String additionalComments;

	@Column(name = "STATUS_TAB_5")
	private String statusTab5;

	@Column(name = "QA_MANAGER_SAVE_ON_TAB_5")
	private Date qaManagerSaveOnTab5;

	@Column(name = "QA_MANAGER_SAVE_BY_TAB_5")
	private String qaManagerSaveByTab5;

	@Column(name = "QA_MANAGER_SAVE_ID_TAB_5")
	private Long qaManagerSaveIdTab5;

	@Column(name = "QA_MANAGER_SUBMIT_ON_TAB_5")
	private Date qaManagerSubmitOnTab5;

	@Column(name = "QA_MANAGER_SUBMIT_BY_TAB_5")
	private String qaManagerSubmitByTab5;

	@Column(name = "QA_MANAGER_SUBMIT_ID_TAB_5")
	private Long qaManagerSubmitIdTab5;

	@Column(name = "QA_MANAGER_SIGN_TAB_5")
	private String qaManagerSignTab5;

	// TAB 6

	@Column(name = "COMMENTS_TAB_6", length = 1000)
	private String commentsTab6;

	@Column(name = "STATUS_TAB_6")
	private String statusTab6;

	@Column(name = "QA_MANAGER_SAVE_ON_TAB_6")
	private Date qaManagerSaveOnTab6;

	@Column(name = "QA_MANAGER_SAVE_BY_TAB_6")
	private String qaManagerSaveByTab6;

	@Column(name = "QA_MANAGER_SAVE_ID_TAB_6")
	private Long qaManagerSaveIdTab6;

	@Column(name = "QA_MANAGER_SUBMIT_ON_TAB_6")
	private Date qaManagerSubmitOnTab6;

	@Column(name = "QA_MANAGER_SUBMIT_BY_TAB_6")
	private String qaManagerSubmitByTab6;

	@Column(name = "QA_MANAGER_SUBMIT_ID_TAB_6")
	private Long qaManagerSubmitIdTab6;

	@Column(name = "QA_MANAGER_SIGN_TAB_6")
	private String qaManagerSignTab6;

	// TAB 7

	@Column(name = "COMMENTS_TAB_7", length = 1000)
	private String commentsTab7;

	@Column(name = "STATUS_TAB_7")
	private String statusTab7;

	@Column(name = "QA_MANAGER_SAVE_ON_TAB_7")
	private Date qaManagerSaveOnTab7;

	@Column(name = "QA_MANAGER_SAVE_BY_TAB_7")
	private String qaManagerSaveByTab7;

	@Column(name = "QA_MANAGER_SAVE_ID_TAB_7")
	private Long qaManagerSaveIdTab7;

	@Column(name = "QA_MANAGER_SUBMIT_ON_TAB_7")
	private Date qaManagerSubmitOnTab7;

	@Column(name = "QA_MANAGER_SUBMIT_BY_TAB_7")
	private String qaManagerSubmitByTab7;

	@Column(name = "QA_MANAGER_SUBMIT_ID_TAB_7")
	private Long qaManagerSubmitIdTab7;

	@Column(name = "QA_MANAGER_SIGN_TAB_7")
	private String qaManagerSignTab7;

	// TAB 8

	@Column(name = "DATE_OF_REQUEST")
	private String dateOfRequest;

	@Column(name = "JUSTIFICATION_FOR_DATE_EXTENSION", length = 1000)
	private String justificationForDateExtension;

	@Column(name = "STATUS_TAB_8")
	private String statusTab8;
	
	@Column(name = "HOD_STATUS_TAB_8")
	private String hodStatusTab8;

	@Column(name = "HOD_SAVE_ON_TAB_8")
	private Date hodSaveOnTab8;

	@Column(name = "HOD_SAVE_BY_TAB_8")
	private String hodSaveByTab8;

	@Column(name = "HOD_SAVE_ID_TAB_8")
	private Long hodSaveIdTab8;

	@Column(name = "HOD_SUBMIT_ON_TAB_8")
	private Date hodSubmitOnTab8;

	@Column(name = "HOD_SUBMIT_BY_TAB_8")
	private String hodSubmitByTab8;

	@Column(name = "HOD_SUBMIT_ID_TAB_8")
	private Long hodSubmitIdTab8;

	@Column(name = "HOD_SIGN_TAB_8")
	private String hodSignTab8;
	
	@Column(name = "QA_MANAGER_STATUS_TAB_8")
	private String qaManagerStatusTab8;
	
	@Column(name = "QA_MANAGER_SUBMIT_ON_TAB_8")
	private Date qaManagerSubmitOnTab8;

	@Column(name = "QA_MANAGER_SUBMIT_BY_TAB_8")
	private String qaManagerSubmitByTab8;

	@Column(name = "QA_MANAGER_SUBMIT_ID_TAB_8")
	private Long qaManagerSubmitIdTab8;

	@Column(name = "QA_MANAGER_SIGN_TAB_8")
	private String qaManagerSignTab8;

	// TAB 9

	@Column(name = "IMPLEMENTATION_CHANGES", length = 1000)
	private String implementationChanges;

	@Column(name = "STATUS_TAB_9")
	private String statusTab9;

	@Column(name = "HOD_SAVE_ON_TAB_9")
	private Date hodSaveOnTab9;

	@Column(name = "HOD_SAVE_BY_TAB_9")
	private String hodSaveByTab9;

	@Column(name = "HOD_SAVE_ID_TAB_9")
	private Long hodSaveIdTab9;

	@Column(name = "HOD_SUBMIT_ON_TAB_9")
	private Date hodSubmitOnTab9;

	@Column(name = "HOD_SUBMIT_BY_TAB_9")
	private String hodSubmitByTab9;

	@Column(name = "HOD_SUBMIT_ID_TAB_9")
	private Long hodSubmitIdTab9;

	@Column(name = "HOD_SIGN_TAB_9")
	private String hodSignTab9;

	// TAB 10

	@Column(name = "SUPPORTING_DOCUMENTS", length = 1000)
	private String suppportingDocuments;

	@Column(name = "STATUS_TAB_10")
	private String statusTab10;

	@Column(name = "HOD_SAVE_ON_TAB_10")
	private Date hodSaveOnTab10;

	@Column(name = "HOD_SAVE_BY_TAB_10")
	private String hodSaveByTab10;

	@Column(name = "HOD_SAVE_ID_TAB_10")
	private Long hodSaveIdTab10;

	@Column(name = "HOD_SUBMIT_ON_TAB_10")
	private Date hodSubmitOnTab10;

	@Column(name = "HOD_SUBMIT_BY_TAB_10")
	private String hodSubmitByTab10;

	@Column(name = "HOD_SUBMIT_ID_TAB_10")
	private Long hodSubmitIdTab10;

	@Column(name = "HOD_SIGN_TAB_10")
	private String hodSignTab10;
	
	// TAB 11

	@Column(name = "IMPLEMENTATION_VERIFICATION", length = 1000)
	private String implementationVerification;

	@Column(name = "STATUS_TAB_11")
	private String statusTab11;

	@Column(name = "HOD_SAVE_ON_TAB_11")
	private Date hodSaveOnTab11;

	@Column(name = "HOD_SAVE_BY_TAB_11")
	private String hodSaveByTab11;

	@Column(name = "HOD_SAVE_ID_TAB_11")
	private Long hodSaveIdTab11;

	@Column(name = "HOD_SUBMIT_ON_TAB_11")
	private Date hodSubmitOnTab11;

	@Column(name = "HOD_SUBMIT_BY_TAB_11")
	private String hodSubmitByTab11;

	@Column(name = "HOD_SUBMIT_ID_TAB_11")
	private Long hodSubmitIdTab11;

	@Column(name = "HOD_SIGN_TAB_11")
	private String hodSignTab11;

	// TAB 12

	@Column(name = "CLOSURE_OF_CHANGE_CONTROL", length = 1000)
	private String closureOfChangeControl;

	@Column(name = "STATUS_TAB_12")
	private String statusTab12;

	@Column(name = "QA_MANAGER_SAVE_ON_TAB_12")
	private Date qaManagerSaveOnTab12;

	@Column(name = "QA_MANAGER_SAVE_BY_TAB_12")
	private String qaManagerSaveByTab12;

	@Column(name = "QA_MANAGER_SAVE_ID_TAB_12")
	private Long qaManagerSaveIdTab12;

	@Column(name = "QA_MANAGER_SUBMIT_ON_TAB_12")
	private Date qaManagerSubmitOnTab12;

	@Column(name = "QA_MANAGER_SUBMIT_BY_TAB_12")
	private String qaManagerSubmitByTab12;

	@Column(name = "QA_MANAGER_SUBMIT_ID_TAB_12")
	private Long qaManagerSubmitIdTab12;

	@Column(name = "QA_MANAGER_SIGN_TAB_12")
	private String qaManagerSignTab12;
	
	// REJECT REASON
	
//	@Column(name = "REASON")
//	private String reason;
	
	// TAB 5 many class
	@OneToMany(targetEntity = QaChangeControlAssessmentAndCreation.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "FORM_ID", referencedColumnName = "FORM_ID")
	private List<QaChangeControlAssessmentAndCreation> details;

}
