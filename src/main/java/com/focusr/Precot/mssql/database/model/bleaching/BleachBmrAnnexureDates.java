package com.focusr.Precot.mssql.database.model.bleaching;

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
@Table(name = "BLEACH_BMR_ANNEXURE_DATES", schema=AppConstants.schema)
public class BleachBmrAnnexureDates extends UserDateAudit{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ANNEXURE_ID")
	private Long annexureId;
	
	@Column(name = "EQUIPMENT_NAME")
	private String equipmentName;
	
	@Column(name = "EQUIPMENT_CODE")
	private String equipmentCode;
	
	@Column(name = "CALIBRATION_DATE")
	private String calibrationDate;
	
	@Column(name = "DUE_DATE")
	private String dueDate;

	@ManyToOne
	@JoinColumn(name = "ID", nullable = false)
	@JsonIgnore
	private BleachBmrAnnexureList annexureList;
	
	public Long getAnnexureId() {
		return annexureId;
	}

	public void setAnnexureId(Long annexureId) {
		this.annexureId = annexureId;
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

	public String getCalibrationDate() {
		return calibrationDate;
	}

	public void setCalibrationDate(String calibrationDate) {
		this.calibrationDate = calibrationDate;
	}

	public String getDueDate() {
		return dueDate;
	}

	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}

	public BleachBmrAnnexureList getAnnexureList() {
		return annexureList;
	}

	public void setAnnexureList(BleachBmrAnnexureList annexureList) {
		this.annexureList = annexureList;
	}
	
	
}
