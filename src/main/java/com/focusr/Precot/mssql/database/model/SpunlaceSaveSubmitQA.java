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
@JsonIgnoreProperties(value = { "supervisor_status", "supervisor_save_on", "supervisor_save_by", "supervisor_save_id",
		"supervisor_submit_on", "supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status",
		"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
		"hod_mail_status", "qa_status", "qa_save_on", "qa_save_by", "qa_save_id", "qa_submit_on", "qa_submit_by",
		"qa_submit_id", "qa_mail_status", "qa_sign","supervisor_signature_image","hod_signature_image","qa_signature_image" }, allowGetters = true, allowSetters = true)
public class SpunlaceSaveSubmitQA extends UserDateAudit {

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
	
	@Lob
	@Column(name = "SUPERVISIOR_SIGNATURE_IMAGE")
	private byte[] supervisor_signature_image;

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
	
	@Lob
	@Column(name = "HOD_SIGNATURE_IMAGE")
	private byte[] hod_signature_image;

	// QA
	@Column(name = "QA_STATUS")
	private String qa_status;

	@Column(name = "QA_SAVE_ON")
	private Date qa_save_on;

	@Column(name = "QA_SAVE_BY")
	private String qa_save_by;

	@Column(name = "QA_SAVE_ID")
	private Long qa_save_id;

	@Column(name = "QA_SUBMIT_ON")
	private Date qa_submit_on;

	@Column(name = "QA_SUBMIT_BY")
	private String qa_submit_by;

	@Column(name = "QA_SUBMIT_ID")
	private Long qa_submit_id;

	@Column(name = "QA_SIGN")
	private String qa_sign;

	@Column(name = "QA_MAIL_STATUS")
	private String qa_mail_status;
	
	@Lob
	@Column(name = "QA_SIGNATURE_IMAGE")
	private byte[] qa_signature_image;

}
