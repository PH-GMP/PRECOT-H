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

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_METAL_DETECTOR_PASS_REPORT_HISTORY", schema = AppConstants.schema)
public class MetalDetectorPassReportHistory {

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

	// FIELDS

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;

	// SUPERVISOR
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisor_status;

	@Column(name = "SUPERVISOR_SAVED_ON")
	private Date supervisor_saved_on;

	@Column(name = "SUPERVISOR_SAVED_BY")
	private String supervisor_saved_by;

	@Column(name = "SUPERVISOR_SAVED_ID")
	private Long supervisor_saved_id;

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

	// VERSION

	@Column(name = "VERSION")
	private int version;

	// VERSION SET

	@Column(name = "METAL_ID")
	private Long metal_id;

	// REASON

	@Column(name = "REASON")
	private String reason;

	@OneToMany(targetEntity = MetalDetectorPassReportLinesHistory.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HIS_METAL_ID", referencedColumnName = "HIS_METAL_ID ")
	private List<MetalDetectorPassReportLinesHistory> details;

}
