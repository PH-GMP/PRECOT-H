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
		"operator_submitted_id", "operator_sign","hod_status", "hod_submit_on",
		"hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status", "hod_signature_image",
		 "operator_signature_image" }, allowGetters = true, allowSetters = true)
public class OperatorHodApproval extends UserDateAudit{

	//Operator
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


	// sign image

	@Lob
	@Column(name = "HOD_SIGNATURE_IMAGE")
	private byte[] hod_signature_image;
	@Lob
	@Column(name = "OPERATOR_SIGNATURE_IMAGE")
	private byte[] operator_signature_image;

}
