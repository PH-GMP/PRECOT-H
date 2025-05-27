package com.focusr.Precot.mssql.database.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.focusr.Precot.model.audit.UserDateAudit;

import lombok.Data;

@Data
@MappedSuperclass
@JsonIgnoreProperties(value = { "operator_status", "operator_save_by", "operator_save_on", "operator_save_id",
		"operator_submitted_by", "operator_submitted_on", "operator_submitted_id", "operator_sign", "hod_status",
		"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
		"hod_mail_status" }, allowGetters = true, allowSetters = true)
public abstract class DryGoodsOperatorHodOperator extends UserDateAudit {

	@Column(name = "OPERATOR_STATUS")
	private String operator_status;

	@Column(name = "OPERATOR_SAVE_BY")
	private String operator_save_by;

	@Column(name = "OPERATOR_SAVE_ON")
	private Date operator_save_on;

	@Column(name = "OPERATOR_SAVE_ID")
	private Long operator_save_id;

	@Column(name = "OPERATOR_SUBMITTED_BY")
	private String operator_submitted_by;

	@Column(name = "OPERATOR_SUBMITTED_ON")
	private Date operator_submitted_on;

	@Column(name = "OPERATOR_SUBMITTED_ID")
	private Long operator_submitted_id;

	@Column(name = "OPERATOR_SIGN")
	private String operator_sign;

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

}