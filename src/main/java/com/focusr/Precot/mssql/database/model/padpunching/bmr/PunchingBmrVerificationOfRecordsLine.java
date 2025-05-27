package com.focusr.Precot.mssql.database.model.padpunching.bmr;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;


@Entity
@Table(name = "PADPUNCHING_BMR_VERIFICATION_OF_RECORDS_LINE", schema = AppConstants.schema)
public class PunchingBmrVerificationOfRecordsLine extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;

	@Column(name = "RECORD_NAME")
	private String recordName;
	
	@Column(name = "CHECKED_DATE")
	private Date checked_date;

	@Column(name = "CHECKED_TIME")
	private String checked_time;

	@Column(name = "CHECKED_NAME")
	private String checked_name;
	
	@Column(name = "CHECKED_ID")
	private Long checked_id;

	@Column(name = "CHECKED_SIGN")
	private String checked_sign;
	
	@Column(name = "CHECKED_STATUS")
	private String checked_status;

	@Column(name = "VERIFIED_DATE")
	private Date verified_date;

	@Column(name = "VERIFIED_TIME")
	private String verified_time;

	@Column(name = "VERIFIED_NAME")
	private String verified_name;
	
	@Column(name = "VERIFIED_ID")
	private Long verified_id;
	
	@Column(name = "VERIFIED_STATUS")
	private String verified_status;

	@Column(name = "VERIFIED_SIGN")
	private String verified_sign;
	
	@Column(name = "SATISFACTORY")
	private String satisfactory;

	@Column(name = "NON_SATISFACTORY")
	private String non_satisfactory;
	
//	@Column(name = "VERIFICATION_ID")
//	private Long verificationId;

	@ManyToOne
    @JoinColumn(name = "VERIFICATION_ID", nullable = false)
	@JsonIgnore
    private PunchingBmrVerificationOfRecords verificationRecord;
	
	public Long getLineId() {
		return lineId;
	}

	public void setLineId(Long lineId) {
		this.lineId = lineId;
	}

	public String getRecordName() {
		return recordName;
	}

	public void setRecordName(String recordName) {
		this.recordName = recordName;
	}

	public Date getChecked_date() {
		return checked_date;
	}

	public void setChecked_date(Date checked_date) {
		this.checked_date = checked_date;
	}

	public String getChecked_time() {
		return checked_time;
	}

	public void setChecked_time(String checked_time) {
		this.checked_time = checked_time;
	}

	public String getChecked_name() {
		return checked_name;
	}

	public void setChecked_name(String checked_name) {
		this.checked_name = checked_name;
	}

	public Long getChecked_id() {
		return checked_id;
	}

	public void setChecked_id(Long checked_id) {
		this.checked_id = checked_id;
	}

	public String getChecked_sign() {
		return checked_sign;
	}

	public void setChecked_sign(String checked_sign) {
		this.checked_sign = checked_sign;
	}

	public String getChecked_status() {
		return checked_status;
	}

	public void setChecked_status(String checked_status) {
		this.checked_status = checked_status;
	}

	public Date getVerified_date() {
		return verified_date;
	}

	public void setVerified_date(Date verified_date) {
		this.verified_date = verified_date;
	}

	public String getVerified_time() {
		return verified_time;
	}

	public void setVerified_time(String verified_time) {
		this.verified_time = verified_time;
	}

	public String getVerified_name() {
		return verified_name;
	}

	public void setVerified_name(String verified_name) {
		this.verified_name = verified_name;
	}

	public Long getVerified_id() {
		return verified_id;
	}

	public void setVerified_id(Long verified_id) {
		this.verified_id = verified_id;
	}

	public String getVerified_status() {
		return verified_status;
	}

	public void setVerified_status(String verified_status) {
		this.verified_status = verified_status;
	}

	public String getVerified_sign() {
		return verified_sign;
	}

	public void setVerified_sign(String verified_sign) {
		this.verified_sign = verified_sign;
	}

	public String getSatisfactory() {
		return satisfactory;
	}

	public void setSatisfactory(String satisfactory) {
		this.satisfactory = satisfactory;
	}

	public String getNon_satisfactory() {
		return non_satisfactory;
	}

	public void setNon_satisfactory(String non_satisfactory) {
		this.non_satisfactory = non_satisfactory;
	}

	public PunchingBmrVerificationOfRecordsLine() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PunchingBmrVerificationOfRecords getVerificationRecord() {
		return verificationRecord;
	}

	public void setVerificationRecord(PunchingBmrVerificationOfRecords verificationRecord) {
		this.verificationRecord = verificationRecord;
	}
	
	
	
	
}
