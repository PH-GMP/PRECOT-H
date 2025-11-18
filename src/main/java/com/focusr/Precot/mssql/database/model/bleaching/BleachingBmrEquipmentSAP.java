package com.focusr.Precot.mssql.database.model.bleaching;

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
@Table(name = "BLEACHING_BMR_EQUIPMENT_SAP", schema = AppConstants.schema)
public class BleachingBmrEquipmentSAP {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "EQUIPMENT_NAME")
	private String equipmentName;

	@Column(name = "EQUIPMENT_CODE")
	private String equipmentCode;

	@Column(name = "START_DATE")
	private String startDate;

	@Column(name = "END_DATE")
	private String endDate;

}