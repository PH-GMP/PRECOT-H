package com.focusr.Precot.mssql.database.model.padpunching.bmr;

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
@Table(name = "PADPUNCHING_BMR_MANUFACTURING_STEPS_LINE", schema = AppConstants.schema)
public class PunchingBmrManufacturingStepsLine extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "MACHINE_NAME")
	private String machineName;
	
	@Column(name = "MACHINE_START_TIME")
	private String machineStartTime;
	
	@Column(name = "MACHINE_END_TIME")
	private String machineEndTime;
	
	@Column(name = "NO_OF_PADS1")
	private Long padCount1;
	
	@Column(name = "MACHINE_SPEED1")
	private String machineSpeed1;
	
	@Column(name = "NO_OF_PADS2")
	private Long padCount2;
	
	@Column(name = "MACHINE_SPEED2")
	private String machineSpeed2;
	
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
    @JoinColumn(name = "MANUFACTURE_ID", nullable = false)
	@JsonIgnore
    private PunchingBmrManufacturingSteps manufactureRecord;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Long getPadCount1() {
		return padCount1;
	}

	public void setPadCount1(Long padCount1) {
		this.padCount1 = padCount1;
	}

	public String getMachineSpeed1() {
		return machineSpeed1;
	}

	public void setMachineSpeed1(String machineSpeed1) {
		this.machineSpeed1 = machineSpeed1;
	}

	public Long getPadCount2() {
		return padCount2;
	}

	public void setPadCount2(Long padCount2) {
		this.padCount2 = padCount2;
	}

	public String getMachineSpeed2() {
		return machineSpeed2;
	}

	public void setMachineSpeed2(String machineSpeed2) {
		this.machineSpeed2 = machineSpeed2;
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

	public PunchingBmrManufacturingSteps getManufactureRecord() {
		return manufactureRecord;
	}

	public void setManufactureRecord(PunchingBmrManufacturingSteps manufactureRecord) {
		this.manufactureRecord = manufactureRecord;
	}

	


}
