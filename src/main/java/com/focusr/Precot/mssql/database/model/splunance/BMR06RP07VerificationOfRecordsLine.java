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
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_BMR_06_RP_07_VERIFICATION_OF_RECORDS_LINE", schema = AppConstants.schema)
public class BMR06RP07VerificationOfRecordsLine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "VERIFICATION_ID")
	private Long verification_id;

	@Column(name = "CHECKED_DATE")
	private String checked_date;

	@Column(name = "CHECKED_TIME")
	private String checked_time;

	@Column(name = "CHECKED_NAME")
	private String checked_name;

	@Column(name = "CHECKED_SIGN")
	private String checked_sign;

	@Column(name = "VERIFIED_DATE")
	private String verified_date;

	@Column(name = "VERIFIED_TIME")
	private String verified_time;

	@Column(name = "VERIFIED_NAME")
	private String verified_name;

	@Column(name = "VERIFIED_SIGN")
	private String verified_sign;

//	@Column(name = "SATISFACTORY")
//	private String satisfactory;
//
//	@Column(name = "NON_SATISFACTORY")
//	private String non_satisfactory;
	
	@Column(name = "DETAILS")
	private String details;

	@Column(name = "OBSERVATION")
	private String observation;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "VERIFICATION_ID", insertable = false, updatable = false)
	@JsonIgnore
	private BMR06RP07VerificationOfRecords bmrDetailRecords06;

}
