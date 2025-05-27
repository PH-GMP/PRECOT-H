package com.focusr.Precot.mssql.database.model.Qc;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "BRIQUETTES_ANALYSIS_REPORT", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "INVOICE_NO"}) })
@Data
public class briquettesanalysisreportARF014 extends UserDateAudit {

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
	    
	@Column(name = "S_NO")
    private String s_no;
    
	@Column(name = "DATE")
    private String date;
    
	@Column(name = "AN_RE_NUMBER")
    private String an_re_number;
	
	@Column(name = "SUPPLIER_NAME")
	private String supplier_name;
    
	@Column(name = "INVOICE_NO")
    private String invoice_no;
	
	@Column(name = "AN_RE_NUMBER_B")
    private String an_re_number_b;
	
	@Column(name = "SUPPLIER_NAME_B")
	private String supplier_name_b;
    
	@Column(name = "INVOICE_NO_B")
    private String invoice_no_b;
    
	//---------------------------------------------------
    @Column(name = "FINAL_WT_G_B")
    private String ashContent1FlWtObr;

    @Column(name = "INITIAL_WT_G_A")
    private String ashContent1IlWtObr;

    @Column(name = "FINAL_BA")
    private String ashContent1BaObr;

    @Column(name = "RESULTS_BA")
    private String ashContent1ResObr;
//-----------------------------------------------------------
    @Column(name = "FINAL_WT_G_B_AGAIN")
    private String ashContent2FlWtObr;

    @Column(name = "INITIAL_WT_G_A_AGAIN")
    private String ashContent2IlWtObr;

    @Column(name = "FL_INI_BA")
    private String ashContent2BaObr;

    @Column(name = "RESULTS_B_A")
    private String ashContent2ResObr;
    //-----------------------------------------------------------
    @Column(name = "FINAL_WT_G_Y")
    private String moisture1FlWtObr;

    @Column(name = "INITIAL_WT_G_X")
    private String moisture1IlWtObr;

    @Column(name = "FINAL_xy")
    private String moisture1XyObr;

    @Column(name = "RESULTS_xy")
    private String moisture1ResObr;
  //-------------------------------------------------------
    @Column(name = "FINAL_WT_G_Y_XGAIN")
    private String moisture2FlWtObr;

    @Column(name = "INITIAL_WT_G_X_XGAIN")
    private String moisture2IlWtObr;

    @Column(name = "FL_INI_xy")
    private String moisture2XyObr;

    @Column(name = "RESULTS_Y_X")
    private String moisture2ResObr;
    //----------------------------------------------------------
    @Column(name = "REMARKS")
    private String remarks;
    
    @Column(name = "REMARKS1")
    private String remarks1;
    
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
	
	@Column(name = "REPORT_DATE")
	private String report_date;

	@Column(name = "TESTED_BY")
	private String tested_by;
	
	@Column(name = "TESTED_BY_B")
	private String tested_by_b;
	
	@Column(name = "TESTED_SIGN")
	private String tested_sign;
	
	@Column(name = "TESTED_SIGN_DATE")
	private Date tested_sign_date;
	
	@Column(name = "APPROVED_BY")
	private String approved_by;
	
	@Column(name = "APPROVED_BY_B")
	private String approved_by_b;
	
	@Column(name = "APPROVED_SIGN")
	private String approved_sign;
	
	@Column(name = "APPROVED_DATE")
	private Date approved_date;
	
	


// 




// 
//    remarks1 :"SELECT",
// 



// 



	
	

}
