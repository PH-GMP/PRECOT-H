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
@Table(name = "QA_CHANGE_CONTROL_LOG_BOOK_F042_HISTORY", schema = AppConstants.schema)
public class QaChangeControlLogBookF042History extends UserDateAudit {
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

	@Column(name = "SNO")
	private Long sNo;
	
	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "CHANGE_CONTROL_NO")
	private String changeControlNo;
	
	@Column(name = "DESCRIPTION_OF_CHANGE")
	private String descriptionOfChange;

	@Column(name = "ISSUED_TO_DEPARTMENT")
	private String issuedToDepartment;

	@Column(name = "ACTUAL_CLOSURE_DATE")
	private String actualClouserDate;

	@Column(name = "REMARK")
	private String remark;
//initiator	
	@Column(name = "HOD_OR_DESIGNEE_STATUS")
	private String hodOrDesigneeStatus;

	@Column(name = "HOD_OR_DESIGNEE_SAVED_ON")
	private Date hodOrDesigneeSavedOn;

	@Column(name = "HOD_OR_DESIGNEE_SAVED_BY")
	private String hodOrDesigneeSavedBy;

	@Column(name = "HOD_OR_DESIGNEE_SAVED_ID")
	private Long hodOrDesigneeSavedId;

	@Column(name = "HOD_OR_DESIGNEE_SUBMITTED_ON")
	private Date hodOrDesigneeSubmittedOn;

	@Column(name = "HOD_OR_DESIGNEE_SUBMITTED_BY")
	private String hodOrDesigneeSubmittedBy;

	@Column(name = "HOD_OR_DESIGNEE_SUBMITTED_ID")
	private Long hodOrDesigneeSubmittedId;

	@Column(name = "HOD_OR_DESIGNEE_SIGN")
	private String hodOrDesigneeSign;
	
	//aprover
	@Column(name = "MR_OR_QA_MANAGER_STATUS")
	private String mrOrQaManagerStatus;

	@Column(name = "MR_OR_QA_MANAGER_SAVED_ON")
	private Date mrOrQaManagerSavedOn;

	@Column(name = "MR_OR_QA_MANAGER_SAVED_BY")
	private String mrOrQaManagerSavedBy;

	@Column(name = "MR_OR_QA_MANAGER_SAVED_ID")
	private Long mrOrQaManagerSavedId;

	@Column(name = "MR_OR_QA_MANAGER_SUBMITTED_ON")
	private Date mrOrQaManagerSubmittedOn;

	@Column(name = "MR_OR_QA_MANAGER_SUBMITTED_BY")
	private String mrOrQaManagerSubmittedBy;

	@Column(name = "MR_OR_QA_MANAGER_SUBMITTED_ID")
	private Long mrOrQaManagerSubmittedId;

	@Column(name = "MR_OR_QA_MANAGER_SIGN")
	private String mrOrQaManagerSign;

	@Column(name = "VERSION")
	private int version;
	
	@Column(name = "MAIL_STATUS")
	private String mail_status;
	
	@OneToMany(targetEntity = ChangeControlLogBookDetailsHistory.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "ID", referencedColumnName = "ID")
	private List<ChangeControlLogBookDetailsHistory> details;
	

	
}
