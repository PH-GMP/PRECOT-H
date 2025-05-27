package com.focusr.Precot.mssql.database.model.drygoods;

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
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_MANPOWER_DETAILS", schema = AppConstants.schema)
public class LogBookManPowerDetails {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "LOG_ID")
	private Long log_id;
	
	@Column(name = "CATEGORY")
	private String category;

	@Column(name = "ON_PAY_ROLL")
	private String on_pay_roll;

	@Column(name = "PRESENT")
	private String present;

	@Column(name = "LEAVE")
	private String leave;

	@Column(name = "ABSENT")
	private String absent;

//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "LOG_ID", insertable = false, updatable = false)
//	@JsonIgnore
//	private LogBookHeader manpower;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LOG_ID",referencedColumnName = "LOG_ID", insertable = false, updatable = false)
	@JsonIgnore
	private LogBookHeader manpower;

}
