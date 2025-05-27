package com.focusr.Precot.Buds.model.bmr;

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

@Entity
@Table(name = "BUDS_BMR_MANUFACTURER_STEPS_LINE", schema = AppConstants.schema)
public class BudsBmrManufacturerStepsLine  extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;
	
	@Column(name = "MACHINE_NAME")
	private String machineName;
	
	@Column(name = "MACHINE_START_TIME")
	private String machineStartTime;
	
	@Column(name = "MACHINE_END_TIME")
	private String machineEndTime;
	
	@Column(name = "NO_OF_PADS")
	private Long padCount;
	
	@Column(name = "MACHINE_SPEED")
	private String machineSpeed;
	
	@Column(name = "PDS_NUMBER")
	private String pdsNumber;
	
	@Column(name = "OBSERVATION")
	private String observation;
	
	@Column(name = "CHECKED_DATE")
	private String checked_date;

	@Column(name = "CHECKED_TIME")
	private String checked_time;

	@Column(name = "CHECKED_NAME")
	private String checked_name;

	@Column(name = "CHECKED_SIGN")
	private String checked_sign;

	@Column(name = "PERFORMED_DATE")
	private String performed_date;

	@Column(name = "PERFORMED_TIME")
	private String performed_time;

	@Column(name = "PERFORMED_NAME")
	private String performed_name;

	@Column(name = "PERFORMED_SIGN")
	private String performed_sign;
	
	@ManyToOne
    @JoinColumn(name = "ID", nullable = false)
	@JsonIgnore
    private BudsBmrManufacturerStepsHeader manufactureRecord;

	public Long getLineId() {
		return lineId;
	}

	public void setLineId(Long lineId) {
		this.lineId = lineId;
	}

	public String getMachineName() {
		return machineName;
	}

	public void setMachineName(String machineName) {
		this.machineName = machineName;
	}

	public String getMachineStartTime() {
		return machineStartTime;
	}

	public void setMachineStartTime(String machineStartTime) {
		this.machineStartTime = machineStartTime;
	}

	public String getMachineEndTime() {
		return machineEndTime;
	}

	public void setMachineEndTime(String machineEndTime) {
		this.machineEndTime = machineEndTime;
	}

	public Long getPadCount() {
		return padCount;
	}

	public void setPadCount(Long padCount) {
		this.padCount = padCount;
	}

	public String getMachineSpeed() {
		return machineSpeed;
	}

	public void setMachineSpeed(String machineSpeed) {
		this.machineSpeed = machineSpeed;
	}

	public String getPdsNumber() {
		return pdsNumber;
	}

	public void setPdsNumber(String pdsNumber) {
		this.pdsNumber = pdsNumber;
	}

	public String getObservation() {
		return observation;
	}

	public void setObservation(String observation) {
		this.observation = observation;
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

	public String getPerformed_date() {
		return performed_date;
	}

	public void setPerformed_date(String performed_date) {
		this.performed_date = performed_date;
	}

	public String getPerformed_time() {
		return performed_time;
	}

	public void setPerformed_time(String performed_time) {
		this.performed_time = performed_time;
	}

	public String getPerformed_name() {
		return performed_name;
	}

	public void setPerformed_name(String performed_name) {
		this.performed_name = performed_name;
	}

	public String getPerformed_sign() {
		return performed_sign;
	}

	public void setPerformed_sign(String performed_sign) {
		this.performed_sign = performed_sign;
	}

	public BudsBmrManufacturerStepsHeader getManufactureRecord() {
		return manufactureRecord;
	}

	public void setManufactureRecord(BudsBmrManufacturerStepsHeader manufactureRecord) {
		this.manufactureRecord = manufactureRecord;
	}
	
	
	
}
