package com.focusr.Precot.mssql.database.model.QcAudit;

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

@Data
@Entity
@Table(name = "TURBIDITY_CALIBRATION_REPORT_HISTORY", schema = AppConstants.schema)
public class turbiditycalibrationreportHistoryCLF009 extends UserDateAudit {
	
	@Id
	@Column(name = "LAB_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lab_id;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "FORMAT_NO")
	private String format_no;
	
	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;
	
	@Column(name = "REVISION_NO")
	private String revision_no;
	
	@Column(name = "EQ_ID_NO")
	private String eq_id_no;
		
	@Column(name = "REMARK")
	private String remark;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "DIS_WATER")
	private String dis_water;
	
	@Column(name = "NTU_100")
	private String ntu_100;
	
	@Column(name = "NTU_10")
	private String ntu_10;
	
	@Column(name = "CHECKED_BY")
	private String checked_by;
	
	@Column(name = "VERIFIED_BY")
	private String verified_by;
	
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

	@Column(name = "VERSION")
	private int version;
	
	@Column(name = "REASON")
	private String reason;


}
