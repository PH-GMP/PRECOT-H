package com.focusr.Precot.mssql.database.model.Qc;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "WATER_ANALYSIS_REPORT_F007", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = "DATE") })

public class WaterAnalysisReportF007 extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "WATER_ID")
	private Long water_id;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "AR_NO")
	private String ar_no;

	@Column(name = "DATE")
	private String date;

	// APPROVALS

	// CHEMIST

	@Column(name = "CHEMIST_STATUS")
	private String chemist_status;

	@Column(name = "CHEMIST_SAVED_ON")
	private Date chemist_saved_on;

	@Column(name = "CHEMIST_SAVED_BY")
	private String chemist_saved_by;

	@Column(name = "CHEMIST_SAVED_ID")
	private Long chemist_saved_id;

	@Column(name = "CHEMIST_SUBMIT_ON")
	private Date chemist_submit_on;

	@Column(name = "CHEMIST_SUBMIT_BY")
	private String chemist_submit_by;

	@Column(name = "CHEMIST_SUBMIT_ID")
	private Long chemist_submit_id;

	@Column(name = "CHEMIST_SIGN")
	private String chemist_sign;

	// MICROBIOLOGIST

	@Column(name = "MICRO_STATUS")
	private String micro_status;

	@Column(name = "MICRO_SAVED_ON")
	private Date micro_saved_on;

	@Column(name = "MICRO_SAVED_BY")
	private String micro_saved_by;

	@Column(name = "MICRO_SAVED_ID")
	private Long micro_saved_id;

	@Column(name = "MICRO_SUBMIT_ON")
	private Date micro_submit_on;

	@Column(name = "MICRO_SUBMIT_BY")
	private String micro_submit_by;

	@Column(name = "MICRO_SUBMIT_ID")
	private Long micro_submit_id;

	@Column(name = "MICRO_SIGN")
	private String micro_sign;

	// QA EXECUTIVE

	@Column(name = "QA_EXE_STATUS")
	private String qa_exe_status;

	@Column(name = "QA_EXE_SUBMIT_ON")
	private Date qa_exe_submit_on;

	@Column(name = "QA_EXE_SUBMIT_BY")
	private String qa_exe_submit_by;

	@Column(name = "QA_EXE_SUBMIT_ID")
	private Long qa_exe_submit_id;

	@Column(name = "QA_EXE_SIGN")
	private String qa_exe_sign;

	// CHEMICT MANAGER STATUS

	@Column(name = "MANAGER_STATUS")
	private String manager_status;

	@Column(name = "MANAGER_SUBMIT_ON")
	private Date manager_submit_on;

	@Column(name = "MANAGER_SUBMIT_BY")
	private String manager_submit_by;

	@Column(name = "MANAGER_SUBMIT_ID")
	private Long manager_submit_id;

	@Column(name = "MANAGER_SIGN")
	private String manager_sign;
	
	
	@Column(name = "REASON")
	private String reason;
	
	
//	@Column(name = "VERSION")
//	private int version;

	// MICRO MANAGER STATUS

//	@Column(name = "MICRO_MANAGER_STATUS")
//	private String micro_manager_status;
//
//	@Column(name = "MICRO_MANAGER_SUBMIT_ON")
//	private Date micro_manager_submit_on;
//
//	@Column(name = "MICRO_MANAGER_SUBMIT_BY")
//	private String micro_manager_submit_by;
//
//	@Column(name = "MICRO_MANAGER_SUBMIT_ID")
//	private Long micro_manager_submit_id;
//
//	@Column(name = "MICRO_MANAGER_SIGN")
//	private String micro_manager_sign;

//	// MAPPING
//
//	@OneToMany(targetEntity = WaterAnalysisReportChemistF007.class, cascade = CascadeType.ALL)
//	@JoinColumn(name = "WATER_ID", referencedColumnName = "WATER_ID")
//	private List<WaterAnalysisReportChemistF007> chemistDetails;
//
//	@OneToMany(targetEntity = WaterAnalysisReportMicroF007.class, cascade = CascadeType.ALL)
//	@JoinColumn(name = "WATER_ID", referencedColumnName = "WATER_ID")
//	private List<WaterAnalysisReportMicroF007> microDetails;

	// NEW MAPPING

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "chemist")
	private List<WaterAnalysisReportChemistF007> chemistDetails;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "micro")
	private List<WaterAnalysisReportMicroF007> microDetails;
}
