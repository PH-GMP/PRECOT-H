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

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_TRAINING_NEED_IDENTIFICATION_FORM_HISTORY_F005", schema = AppConstants.schema)
public class QaTrainingNeedIdentificationFormHistory extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HISTORY_ID")
	private Long historyId;

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

	@Column(name = "DATE")
	private String date;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "DEPARTMENT")
	private String department;

	// status
	@Column(name = "HOD_STATUS")
	private String hodStatus;

	@Column(name = "HOD_SUBMIT_ON")
	private Date hodSubmitOn;

	@Column(name = "HOD_SUBMIT_BY")
	private String hodSubmitBy;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hodSubmitId;
	
	@Column(name = "HOD_SIGN")
	private String hodSign;

	@Column(name = "QA_MANAGER_STATUS")
	private String qaManagerStatus;
	
	@Column(name = "QA_MANAGER_SUBMIT_ON")
	private Date qaManagerSubmitOn;

	@Column(name = "QA_MANAGER_SUBMIT_BY")
	private String qaManagerSubmitBy;

	@Column(name = "QA_MANAGER_SUBMIT_ID")
	private Long qaManagerSubmitId;

	@Column(name = "QA_MANAGER_SIGN")
	private String qaManagerSign;

	// reason to reject
	@Column(name = "REASON")
	private String reason;

	// version
	@Column(name = "VERSION")
	private int version;

	@OneToMany(targetEntity = QaTrainingNeedIdentificationFormLineHistory.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<QaTrainingNeedIdentificationFormLineHistory> details;
}
