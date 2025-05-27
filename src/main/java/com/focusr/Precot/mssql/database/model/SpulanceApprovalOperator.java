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
@JsonIgnoreProperties(value = { "operator_status", "operator_submitted_by", "operator_submitted_on",
		"operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_submit_on", "supervisor_submit_by",
		"supervisor_submit_id", "supervisor_sign", "supervisior_mail_status", "hod_status", "hod_submit_on",
		"hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status", "hod_signature_image",
		"supervisor_signature_image", "operator_signature_image" }, allowGetters = true, allowSetters = true)
public abstract class SpulanceApprovalOperator extends UserDateAudit {

	@Column(name = "OPERATOR_STATUS")
	private String operator_status;

	@Column(name = "OPERATOR_SUBMITTED_BY")
	private String operator_submitted_by;

	@Column(name = "OPERATOR_SUBMITTED_ON")
	private Date operator_submitted_on;

	@Column(name = "OPERATOR_SUBMITTED_ID")
	private Long operator_submitted_id;

	@Column(name = "OPERATOR_SIGN")
	private String operator_sign;

	// SUPERVISOR
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisor_status;

	@Column(name = "SUPERVISOR_SUBMIT_ON")
	private Date supervisor_submit_on;

	@Column(name = "SUPERVISOR_SUBMIT_BY")
	private String supervisor_submit_by;

	@Column(name = "SUPERVISOR_SUBMIT_ID")
	private Long supervisor_submit_id;

	@Column(name = "SUPERVISOR_SIGN")
	private String supervisor_sign;

	@Column(name = "SUPERVISOR_MAIL_STATUS")
	private String supervisior_mail_status;

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

	// sign image

	@Lob
	@Column(name = "HOD_SIGNATURE_IMAGE")
	private byte[] hod_signature_image;

	@Lob
	@Column(name = "SUPERVISOR_SIGNATURE_IMAGE")
	private byte[] supervisor_signature_image;

	@Lob
	@Column(name = "OPERATOR_SIGNATURE_IMAGE")
	private byte[] operator_signature_image;

	public String getOperator_status() {
		return operator_status;
	}

	public void setOperator_status(String operator_status) {
		this.operator_status = operator_status;
	}

	public String getOperator_submitted_by() {
		return operator_submitted_by;
	}

	public void setOperator_submitted_by(String operator_submitted_by) {
		this.operator_submitted_by = operator_submitted_by;
	}

	public Date getOperator_submitted_on() {
		return operator_submitted_on;
	}

	public void setOperator_submitted_on(Date operator_submitted_on) {
		this.operator_submitted_on = operator_submitted_on;
	}

	public Long getOperator_submitted_id() {
		return operator_submitted_id;
	}

	public void setOperator_submitted_id(Long operator_submitted_id) {
		this.operator_submitted_id = operator_submitted_id;
	}

	public String getOperator_sign() {
		return operator_sign;
	}

	public void setOperator_sign(String operator_sign) {
		this.operator_sign = operator_sign;
	}

	public String getSupervisor_status() {
		return supervisor_status;
	}

	public void setSupervisor_status(String supervisor_status) {
		this.supervisor_status = supervisor_status;
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

	public String getSupervisior_mail_status() {
		return supervisior_mail_status;
	}

	public void setSupervisior_mail_status(String supervisior_mail_status) {
		this.supervisior_mail_status = supervisior_mail_status;
	}

	public String getHod_status() {
		return hod_status;
	}

	public void setHod_status(String hod_status) {
		this.hod_status = hod_status;
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
