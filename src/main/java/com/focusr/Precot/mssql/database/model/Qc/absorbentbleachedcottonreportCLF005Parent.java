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

@Entity
@Table(name = "ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT", schema = AppConstants.schema)
@Data
public class absorbentbleachedcottonreportCLF005Parent extends UserDateAudit{

	   @Id
			@Column(name = "PA_ID")
			@GeneratedValue(strategy = GenerationType.IDENTITY)
			private Long pa_id;
	   
	    @Column(name = "BMR")
	    private String bmr;
	    
	    @Column(name = "REGULAR_TRIAL_BATCH")
	    private String regularOrTrialBatch;

	    @Column(name = "BATCH_NO")
	    private String batchNo;
	   
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
		
		   @Column(name = "TESTED_DATE")
		    private String testedDate;

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
		
	    @Column(name = "REMARKS")
	    private String remarks;
		
		@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "absorbentbleachedcottonreportCLF005Parent")
		private List<absorbentbleachedcottonreportCLF005> absorb;
		
	
	
}
