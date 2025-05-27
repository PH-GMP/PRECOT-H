package com.focusr.Precot.mssql.database.model.drygoods.audit;

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
import com.focusr.Precot.mssql.database.model.drygoods.LogBookHeader;
import com.focusr.Precot.mssql.database.model.drygoods.LogBookManPowerDetails;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_MANPOWER_DETAILS_HISTORY", schema = AppConstants.schema)
public class LogBookManPowerDetailsHistory {

	@Id
	@Column(name = "LINE_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long line_id;

	@Column(name = "HISTORY_ID")
	private Long history_id;
	
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
	@JoinColumn(name = "HISTORY_ID",referencedColumnName = "HISTORY_ID", insertable = false, updatable = false)
	@JsonIgnore
	private LogBookHeaderHistory manpower;
}
