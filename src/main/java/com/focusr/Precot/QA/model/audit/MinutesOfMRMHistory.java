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

import com.focusr.Precot.QA.model.AgendaForManagementAttendees;
import com.focusr.Precot.QA.model.AgendaForManagementReviewMeeting;
import com.focusr.Precot.QA.model.AgendaTopicsLines;
import com.focusr.Precot.QA.model.MinutesOfMRMLines;
import com.focusr.Precot.QA.repository.audit.MinutesOfMRMLinesHistory;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_MINUTES_OF_MRM_HISTORY", schema = AppConstants.schema)
public class MinutesOfMRMHistory extends UserDateAudit{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HISTORY_ID")
	private Long historyId;

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

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "PERIOD_OF_REVIEW")
	private String period_of_review;

	@Column(name = "MRM_NO")
	private String mrm_no;

	@Column(name = "SUBJECT")
	private String subject;
	
	@Column(name = "PARTICIPANTS")
	private String participants;

	@Column(name = "REMARK")
	private String remark;
	
	@Column(name = "VERSION")
	private int version;
	

	// Status
	// QA INSPECTOR
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

	
	@OneToMany(targetEntity = MinutesOfMRMLinesHistory.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<MinutesOfMRMLinesHistory> minutesofmrmlineshistory;

}
