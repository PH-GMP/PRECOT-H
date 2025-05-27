package com.focusr.Precot.mssql.database.model.QcAudit;


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

@Table(name = "PHYSICAL_AND_CHEMCAL_TEST_HISTORY", schema = AppConstants.schema)
@Entity
@Data
public class PHYSICALANDCHEMICALTESTHistory extends UserDateAudit{


	@Id
	@Column(name = "TEST_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long test_id;

	@Column(name = "AR_NO")
	private String ar_no;
	
	@Column(name = "FORMAT")
	private String format;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "FORMAT_NO")
	private String format_no;
	
	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;
	
	@Column(name = "REVISION_NO")
	private String revision_no;

	@Column(name = "SAMPLING_DATE")
	private String samplingDate;

	@Column(name = "TESTED_DATE")
	private String tested_Date;

	@Column(name = "SUB_BATCH_NO")
	private String sub_batch_no;

	@Column(name = "INTERNAL_EXPORT")
	private String internal_export;

	@Column(name = "FINISHING")
	private String finishing;

	@Column(name = "MIXING")
	private String mixing;

	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "BMR_NO")
	private String bmr_no;
	
	@Column(name = "RESULT")
	private String result;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "QC_SIGN")
	private String qc_sign;
	

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
			

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "physicalandchemicaltest")
	private List<QAqcObservationsHistory> qAqcObservations;
	
	@Column(name = "VERSION")
	private int version;

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "physicalandchemicaltest")
	private List<microbiologicalTestHistoryF002> microbiologicalTest;
	

	public PHYSICALANDCHEMICALTESTHistory() {
		
	}
	
}
