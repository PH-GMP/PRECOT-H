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
@Table(name = "SPUNLACE_SANITIZATION_OF_MACHINES_AND_SURFACES_F024", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "MONTH", "YEAR", "WEEK" }) })
public class SanitizationOfMachineAndSurfacesF024 extends SpunlaceSaveSumbitSupervisor{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SMS_ID")
	private Long smsId;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "FREQUENCY")
	private String frequency;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "WEEK")
	private String week;
	
	@Column(name = "WEEK_AND_DATE")
	private String weekAndDate;
	
	@OneToMany(targetEntity = SpunlaceSmsActivitiesF024.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "SMS_ID", referencedColumnName = "SMS_ID")
	private List<SpunlaceSmsActivitiesF024> activites;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "SANITIZED_BY")
	private String sanitized_by;

	@Column(name = "REASON")
	private String reason;
}
