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

@Table(name = "FINISHED_PRODUCT_ANALYSIS_REPORT_F006", schema = AppConstants.schema, uniqueConstraints = {@UniqueConstraint(columnNames= {"BMR_NO","SAMPLE_DATE"})})
@Entity
@Data
public class finishedproductanalysisreportF006 extends UserDateAudit{
	
	@Id
	@Column(name = "TEST_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long test_id;
	
	@Column(name = "BMR_NO")
	private String bmr_no;
	
	@Column(name = "QUANTITY")
	private String quantity;
	
	@Column(name = "PRODUCT_DESCRIPTION")
	private String product_description;
	
	@Column(name = "TESTED_ON")
	private String tested_on;
	
	@Column(name = "EDGE_PATTERN")
	private String edge_pattern;
	
	@Column(name = "AR_NO")
	private String ar_no;
	
	@Column(name = "FG_NO")
	private String fg_no;
	
	@Column(name = "SAMPLE_DATE")
	private String sample_date;
	
	@Column(name = "FORMAT")
	private String format;
	
	@Column(name = "FORMAT_NO")
	private String format_no;
	
	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;
	
	@Column(name = "REVISION_NO")
	private String revision_no;
	
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
	
	//---------------------------------------------------------------------------
	
	@Column(name = "MICRO_STATUS")
	private String micro_status;

	@Column(name = "MICRO_SAVED_ON")
	private Date microbiologist_saved_on;

	@Column(name = "MICRO_SAVED_BY")
	private String microbiologist_saved_by;

	@Column(name = "MICRO_SAVED_ID")
	private Long microbiologist_saved_id;

	@Column(name = "MICRO_SUBMIT_ON")
	private Date micro_submit_on;

	@Column(name = "MICRO_SUBMIT_BY")
	private String micro_submit_by;
	
	@Column(name = "MICRO_SUBMIT_ID")
	private Long micro_submit_id;

	@Column(name = "MICRO_SIGN")
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
	
	@Column(name = "PREPARED_BY")
	private String prepared_by;
	
	@Column(name = "QC_SIGN")
	private String qc_sign;
	
	@Column(name = "REASON")
	private String reason;
	
	

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "finishedproductanalysisreportF006")
	private List<observationsF006> obser;
	
	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "finishedproductanalysisreportF006")
	private List<MicrobilogyTestF006> micro;

}
