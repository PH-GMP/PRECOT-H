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

@Data
@Entity
@Table(name = "FUNGAL_INCUBATOR_TEMPERATURE_CALIBRATION_REPORT", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE" , "EQ_ID_NO"}) })
public class fungalIncubatorReportCLF013 extends UserDateAudit{

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
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "SET_TEMPERATURE")
	private String set_temperature;

	@Column(name = "OBS_TEMPERATURE")
	private String obs_temperature;
	
	@Column(name = "STATUS")
	private String status;
	
	@Column(name = "CHECKED_BY")
	private String checked_by;
	
	@Column(name = "VERIFIED_BY")
	private String verified_by;
	

	
	@Column(name = "REASON")
	private String reason;
	
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


}
