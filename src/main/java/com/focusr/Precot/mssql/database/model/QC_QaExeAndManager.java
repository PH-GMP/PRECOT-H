package com.focusr.Precot.mssql.database.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.focusr.Precot.model.audit.UserDateAudit;

import lombok.Data;

@Data
@MappedSuperclass
@JsonIgnoreProperties(value = { "fibre_actual", "fibre_remarks", "surface_actual", "surface_remarks", "sinking_actual",
		"sinking_remarks", "absorption_actual", "absorption_remarks", "whiteness_actual", "whiteness_remarks",
		"ph_actual", "ph_remarks", "loss_actual", "loss_remarks", "fluorescence_actual", "fluorescence_remarks",
		"water_actual", "water_remarks", "ether_actual", "ether_remarks", "sulphated_actual", "sulphated_remarks",
		"total_viable_standard", "total_viable_actual", "total_viable_remarks", "total_fungal_standard",
		"total_vfungal_actual", "total_fungal_remarks", "pathogen_standard", "pathogen_actual", "pathogen_remarks",
		"odor_actual", "odor_remarks",
		// CHEMIST
		"chemist_status", "chemist_saved_on", "chemist_saved_by", "chemist_saved_id", "chemist_submit_on",
		"chemist_submit_by", "chemist_submit_id", "chemist_sign",
		// QA EXECUTIVE
		"qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by", "qa_exe_submit_id", "qa_exe_sign",
		// QC
		"manager_status", "manager_submit_on", "manager_submit_by", "manager_submit_id",
		"manager_sign" }, allowGetters = true, allowSetters = true)

public class QC_QaExeAndManager extends UserDateAudit {

	@Column(name = "FIBRE_ACTUAL")
	private String fibre_actual;

	@Column(name = "FIBRE_REMARKS")
	private String fibre_remarks;

	@Column(name = "SURFACE_ACTUAL")
	private String surface_actual;

	@Column(name = "SURFACE_REMARKS")
	private String surface_remarks;

	@Column(name = "SINKING_ACTUAL")
	private String sinking_actual;

	@Column(name = "SINKING_REMARKS")
	private String sinking_remarks;

	@Column(name = "ABSORPTION_ACTUAL")
	private String absorption_actual;

	@Column(name = "ABSORPTION_REMARKS")
	private String absorption_remarks;

	@Column(name = "WHITENESS_ACTUAL")
	private String whiteness_actual;

	@Column(name = "WHITENESS_REMARKS")
	private String whiteness_remarks;

	@Column(name = "PH_ACTUAL")
	private String ph_actual;

	@Column(name = "PH_REMARKS")
	private String ph_remarks;

	@Column(name = "LOSS_ACTUAL")
	private String loss_actual;

	@Column(name = "LOSS_REMARKS")
	private String loss_remarks;

	@Column(name = "FLUORESCENCE_ACTUAL")
	private String fluorescence_actual;

	@Column(name = "FLUORESCENCE_REMARKS")
	private String fluorescence_remarks;

	@Column(name = "WATER_ACTUAL")
	private String water_actual;

	@Column(name = "WATER_REMARKS")
	private String water_remarks;

	@Column(name = "ETHER_ACTUAL")
	private String ether_actual;

	@Column(name = "ETHER_REMARKS")
	private String ether_remarks;

	@Column(name = "SULPHATED_ACTUAL")
	private String sulphated_actual;

	@Column(name = "SULPHATED_REMARKS")
	private String sulphated_remarks;

	@Column(name = "TOTAL_VIABLE_STANDARD")
	private String total_viable_standard;

	@Column(name = "TOTAL_VIABLE_ACTUAL")
	private String total_viable_actual;

	@Column(name = "TOTAL_VIABLE_REMARKS")
	private String total_viable_remarks;

	@Column(name = "TOTAL_FUNGAL_STANDARD")
	private String total_fungal_standard;

	@Column(name = "TOTAL_VFUNGAL_ACTUAL")
	private String total_vfungal_actual;

	@Column(name = "TOTAL_FUNGAL_REMARKS")
	private String total_fungal_remarks;

	@Column(name = "PATHOGEN_STANDARD")
	private String pathogen_standard;

	@Column(name = "PATHOGEN_ACTUAL")
	private String pathogen_actual;

	@Column(name = "PATHOGEN_REMARKS")
	private String pathogen_remarks;

	@Column(name = "ODOR_ACTUAL")
	private String odor_actual;

	@Column(name = "ODOR_REMARKS")
	private String odor_remarks;

	// STATUS FOR ALL ROLES

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

	// QC

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

}
