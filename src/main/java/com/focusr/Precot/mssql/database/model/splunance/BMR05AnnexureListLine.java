package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
@Data
@Entity
@Table(name = "SPUNLACE_BMR_05_ANNEXURE_LINES", schema=AppConstants.schema)
public class BMR05AnnexureListLine extends UserDateAudit{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ANNEXURE_ID")
	private Long annexureId;
	
	
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "EQUIPMENT_NAME")
	private String equipmentName;
	
	@Column(name = "EQUIPMENT_CODE")
	private String equipmentCode;
	
	@Column(name = "CALIBRATION_DATE")
	private String calibrationDate;
	
	@Column(name = "DUE_DATE")
	private String dueDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID", insertable = false, updatable = false)
	@JsonIgnore
	private BMR05AnnexureList bmrAnnexurRecords05;

	
}
