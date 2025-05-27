package com.focusr.Precot.QA.model.audit;

import java.time.LocalDate;
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
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_CORRECTIVE_ACTION_REPORT_HISTORY", schema = AppConstants.schema)
public class CorrectiveActionReportHistory extends UserDateAudit{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HISTORY_ID")
	private Long historyId;
	
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
	
	@Column(name = "REPORT_DATE")
	private LocalDate reportDate;
	
	//QA INSPECTOR INFO
	@Column(name = "QA_INSPECTOR_STATUS")
	private String qaInspectorStatus;
		
	@Column(name = "QA_INSPECTOR_SAVE_ON")
	private Date qaInspecqaInspectortorSaveOn;

	@Column(name = "QA_INSPECTOR_SAVE_BY")
	private String qaInspectorSaveBy;

	@Column(name = "QA_INSPECTOR_SAVE_ID")
	private Long qaInspectorSaveId;
		
	@Column(name = "QA_INSPECTOR_SUBMIT_ON")
	private Date qaInspectorSubmitOn;

	@Column(name = "QA_INSPECTOR_SUBMIT_BY")
	private String qaInspectorSubmitBy;

	@Column(name = "QA_INSPECTOR_SUBMIT_ID")
	private Long qaInspectorSubmitId;

	@Column(name = "QA_INSPECTOR_SIGN")
	private String qaInspectorSign;
	
	// QA MANAGER & MR
	@Column(name = "QA_DESIGNEE_STATUS")
	private String qaDesigneeStatus;

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
	
	@Column(name = "VERSION")
	private int version;
	
	@OneToMany(targetEntity = ActionReportInfoHistory.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<ActionReportInfoHistory> actionReportInfoHistoryList;

}
