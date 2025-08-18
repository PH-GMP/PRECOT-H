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
@Table(name = "PADPUNCHING_BMR_EQUIPMENT_DETAILS_LINE", schema = AppConstants.schema)
public class PunchingBmrEquipmentDetailsLine extends UserDateAudit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "CALIBRATION")
	private String calibration;

	@Column(name = "EQUIPMENT_NAME")
	private String equipmentName;
	
	@Column(name = "EQUIPMENT_CODE")
	private String equipmentCode;

	@Column(name = "DATE_OF_CALIBRATION")
	private String dateOfCalibration;
	
	@Column(name = "CALIBRATION_DUE_ON")
	private String calibrationDueOn;

	@Column(name = "CHECKED_TIME")
	private String checked_time;

	@Column(name = "CHECKED_NAME")
	private String checked_name;
	
	@Column(name = "CHECKED_ID")
	private Long checked_id;
	
	@Column(name = "CHECKED_DATE")
	private Date checked_date;

	@Column(name = "CHECKED_SIGN")
	private String checked_sign;
	
	@Column(name = "CHECKED_STATUS")
	private String checked_status;
	
	@ManyToOne
    @JoinColumn(name = "EQUIPMENT_ID", nullable = false)
	@JsonIgnore
    private PunchingBmrEquipmentDetails equipmentRecord;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEquipmentName() {
		return equipmentName;
	}

	public void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}

	public String getEquipmentCode() {
		return equipmentCode;
	}

	public void setEquipmentCode(String equipmentCode) {
		this.equipmentCode = equipmentCode;
	}

	public String getDateOfCalibration() {
		return dateOfCalibration;
	}

	public void setDateOfCalibration(String dateOfCalibration) {
		this.dateOfCalibration = dateOfCalibration;
	}

	public String getCalibrationDueOn() {
		return calibrationDueOn;
	}

	public void setCalibrationDueOn(String calibrationDueOn) {
		this.calibrationDueOn = calibrationDueOn;
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

	public Date getChecked_date() {
		return checked_date;
	}

	public void setChecked_date(Date checked_date) {
		this.checked_date = checked_date;
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

	public PunchingBmrEquipmentDetails getEquipmentRecord() {
		return equipmentRecord;
	}

	public void setEquipmentRecord(PunchingBmrEquipmentDetails equipmentRecord) {
		this.equipmentRecord = equipmentRecord;
	}

	public PunchingBmrEquipmentDetailsLine() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
}
