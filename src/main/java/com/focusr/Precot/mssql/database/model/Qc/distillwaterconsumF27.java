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
@Table(name = "DISTILLED_WATER_CONSUMPTION_REPORT", schema = AppConstants.schema)
@Data

public class distillwaterconsumF27 extends UserDateAudit{
	
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
		
		@Column(name = "DATE")
		private String date;
		
		@Column(name = "YEAR")
		private String year;
		
		@Column(name = "MONTH")
		private String month;
		@Column(name = "OP_STOCK")
		private String op_stock;
		
		@Column(name = "QUANTITY_TAKEN")
		private String quantity_taken;
		
		@Column(name = "TAKEN_BY")
		private String taken_by;
		
		@Column(name = "REMAINING_STOCK")
		private String remaining_stock;
		
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

		@Column(name = "QUANTITY_PREPARED")
		private String quantity_prepared;	
		
		@Column(name = "REMARKS")
		private String remarks;
		@Column(name = "FEQUENCY")
		private String fequency;
		
		@Column(name = "EQ_ID")
		private String eq_id;
		
		private String reason;
		
}
