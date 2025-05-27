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

import com.focusr.Precot.QA.model.BatchReleaseNotesHeader;
import com.focusr.Precot.QA.model.BatchReleaseNotesLines;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_BATCH_RELEASE_NOTE_HEADER_HISTORY", schema = AppConstants.schema)
public class BatchReleaseNotesHeaderHistory {
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
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "VERSION")
	private int version;
	
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

	@OneToMany(targetEntity = BatchReleaseNotesLinesHistory.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<BatchReleaseNotesLinesHistory> batchreleasenoteslineshistory;
}
