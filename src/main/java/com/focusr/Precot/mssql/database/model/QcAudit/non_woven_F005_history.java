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


@Table(name = "NON_WOVEN_FLEECE_ANALYSIS_REPORT_HISTORY", schema = AppConstants.schema)
@Entity
@Data
public class non_woven_F005_history extends UserDateAudit{
	

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
	private String bmr_no;
	
	@Column(name = "REVISION_NO")
	private String revision_no;
	
	@Column(name = "qa_inspector_STATUS")
	private String qa_inspector_status;
	
	@Column(name = "qa_inspector_SAVED_ON")
	private Date qa_inspector_saved_on;

	@Column(name = "qa_inspector_SAVED_BY")
	private String qa_inspector_saved_by;

	@Column(name = "qa_inspector_SAVED_ID")
	private Long qa_inspector_saved_id;

	@Column(name = "qa_inspector_SUBMIT_ON")
	private Date qa_inspector_submit_on;

	@Column(name = "qa_inspector_SUBMIT_BY")
	private String qa_inspector_submit_by;

	@Column(name = "qa_inspector_SUBMIT_ID")
	private Long qa_inspector_submit_id;

	@Column(name = "qa_inspector_SIGN")
	private String qa_inspector_sign;
	
	//---------------------------------------------------------------------------
	

	// HOD
	
	@Column(name = "TESTED_BY")
	private String tested_by;
	
	@Column(name = "APPROVED_BY")
	private String approved_by;

	@Column(name = "QA_MNG_STATUS")
	private String qa_mng_status;

	@Column(name = "QA_MNG_SUBMIT_ON")
	private Date qa_mng_submit_on;

	@Column(name = "QA_MNG_SUBMIT_BY")
	private String qa_mng_submit_by;

	@Column(name = "QA_MNG_SUBMIT_ID")
	private Long qa_mng_submit_id;
	
	@Column(name = "QA_MNG_SIGN")
	private String qa_mng_sign;
	
	@Column(name = "REASON")
	private String reason;
	
    @Column(name = "S_NO")
    private Long s_no;

    @Column(name = "ANALYSIS_REQUEST_NUMBER")
    private String analysis_request_number;

    @Column(name = "DATE")
    private String date;
    
    @Column(name = "SHIFT")
    private String shift;

    @Column(name = "PRODUCT_NAME")
    private String product_name;

    @Column(name = "SHAFT_NO")
    private String shaft_no;

    @Column(name = "JETLACE_PARAMETERS_PRESSURE")
    private String jetlace_parameters_pressure;
    
    @Column(name = "JETLACE_PARAMETERS_TEXT")
    private String jetlace_parameters_text;

    @Column(name = "MIXING")
    private String mixing;

    @Column(name = "GSM")
    private String gsm;

    @Column(name = "PATTERN")
    private String pattern;

    @Column(name = "MOISTURE_MAHLO")
    private String moisture_mahlo;
    
    @Column(name = "MOISTURE_PHOBE")
    private String moisture_phobe;

    @Column(name = "THICKNESS")
    private String thickness;

    @Column(name = "STRENGTH_CROSS_DIRECTION")
    private String strength_cross_direction;

    @Column(name = "STRENGTH_MACHINE_DIRECTION")
    private String strength_machine_direction;

    @Column(name = "FRICTION")
    private String friction;
    
    @Column(name = "APPEARANCE")
    private String appearance;
    
    @Column(name = "VERSION")
    private int version;
	

}
