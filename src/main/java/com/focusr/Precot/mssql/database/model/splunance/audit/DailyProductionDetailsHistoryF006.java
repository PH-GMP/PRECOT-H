package com.focusr.Precot.mssql.database.model.splunance.audit;

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
@Table(name = "SPUNLACE_DAILY_PRODUCTION_REPORT_DETAILS_HISTORY_F006", schema = AppConstants.schema)
public class DailyProductionDetailsHistoryF006 {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DETAIL_ID")
	private Long detailId;
	
	@Column(name = "SHAFT_NO")
	private String shaftNo;
	
	@Column(name = "ROLL_NO")
	private String rollNo;
	
	@Column(name = "LENGTH")
	private String length;
	
	@Column(name = "WIDTH")
	private String width;
	
	@Column(name = "NET_WT")
	private String netWt;
	
	@Column(name = "ROLL_GSM")
	private String rollGsm;
	
	@Column(name = "MOISTURE")
	private String moisture;
	
	@Column(name = "ROLL_DIA")
	private String rollDia;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "REPORT_ID")
	private Long reportId;
}
