package com.focusr.Precot.QA.model.audit;

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
@Table(name = "QA_ACTION_REPORT_INFO_HISTORY", schema = AppConstants.schema)
public class ActionReportInfoHistory extends UserDateAudit{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "INFO_ID")
	private Long infoId;
	
	@Column(name = "OBSERVATION_NO")
	private String observationNo;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "PROCESS_PRODUCT_DESCRIPTION")
	private String processProductDescription;

	@Column(name = "NATURE_OF_NON_CONFIRMITY")
	private String natureOfNonConfirmity;

	@Column(name = "ROOT_CAUSE_ANALYSIS")
	private String rootCauseAnalysis;
	
	@Column(name = "CORRECTIVE_ACTION")
	private String correctiveAction;
	
	@Column(name = "RESPONSIBILITY")
	private String responsibility;
	
	@Column(name = "TARGET_DATE")
	private String targetDate;

	@Column(name = "EFFECTIVENESS_OF_ACTION_TAKEN")
	private String effectivenessOfActionTaken;
	
	@Column(name = "HISTORY_ID")
	private Long historyId;

}