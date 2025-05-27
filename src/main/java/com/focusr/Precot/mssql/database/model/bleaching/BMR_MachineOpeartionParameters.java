package com.focusr.Precot.mssql.database.model.bleaching;

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
@Table(name = "BMR_MACHINE_OPERATION_PARAMETERS",schema=AppConstants.schema)
public class BMR_MachineOpeartionParameters extends UserDateAudit {

	@Column(name = "MACHINE_OPERATION_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long machineOperationId;
	
	@Column(name = "DESCRIPTION")
	private String description;
	
	@Column(name = "STD_RANGE")
	private String stdRange;
	
	@Column(name = "OBSERVATION1")
	private String observation1;
	
	@Column(name = "OBSERVATION2")
	private String observation2;
	
	@Column(name = "SUMMARY_ID")
	private Long summaryId;

	public Long getMachineOperationId() {
		return machineOperationId;
	}

	public void setMachineOperationId(Long machineOperationId) {
		this.machineOperationId = machineOperationId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStdRange() {
		return stdRange;
	}

	public void setStdRange(String stdRange) {
		this.stdRange = stdRange;
	}

	public String getObservation1() {
		return observation1;
	}

	public void setObservation1(String observation1) {
		this.observation1 = observation1;
	}

	public String getObservation2() {
		return observation2;
	}

	public void setObservation2(String observation2) {
		this.observation2 = observation2;
	}
	
	
	
}
