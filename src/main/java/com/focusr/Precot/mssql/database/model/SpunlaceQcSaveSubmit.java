package com.focusr.Precot.mssql.database.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Lob;
import javax.persistence.MappedSuperclass;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.focusr.Precot.model.audit.UserDateAudit;

import lombok.Data;

@Data
@MappedSuperclass
@JsonIgnoreProperties(value = { "qc_status", "qc_save_on", "qc_save_by", "qc_save_id", "qc_submit_on", "qc_submit_by",
		"qc_submit_id", "qc_sign","qc_mail_status" , "supervisor_status",
		"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
		"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "supervisor_mail_status", "hod_status",
		"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id",
		"hod_sign,hod_mail_status","hod_signature_image","supervisor_signature_image","qc_signature_image"}, allowGetters = true, allowSetters = true)
public class SpunlaceQcSaveSubmit extends UserDateAudit {

	// SUPERVISOR
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisor_status;

	@Column(name = "SUPERVISOR_SAVE_ON")
	private Date supervisor_save_on;

	@Column(name = "SUPERVISOR_SAVE_BY")
	private String supervisor_save_by;

	@Column(name = "SUPERVISOR_SAVE_ID")
	private Long supervisor_save_id;

	@Column(name = "SUPERVISOR_SUBMIT_ON")
	private Date supervisor_submit_on;

	@Column(name = "SUPERVISOR_SUBMIT_BY")
	private String supervisor_submit_by;

	@Column(name = "SUPERVISOR_SUBMIT_ID")
	private Long supervisor_submit_id;

	@Column(name = "SUPERVISOR_SIGN")
	private String supervisor_sign;

	// HOD
	@Column(name = "HOD_STATUS")
	private String hod_status;

	@Column(name = "HOD_SAVE_ON")
	private Date hod_save_on;

	@Column(name = "HOD_SAVE_BY")
	private String hod_save_by;

	@Column(name = "HOD_SAVE_ID")
	private Long hod_save_id;

	@Column(name = "HOD_SUBMIT_ON")
	private Date hod_submit_on;

	@Column(name = "HOD_SUBMIT_BY")
	private String hod_submit_by;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hod_submit_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;

	@Column(name = "HOD_MAIL_STATUS")
	private String hod_mail_status;

	// QC
	@Column(name = "QC_STATUS")
	private String qc_status;

	@Column(name = "QC_SAVE_ON")
	private Date qc_save_on;

	@Column(name = "QC_SAVE_BY")
	private String qc_save_by;

	@Column(name = "QC_SAVE_ID")
	private Long qc_save_id;

	@Column(name = "QC_SUBMIT_ON")
	private Date qc_submit_on;

	@Column(name = "QC_SUBMIT_BY")
	private String qc_submit_by;

	@Column(name = "QC_SUBMIT_ID")
	private Long qc_submit_id;

	@Column(name = "QC_SIGN")
	private String qc_sign;

	@Column(name = "QC_MAIL_STATUS")
	private String qc_mail_status;
	
	//sign image
	
		@Lob
		@Column(name = "HOD_SIGNATURE_IMAGE")
		private byte[] hod_signature_image;
		
		@Lob
		@Column(name = "SUPERVISOR_SIGNATURE_IMAGE")
		private byte[] supervisor_signature_image;
		
		@Lob
		@Column(name = "QC_SIGNATURE_IMAGE")
		private byte[] qc_signature_image;
}
