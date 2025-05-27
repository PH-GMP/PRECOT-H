package com.focusr.Precot.mssql.database.model.bleaching.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "BLEACH_SMS_ACTIVITIES_HISTORY_F01", schema = AppConstants.schema)
public class BleachSMSActivitiesHistoryF01 {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "DESCRIPTION")
	private String description;

	@Column(name = "COMPLETED")
	private boolean completed;

	@Column(name = "NOTAPPLICABLE")
	private boolean notApplicable;

	@Column(name = "SMS_ID")
	private Long smsId;

	@Column(name = "NOT_COMPLETED")
	private boolean not_completed;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public boolean isNotApplicable() {
		return notApplicable;
	}

	public void setNotApplicable(boolean notApplicable) {
		this.notApplicable = notApplicable;
	}

	public Long getSmsId() {
		return smsId;
	}

	public void setSmsId(Long smsId) {
		this.smsId = smsId;
	}

	public boolean isNot_completed() {
		return not_completed;
	}

	public void setNot_completed(boolean not_completed) {
		this.not_completed = not_completed;
	}

	public BleachSMSActivitiesHistoryF01() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
