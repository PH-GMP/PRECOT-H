package com.focusr.Precot.mssql.database.model.QcAudit;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DIGITAL_COLONY_COUNTER_F030_HISTORY", schema = AppConstants.schema)

public class DigitalColonyCounterF030History extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HIS_ID")
	private Long his_id;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "DATE")
	private String date;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "EQUIP_ID")
	private String equip_id;

	@Column(name = "CENTERING_STATUS")
	private String centering_status;

	@Column(name = "ADJUSTING_STATUS")
	private String adjusting_status;

	@Column(name = "CALIBRATION_TIME")
	private String calibration_time;

	@Column(name = "ACTIVITY_STATUS")
	private String activity_status;

	@Column(name = "CALIBRATION_NEXT_DUE_DATE")
	private String calibration_next_due_date;

	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "REASON")
	private String reason;

	// STATUS

	@Column(name = "MICRO_STATUS")
	private String micro_status;

	@Column(name = "MICRO_SAVED_ON")
	private Date micro_saved_on;

	@Column(name = "MICRO_SAVED_BY")
	private String micro_saved_by;

	@Column(name = "MICRO_SAVED_ID")
	private Long micro_saved_id;

	@Column(name = "MICRO_SUBMIT_ON")
	private Date micro_submit_on;

	@Column(name = "MICRO_SUBMIT_BY")
	private String micro_submit_by;

	@Column(name = "MICRO_SUBMIT_ID")
	private Long micro_submit_id;

	@Column(name = "MICRO_SIGN")
	private String micro_sign;

	// MICRO DESIGNEE STATUS

	@Column(name = "MICRO_DESIGNEE_STATUS")
	private String micro_designee_status;

	@Column(name = "MICRO_DESIGNEE_SUBMIT_ON")
	private Date micro_designee_submit_on;

	@Column(name = "MICRO_DESIGNEE_SUBMIT_BY")
	private String micro_designee_submit_by;

	@Column(name = "MICRO_DESIGNEE_SUBMIT_ID")
	private Long micro_designee_submit_id;

	@Column(name = "MICRO_DESIGNEE_SIGN")
	private String micro_designee_sign;

	// VERSION

	@Column(name = "VERSION")
	private int version;

}
