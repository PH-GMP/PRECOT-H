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
@JsonIgnoreProperties(value = { "supervisor_status",
		"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
		"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status",
		"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id",
		"hod_sign","hod_mail_status","supervisor_signature_image","hod_signature_image" }, allowGetters = true, allowSetters = true)
public abstract class SpunlaceSaveSumbitSupervisor extends UserDateAudit {

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

		public String getSupervisor_status() {
		return supervisor_status;
	}

	public void setSupervisor_status(String supervisor_status) {
		this.supervisor_status = supervisor_status;
	}

	public Date getSupervisor_save_on() {
		return supervisor_save_on;
	}

	public void setSupervisor_save_on(Date supervisor_save_on) {
		this.supervisor_save_on = supervisor_save_on;
	}

	public String getSupervisor_save_by() {
		return supervisor_save_by;
	}

	public void setSupervisor_save_by(String supervisor_save_by) {
		this.supervisor_save_by = supervisor_save_by;
	}

	public Long getSupervisor_save_id() {
		return supervisor_save_id;
	}

	public void setSupervisor_save_id(Long supervisor_save_id) {
		this.supervisor_save_id = supervisor_save_id;
	}

	public Date getSupervisor_submit_on() {
		return supervisor_submit_on;
	}

	public void setSupervisor_submit_on(Date supervisor_submit_on) {
		this.supervisor_submit_on = supervisor_submit_on;
	}

	public String getSupervisor_submit_by() {
		return supervisor_submit_by;
	}

	public void setSupervisor_submit_by(String supervisor_submit_by) {
		this.supervisor_submit_by = supervisor_submit_by;
	}

	public Long getSupervisor_submit_id() {
		return supervisor_submit_id;
	}

	public void setSupervisor_submit_id(Long supervisor_submit_id) {
		this.supervisor_submit_id = supervisor_submit_id;
	}

	public String getSupervisor_sign() {
		return supervisor_sign;
	}

	public void setSupervisor_sign(String supervisor_sign) {
		this.supervisor_sign = supervisor_sign;
	}

	public String getHod_status() {
		return hod_status;
	}

	public void setHod_status(String hod_status) {
		this.hod_status = hod_status;
	}

	public Date getHod_save_on() {
		return hod_save_on;
	}

	public void setHod_save_on(Date hod_save_on) {
		this.hod_save_on = hod_save_on;
	}

	public String getHod_save_by() {
		return hod_save_by;
	}

	public void setHod_save_by(String hod_save_by) {
		this.hod_save_by = hod_save_by;
	}

	public Long getHod_save_id() {
		return hod_save_id;
	}

	public void setHod_save_id(Long hod_save_id) {
		this.hod_save_id = hod_save_id;
	}

	public Date getHod_submit_on() {
		return hod_submit_on;
	}

	public void setHod_submit_on(Date hod_submit_on) {
		this.hod_submit_on = hod_submit_on;
	}

	public String getHod_submit_by() {
		return hod_submit_by;
	}

	public void setHod_submit_by(String hod_submit_by) {
		this.hod_submit_by = hod_submit_by;
	}

	public Long getHod_submit_id() {
		return hod_submit_id;
	}

	public void setHod_submit_id(Long hod_submit_id) {
		this.hod_submit_id = hod_submit_id;
	}

	public String getHod_sign() {
		return hod_sign;
	}

	public void setHod_sign(String hod_sign) {
		this.hod_sign = hod_sign;
	}

	public String getHod_mail_status() {
		return hod_mail_status;
	}

	public void setHod_mail_status(String hod_mail_status) {
		this.hod_mail_status = hod_mail_status;
	}
	
}
