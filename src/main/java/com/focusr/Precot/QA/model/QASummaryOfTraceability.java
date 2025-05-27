package com.focusr.Precot.QA.model;

import java.util.Date;
import java.util.List;

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
@Table(name = "QA_SUMMARY_OF_TRACEBILITY", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "DEPARTMENT","BMR_NO" }) })
public class QASummaryOfTraceability extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

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
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "REASON_FOR_TRACEABILITY")
	private String reasonForTraceability;

	@Column(name = "METHODOLOGY_FOR_SELECTING")
	private String methodologyForSelecting;

	@Column(name = "NO_OF_PEOPLE_INVOLVED")
	private String noOfPeopleInvolved;

	@Column(name = "TEAM_MEMBERS")
	private String teamMembers;

	@Column(name = "TOTAL_TIME_TAKEN_TO_COMPLETE_THE_STUDY")
	private String totalTimeTakenToCompleteTheStudy;

	@Column(name = "START_TIME")
	private String start_time;

	@Column(name = "END_TIME")
	private String endTime;

	@Column(name = "BMR_NO")
	private String bmrNo;

	@Column(name = "CUSTOMER")
	private String customer;

	@Column(name = "PRODUCT")
	private String product;

	@Column(name = "BATCH_NO")
	private String batchNo;

	@Column(name = "PO_NO")
	private String poNo;

	@Column(name = "TOTAL_QUANTITY_CARTONS")
	private String totalQuantityQartons;

	@Column(name = "TOTAL_QUANTITY_BAGS")
	private String totalQuantityBags;

	@Column(name = "QUANTITY_DISPACHED_CARTONS")
	private String quantityDispachedCartons;

	@Column(name = "QUANTITY_DISPACHED_BAGS")
	private String quantityDispachedBags;

	@Column(name = "QUANTITY_AVAILABLE_IN_FG_CARTONS")
	private String quantityAvailableInFgCartons;
	
	@Column(name = "QUANTITY_AVAILABLE_IN_FG_BAGS")
	private String quantityAvailableInFgBags;

	@Column(name = "PROBLEM_FACED", length = 1000)
	private String problemFaced;

	@Column(name = "ACTION_TAKEN", length = 1000)
	private String actionTaken;

	@Column(name = "SUGGESTION", length = 1000)
	private String suggestion;

	@Column(name = "FINAL_CONCLUSION")
	private String finalConclusion;

	@Column(name = "REASON")
	private String reason;
	// STATUS

	// QA_MANAGER_OR_DESIGNEE
	@Column(name = "QA_MANAGER_OR_DESIGNEE_STATUS")
	private String qaManagerOrDesigneeStatus;

	@Column(name = "QA_MANAGER_OR_DESIGNEE_SAVE_ON")
	private Date qaManagerOrDesigneeSaveOn;

	@Column(name = "QA_MANAGER_OR_DESIGNEE_SAVE_BY")
	private String qaManagerOrDesigneeSaveBy;

	@Column(name = "QA_MANAGER_OR_DESIGNEE_SAVE_ID")
	private Long qaManagerOrDesigneeSaveId;

	@Column(name = "QA_MANAGER_OR_DESIGNEE_SUBMIT_ON")
	private Date qaManagerOrDesigneeSubmitOn;

	@Column(name = "QA_MANAGER_OR_DESIGNEE_SUBMIT_BY")
	private String qaManagerOrDesigneeSubmitBy;

	@Column(name = "QA_MANAGER_OR_DESIGNEE_SUBMIT_ID")
	private Long qaManagerOrDesigneeSubmitId;

	@Column(name = "QA_MANAGER_OR_DESIGNEE_SIGN")
	private String qaManagerOrDesigneeSign;

	// QA_MANAGER_OR_MR_STATUS
	@Column(name = "QA_MANAGER_OR_MR_STATUS")
	private String qaManagerOrMrStatus;

	@Column(name = "QA_MANAGER_OR_MR_APPROVED_ON")
	private Date qaManagerOrMrApprovedOn;

	@Column(name = "QA_MANAGER_OR_MR_APPROVED_BY")
	private String qaManagerOrMrApprovedBy;

	@Column(name = "QA_MANAGER_OR_MR_APPROVER_ID")
	private Long qaManagerOrMrApproverId;

	@Column(name = "QA_MANAGER_OR_MR_SIGN")
	private String qaManagerOrMrSign;

}
