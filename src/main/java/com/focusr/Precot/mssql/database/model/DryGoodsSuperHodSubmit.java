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
@JsonIgnoreProperties(value = {  "supervisor_status",
		"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
		"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "supervisor_mail_status", "hod_status",
		"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id",
		"hod_sign,hod_mail_status"}, allowGetters = true, allowSetters = true)
public class DryGoodsSuperHodSubmit extends UserDateAudit {

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

	
	
}
