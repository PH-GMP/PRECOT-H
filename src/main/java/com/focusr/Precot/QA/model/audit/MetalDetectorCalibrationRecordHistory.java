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

import com.focusr.Precot.QA.model.MetalDetectorCalibrationRecordLines;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.mssql.database.model.OperatorSupervisorSave;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "METAL_DETECTOR_CALIBRATION_RECORDS_HISTORY", schema = AppConstants.schema)

public class MetalDetectorCalibrationRecordHistory extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HIS_METAL_ID")
	private Long his_metal_id;

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

//	@Column(name = "LOCATION")
//	private String location;

	@Column(name = "REASON")
	private String reason;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "EQ_ID")
	private String eq_id;
	
	@Column(name = "DATE")
	private String date;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "VERSION")
	private int version;

	// VERSION SET

	@Column(name = "METAL_ID")
	private Long metal_id;

	@Column(name = "OPERATOR_STATUS")
	private String operator_status;

	@Column(name = "OPERATOR_SAVE_BY")
	private String operator_save_by;

	@Column(name = "OPERATOR_SAVE_ON")
	private Date operator_save_on;

	@Column(name = "OPERATOR_SAVE_ID")
	private Long operator_save_id;

	@Column(name = "OPERATOR_SUBMITTED_BY")
	private String operator_submitted_by;

	@Column(name = "OPERATOR_SUBMITTED_ON")
	private Date operator_submitted_on;

	@Column(name = "OPERATOR_SUBMITTED_ID")
	private Long operator_submitted_id;

	@Column(name = "OPERATOR_SIGN")
	private String operator_sign;

	// SUPERVISOR
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisor_status;

	@Column(name = "SUPERVISOR_SUBMIT_ON")
	private Date supervisor_submit_on;

	@Column(name = "SUPERVISOR_SUBMIT_BY")
	private String supervisor_submit_by;

	@Column(name = "SUPERVISOR_SUBMIT_ID")
	private Long supervisor_submit_id;

	@Column(name = "SUPERVISOR_SIGN")
	private String supervisor_sign;

	// MANAGER

	@Column(name = "QA_INSPECTOR_STATUS")
	private String qa_inspector_status;

	@Column(name = "QA_INSPECTOR_SUBMITTED_ON")
	private Date qa_inspector_submitted_on;

	@Column(name = "QA_INSPECTOR_SUBMITTED_BY")
	private String qa_inspector_submitted_by;

	@Column(name = "QA_INSPECTOR_SUBMITTED_ID")
	private Long qa_inspector_submitted_id;

	@Column(name = "QA_INSPECTOR_SIGN")
	private String qa_inspector_sign;

//	 @OneToMany(mappedBy = "metaldetectorcalibrationrecordhistory", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//	    private List<MetalDetectorCalibrationRecordLinesHistory> metaldetectorcalibrationrecordlineshistory;

	@OneToMany(targetEntity = MetalDetectorCalibrationRecordLinesHistory.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HIS_METAL_ID", referencedColumnName = "HIS_METAL_ID ")
	private List<MetalDetectorCalibrationRecordLinesHistory> details;
}
