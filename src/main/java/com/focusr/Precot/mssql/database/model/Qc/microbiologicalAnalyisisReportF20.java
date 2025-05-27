package com.focusr.Precot.mssql.database.model.Qc;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "MICROBIOLOGICAL_ANALYSIS_REPORT_F20", schema = AppConstants.schema)
@Data
public class microbiologicalAnalyisisReportF20 extends UserDateAudit{

	  @Id
		@Column(name = "TEST_ID")
		@GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long test_id;
	  
	    @Column(name = "ar_number")
	    private String arNumber;

	    @Column(name = "sampled_date")
	    private String sampledDate;

	    @Column(name = "tested_incubation_start_on")
	    private String testedIncubationStartOn;

	    @Column(name = "sample_description")
	    private String sampleDescription;

	    @Column(name = "test_parameters_specification")
	    private String testParametersSpecification;

	    @Column(name = "test_completion_date")
	    private String testCompletionDate;

	    @Column(name = "remark")
	    private String remark;

	    @Column(name = "tested_by_sign_date")
	    private String testedBySignDate;

	    @Column(name = "accepted_rejected")
	    private String acceptedRejected;

	    @Column(name = "approved_by_sign_date")
	    private String approvedBySignDate;

	    @Column(name = "total_viable_count_tvc")
	    private String totalViableCountTVC;

	    @Column(name = "total_fungal_count_tfc")
	    private String totalFungalCountTFC;

	    @Column(name = "gram_negative_bacteria_coliform")
	    private String gramNegativeBacteriaColiform;

	    @Column(name = "e_coli")
	    private String eColi;

	    @Column(name = "staphylococcus_aureus")
	    private String staphylococcusAureus;

	    @Column(name = "pseudomonas_aeruginosa")
	    private String pseudomonasAeruginosa;

	    @Column(name = "salmonella")
	    private String salmonella;
	    
	    private String reason;
	    
	    @Column(name = "FORMAT")
	    private String format;

	    @Column(name = "FORMAT_NO")
	    private String format_no;

	    @Column(name = "REF_SOP_NO")
	    private String ref_sop_no;

	    @Column(name = "UNIT")
	    private String unit;

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
	    
	    @Column(name = "YEAR")
	    private String year;

	    @Column(name = "MONTH")
	    private String month;

	
}
