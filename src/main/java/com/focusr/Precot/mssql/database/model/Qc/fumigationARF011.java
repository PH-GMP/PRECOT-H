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

@Table(name = "FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "FUMIGATION_DATE" }) })
@Entity
@Data
public class fumigationARF011 extends UserDateAudit {

	@Id
	@Column(name = "TEST_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long test_id;
	
	@Column(name = "FORMAT")
	private String format;
	
	@Column(name = "FORMAT_NO")
	private String format_no;
	
	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "BMR_NO")
	private String bmr_no;
	
	@Column(name = "REVISION_NO")
	private String revision_no;
	
	@Column(name = "FUMIGATION_NAME")
	private String fumigation_name;
	
	@Column(name = "chemist_STATUS")
	private String chemist_status;

	@Column(name = "chemist_SAVED_ON")
	private Date chemist_saved_on;

	@Column(name = "chemist_SAVED_BY")
	private String chemist_saved_by;

	@Column(name = "chemist_SAVED_ID")
	private Long chemist_saved_id;

	@Column(name = "chemist_SUBMIT_ON")
	private Date chemist_submit_on;

	@Column(name = "chemist_SUBMIT_BY")
	private String chemist_submit_by;

	@Column(name = "chemist_SUBMIT_ID")
	private Long chemist_submit_id;

	@Column(name = "chemist_SIGN")
	private String chemist_sign;
	
	//---------------------------------------------------------------------------
	
	@Column(name = "micro_STATUS")
	private String micro_status;

	@Column(name = "MICROBIOLOGIST_SAVED_ON")
	private Date microbiologist_saved_on;

	@Column(name = "MICROBIOLOGIST_SAVED_BY")
	private String microbiologist_saved_by;

	@Column(name = "MICROBIOLOGIST_SAVED_ID")
	private Long microbiologist_saved_id;

	@Column(name = "micro_SUBMIT_ON")
	private Date micro_submit_on;

	@Column(name = "micro_SUBMIT_BY")
	private String micro_submit_by;
	
	@Column(name = "micro_SUBMIT_ID")
	private Long micro_submit_id;

	@Column(name = "micro_SIGN")
	private String micro_sign;

	// HOD

	@Column(name = "QC_STATUS")
	private String qc_status;

	@Column(name = "QC_SUBMIT_ON")
	private Date qc_submit_on;

	@Column(name = "QC_SUBMIT_BY")
	private String qc_submit_by;

	@Column(name = "QC_SUBMIT_ID")
	private Long qc_submit_id;
	
	@Column(name = "QC_SIGN")
	private String qc_sign;
	//
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "REPORT_DATE")
	private String report_date;
	
	@Column(name = "FUMIGATION_DATE")
	private String fumigation_date;
	
	@Column(name = "CHEMICAL_NAME")
	private String chemical_name;
	
	@Column(name = "QC_STATUS_MICRO")
	private String qc_status_micro;
	
	@Column(name = "DILUTION")
	private String dilution;
	
	@Column(name = "SOLUTION_PREPARED_BY")
	private String solution_prepared_by;
	
	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "fumigationARF011")
	private List<observationArF011> obser;

	
	
	
}
