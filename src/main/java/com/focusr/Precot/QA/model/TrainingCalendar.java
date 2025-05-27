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
@Table(name = "QA_TRAINING_CALENDAR", schema = AppConstants.schema,
uniqueConstraints=@UniqueConstraint(columnNames= {"YEAR"}))
public class TrainingCalendar extends UserDateAudit{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CALENDAR_ID")
	private Long calendarId;
	
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
	
	@Column(name = "UPDATED_DATE")
	private  Date updatedDate;
	
	//QA DESIGNEE INFO
	@Column(name = "QA_DESIGNEE_STATUS")
	private String qaDesigneeStatus;
		
	@Column(name = "QA_DESIGNEE_SAVE_ON")
	private Date qaDesigneeSaveOn;

	@Column(name = "QA_DESIGNEE_SAVE_BY")
	private String qaDesigneeSaveBy;

	@Column(name = "QA_DESIGNEE_SAVE_ID")
	private Long qaDesigneeSaveId;
		
	@Column(name = "QA_DESIGNEE_SUBMIT_ON")
	private Date qaDesigneeSubmitOn;

	@Column(name = "QA_DESIGNEE_SUBMIT_BY")
	private String qaDesigneeSubmitBy;

	@Column(name = "QA_DESIGNEE_SUBMIT_ID")
	private Long qaDesigneeSubmitId;

	@Column(name = "QA_DESIGNEE_SIGN")
	private String qaDesigneeSign;

	// QA MANAGER & MR
	@Column(name = "QA_MANAGER_MR_STATUS")
	private String qaManagerMrStatus;

	@Column(name = "QA_MANAGER_MR_SUBMIT_ON")
	private Date qaManagerMrSubmitOn;

	@Column(name = "QA_MANAGER_MR_SUBMIT_BY")
	private String qaManagerMrSubmitBy;

	@Column(name = "QA_MANAGER_MR_SUBMIT_ID")
	private Long qaManagerMrSubmitId;

	@Column(name = "QA_MANAGER_MR_SIGN")
	private String qaManagerMrSign;
	
	@Column(name = "REASON")
	private String reason;
		
	@OneToMany(targetEntity = TrainingSession.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "CALENDAR_ID", referencedColumnName = "CALENDAR_ID")
	private List<TrainingSession> trainingSessionList;
}
