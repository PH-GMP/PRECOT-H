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

@Table(name = "POTABLE_WATER_ANALYSIS_REPORT_ARF013", schema = AppConstants.schema , uniqueConstraints = {
		@UniqueConstraint(columnNames = { "SAMPLED_ON"}) })
@Entity
@Data
public class potableWaterARF013Report extends UserDateAudit{

	@Id
	@Column(name = "TEST_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long test_id;
	
	@Column(name = "SAMPLED_ON")
	private String sampled_on;
	
	@Column(name = "TESTED_ON")
	private String tested_on;
	
	@Column(name = "FORMAT")
	private String format;
	
	@Column(name = "FORMAT_NO")
	private String format_no;
	
	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "REASON")
	private String reason;
	
	
	@Column(name = "REVISION_NO")
	private String revision_no;
	
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
		
	@Column(name = "TEST_ON")
	private String test_on;
	
	@Column(name = "AR_NO")
	private String ar_no;
	
	@Column(name = "AR_NO_1")
	private String ar_no_1;

	@Column(name = "AR_NO_2")
	private String ar_no_2;

	@Column(name = "AR_NO_3")
	private String ar_no_3;

	@Column(name = "AR_NO_4")
	private String ar_no_4;

	@Column(name = "AR_NO_5")
	private String ar_no_5;

	@Column(name = "PH_LEVEL_1")
	private String ph_level_1;

	@Column(name = "PH_LEVEL_2")
	private String ph_level_2;

	@Column(name = "PH_LEVEL_3")
	private String ph_level_3;

	@Column(name = "PH_LEVEL_4")
	private String ph_level_4;

	@Column(name = "PH_LEVEL_5")
	private String ph_level_5;

	@Column(name = "HARDNESS_1")
	private String hardness_1;

	@Column(name = "HARDNESS_2")
	private String hardness_2;

	@Column(name = "HARDNESS_3")
	private String hardness_3;

	@Column(name = "HARDNESS_4")
	private String hardness_4;

	@Column(name = "HARDNESS_5")
	private String hardness_5;

	@Column(name = "TURBIDITY_1")
	private String turbidity_1;

	@Column(name = "TURBIDITY_2")
	private String turbidity_2;

	@Column(name = "TURBIDITY_3")
	private String turbidity_3;

	@Column(name = "TURBIDITY_4")
	private String turbidity_4;

	@Column(name = "TURBIDITY_5")
	private String turbidity_5;

	@Column(name = "TOTAL_DISSOLVED_1")
	private String total_dissolved_1;

	@Column(name = "TOTAL_DISSOLVED_2")
	private String total_dissolved_2;

	@Column(name = "TOTAL_DISSOLVED_3")
	private String total_dissolved_3;

	@Column(name = "TOTAL_DISSOLVED_4")
	private String total_dissolved_4;

	@Column(name = "TOTAL_DISSOLVED_5")
	private String total_dissolved_5;

	@Column(name = "INTERPRETATION_1")
	private String interpretation_1;

	@Column(name = "INTERPRETATION_2")
	private String interpretation_2;

	@Column(name = "INTERPRETATION_3")
	private String interpretation_3;

	@Column(name = "INTERPRETATION_4")
	private String interpretation_4;

	@Column(name = "INTERPRETATION_5")
	private String interpretation_5;
	
	@Column(name = "PH_LEVEL")
	private String ph_level;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;

	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "HARDNESS")
	private String hardness;

	@Column(name = "TURBIDITY")
	private String turbidity;

	@Column(name = "TOTAL_DISSOLVED")
	private String TOTAL_DISSOLVED;

	@Column(name = "INTERPRETATION")
	private String interpretation;

	@Column(name = "TEST_COMPLETION")
	private String test_completion;
	
	@Column(name = "SAMPLE_LOCATION")
	private String sample_location;
	

}
