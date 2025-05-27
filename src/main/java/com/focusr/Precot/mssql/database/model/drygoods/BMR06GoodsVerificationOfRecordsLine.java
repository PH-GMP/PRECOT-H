package com.focusr.Precot.mssql.database.model.drygoods;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "DRYGOODS_BMR__06_VERIFICATION_OF_RECORDS_LINE", schema = AppConstants.schema)
public class BMR06GoodsVerificationOfRecordsLine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "VERIFICATION_ID")
	private Long verification_id;

	@Column(name = "CHECKED_DATE")
	private String checked_date;

	@Column(name = "CHECKED_TIME")
	private String checked_time;

	@Column(name = "CHECKED_NAME")
	private String checked_name;

	@Column(name = "CHECKED_SIGN")
	private String checked_sign;

	@Column(name = "VERIFIED_DATE")
	private String verified_date;

	@Column(name = "VERIFIED_TIME")
	private String verified_time;

	@Column(name = "VERIFIED_NAME")
	private String verified_name;

	@Column(name = "VERIFIED_SIGN")
	private String verified_sign;

	@Column(name = "ACTIVITY")
	private String activity;

	@Column(name = "NAME_OF_RECORD")
	private String name_of_record;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "VERIFICATION_ID", insertable = false, updatable = false)
	@JsonIgnore
	private BMR06GoodsVerificationOfRecords bmrVerificationDetail;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getVerification_id() {
		return verification_id;
	}

	public void setVerification_id(Long verification_id) {
		this.verification_id = verification_id;
	}

	public String getChecked_date() {
		return checked_date;
	}

	public void setChecked_date(String checked_date) {
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

	public String getChecked_sign() {
		return checked_sign;
	}

	public void setChecked_sign(String checked_sign) {
		this.checked_sign = checked_sign;
	}

	public String getVerified_date() {
		return verified_date;
	}

	public void setVerified_date(String verified_date) {
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

	public String getVerified_sign() {
		return verified_sign;
	}

	public void setVerified_sign(String verified_sign) {
		this.verified_sign = verified_sign;
	}

	public String getActivity() {
		return activity;
	}

	public void setActivity(String activity) {
		this.activity = activity;
	}

	public String getName_of_record() {
		return name_of_record;
	}

	public void setName_of_record(String name_of_record) {
		this.name_of_record = name_of_record;
	}

	public BMR06GoodsVerificationOfRecords getBmrVerificationDetail() {
		return bmrVerificationDetail;
	}

	public void setBmrVerificationDetail(BMR06GoodsVerificationOfRecords bmrVerificationDetail) {
		this.bmrVerificationDetail = bmrVerificationDetail;
	}
	
	
	
	

}
