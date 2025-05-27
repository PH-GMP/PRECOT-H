package com.focusr.Precot.QA.model.audit;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.model.audit.DateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT_CHILD_A_HISTORY", schema = AppConstants.schema)
@Data
public class productionretainedsampleregisterHistorychild1 extends DateAudit{

	 @Id
	    @Column(name = "ID")
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	   @Column(name = "SHIFT")
		private String shift;
		
		@Column(name = "DATE")
		private String date;
		
		@Column(name = "YEAR")
		private String year;
		
		@Column(name = "MONTH")
		private String month;
		
		@Column(name = "PRODUCT")
		private String product;

	    @Column(name = "FG_NO_BATCH_NO")
	    private String fgNoBatchNo;

	    @Column(name = "PRODUCT_DESCRIPTION")
	    private String productDescription;

	    @Column(name = "QUANTITY_IN_NOS")
	    private String quantityInNos;

	    @Column(name = "BOX_NO")
	    private String boxNo;

	    @Column(name = "SAMPLE_DISPOSAL_DATE")
	    private String sampleDisposalDate;

	    @Column(name = "SAMPLE_RETAINED_BY")
	    private String sampleRetainedBy;

	    @Column(name = "APPROVED_BY")
	    private String approvedBy;
	    
	    
//		@Column(name = "INS_SAVED_ON")
//		private Date ins_saved_on;
//
//		@Column(name = "INS_SAVED_BY")
//		private String ins_saved_by;
//
//		@Column(name = "INS_SAVED_ID")
//		private Long ins_saved_id;
//		
//		@Column(name = "INS_STATUS")
//		private String ins_status;
//		
//		
//		@Column(name = "INS_SIGN")
//		private String ins_sign;
//
//		@Column(name = "INS_SUBMIT_ON")
//		private Date ins_submit_on;
//
//		@Column(name = "INS_SUBMIT_BY")
//		private String ins_submit_by;
//
//		@Column(name = "INS_SUBMIT_ID")
//		private Long ins_submit_id;
//	    
//	    @Column(name = "QC_STATUS")
//		private String qc_status;
//
//		@Column(name = "QC_SUBMIT_ON")
//		private Date qc_submit_on;
//
//		@Column(name = "QC_SUBMIT_BY")
//		private String qc_submit_by;
//
//		@Column(name = "QC_SUBMIT_ID")
//		private Long qc_submit_id;
//
//		@Column(name = "QC_SIGN")
//		private String qc_sign;
//		
		   @Column(name = "TEST_ID")
		    private Long test_id;
		
		
		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "TEST_ID", insertable = false, updatable = false)
		@JsonIgnore
		private productionretainedsampleregister40history productionretainedsampleregister40;
}
