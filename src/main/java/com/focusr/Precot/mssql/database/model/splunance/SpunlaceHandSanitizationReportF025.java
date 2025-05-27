package com.focusr.Precot.mssql.database.model.splunance;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.SpunlaceSaveSumbitSupervisor;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_HAND_SANITIZATION_REPORT_F025", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "SHIFT" }) })
public class SpunlaceHandSanitizationReportF025 extends SpunlaceSaveSumbitSupervisor{
	
	@Id
	@Column(name = "HAND_SANITIZATION_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long handSanitizationId;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;
	
	@Column(name= "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "REVISION_NUMBER")
	private String revisionNo;
	
	@Column(name = "SOP_NUMBER")
	private String sopNumber;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "SHIFT")
	private String shift;
	
	@OneToMany(targetEntity = SpunlaceHandSanitizationListF025.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HAND_SANITIZATION_ID", referencedColumnName = "HAND_SANITIZATION_ID")
	private List<SpunlaceHandSanitizationListF025> sanitizationList;

	@Column(name = "REASON")
	private String reason;
}
