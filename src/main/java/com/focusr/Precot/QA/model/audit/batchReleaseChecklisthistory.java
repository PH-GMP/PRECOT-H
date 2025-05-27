package com.focusr.Precot.QA.model.audit;



import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.DateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BATCH_RELEASE_CHECKLIST_HISTORY", schema = AppConstants.schema)
public class batchReleaseChecklisthistory extends DateAudit {

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
		
		 @Column(name = "BMR_NO")
		    private String bmrNo;

		    @Column(name = "PROD_NAME")
		    private String prodName;
		    
		    @Column(name = "DEPARTMENT")
		    private String department;
		    
		    @Column(name = "DATE")
		    private String date;
		    
		    @Column(name = "MONTH")
		    private String month;
		    
		    @Column(name = "YEAR")
		    private String year;

		    @Column(name = "PROD_CODE")
		    private String prodCode;

		    @Column(name = "BATCH_NO")
		    private String batchNo;

		    @Column(name = "MFG_DATE")
		    private String mfgDate;

		    @Column(name = "EXP_DATE")
		    private String expDate;

		    @Column(name = "BATCH_START")
		    private String batchStart;

		    @Column(name = "BATCH_END")
		    private String batchEnd;

		    @Column(name = "SPECIAL_TREATMENT")
		    private String specialTreatment;

		    @Column(name = "SAMPLED_PER_SOP")
		    private String sampledPerSop;

		    @Column(name = "TESTED_EP")
		    private String testedEp;

		    @Column(name = "DESC_PHYS_PARAMS")
		    private String descPhysParams;

		    @Column(name = "ANALYSIS_DONE")
		    private String analysisDone;

		    @Column(name = "CALC_CHECKED")
		    private String calcChecked;

		    @Column(name = "RETAIN_SAMPLES")
		    private String retainSamples;

		    @Column(name = "DONE_BY_QC")
		    private String doneByQc;

		    @Column(name = "BMR_TO_QA")
		    private String bmrToQa;

		    @Column(name = "LINE_CLEARANCE_QA")
		    private String lineClearanceQa;

		    @Column(name = "PACKED_PER_PDS")
		    private String packedPerPds;

		    @Column(name = "STD_PACK_LABEL")
		    private String stdPackLabel;

		    @Column(name = "SPEC_PACK_LABEL")
		    private String specPackLabel;

		    @Column(name = "PROCESS_DEVIATION")
		    private String processDeviation;

		    @Column(name = "CALC_VERIFIED")
		    private String calcVerified;
		    
		    @Column(name = "BATCHRESULT")
		    private String batchresult;

		    @Column(name = "CHECKED_BY")
		    private String checkedBy;

		    @Column(name = "APPROVED_BY")
		    private String approvedBy;
		    
			@Column(name = "INS_SAVED_ON")
			private Date ins_saved_on;

			@Column(name = "INS_SAVED_BY")
			private String ins_saved_by;

			@Column(name = "INS_SAVED_ID")
			private Long ins_saved_id;
			
			@Column(name = "INS_STATUS")
			private String ins_status;
			
			
			@Column(name = "INS_SIGN")
			private String ins_sign;

			@Column(name = "INS_SUBMIT_ON")
			private Date ins_submit_on;

			@Column(name = "INS_SUBMIT_BY")
			private String ins_submit_by;

			@Column(name = "INS_SUBMIT_ID")
			private Long ins_submit_id;
		    
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
			
//			@Column(name = "QA_STATUS")
//			private String qa_status;
//
//			@Column(name = "QA_SUBMIT_ON")
//			private Date qa_submit_on;
//
//			@Column(name = "QA_SUBMIT_BY")
//			private String qa_submit_by;
//
//			@Column(name = "QA_SUBMIT_ID")
//			private Long qa_submit_id;
//
//			@Column(name = "QA_SIGN")
//			private String qa_sign;

			
			@Column(name = "QC_STATUS_B")
			private String qc_status_b;

			@Column(name = "QC_SUBMIT_ON_B")
			private Date qc_submit_on_b;

			@Column(name = "QC_SUBMIT_BY_B")
			private String qc_submit_by_n;

			@Column(name = "QC_SUBMIT_ID_B")
			private Long qc_submit_id_b;
			
			@Column(name = "QC_SAVED_ON")
			private Date qc_saved_on;

			@Column(name = "QC_SAVED_BY")
			private String qc_saved_by;

			@Column(name = "QC_SAVED_ID")
			private Long qc_saved_id;
			
			@Column(name = "QC_SIGN_B")
			private String qc_sign_b;

	     @Column(name = "VERSION")
	    private int version;
	     
	 	@Column(name = "REASON")
		private String reason;
}
