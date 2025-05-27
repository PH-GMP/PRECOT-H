package com.focusr.Precot.mssql.database.model.splunance.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_SMS_ACTIVITIES_HISTORY_F024", schema = AppConstants.schema)
public class SpunlaceSmsActivitiesHistoryF024 {
	
	@Id
	@Column(name = "ACTIVITY_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long activityId;
	
	@Column(name = "ACTIVITY")
	private String activity;

	@Column(name = "IS_COMPLETED")
	private String isCompleted;
	
	@Column(name = "SMS_ID")
	private Long smsId;

}
