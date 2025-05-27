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
@Table(name = "QA_TRAINING_SESSION_ALLOTMENT_REGISTER", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "DEPARTMENT" }) })
public class QaTrainingSessionAllotmentRegister extends UserDateAudit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FORM_ID")
	private Long formId;

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
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	
	// status
	@Column(name = "HOD_STATUS")
	private String hodStatus;

	@Column(name = "HOD_SAVE_ON")
	private Date hodSaveOn;

	@Column(name = "HOD_SAVE_BY")
	private String hodSaveBy;

	@Column(name = "HOD_SAVE_ID")
	private Long hodSaveId;

	@Column(name = "HOD_SUBMIT_ON")
	private Date hodSubmitOn;

	@Column(name = "HOD_SUBMIT_BY")
	private String hodSubmitBy;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hodSubmitId;

	@Column(name = "HOD_SIGN")
	private String hodSign;
	
	@OneToMany(targetEntity = QaTrainingSessionAllotmentRegisterLine.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "FORM_ID", referencedColumnName = "FORM_ID")
	private List<QaTrainingSessionAllotmentRegisterLine> details;

}
