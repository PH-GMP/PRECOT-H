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
@Table(name = "SPUNLACE_DAILY_PROD_PLAN_HISTORY_F010", schema = AppConstants.schema)
public class DailyProdPlanHistoryF010 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PROD_ID")
	private Long prodId;
	
	@Column(name = "ORDER_NO")
	private String orderNo;
	
	@Column(name = "PRODUCT_NAME")
	private String prodName;
	
	@Column(name = "MIXING")
	private String mixing;
	
	@Column(name = "PLANNED_PROD_KG")
	private String plannedProdKG;
	
	@Column(name = "GSM")
	private String gsm;
	
	@Column(name = "WIDTH")
	private String width;
	
	@Column(name = "THICKNESS")
	private String thickness;
	
	@Column(name = "MOISTURE")
	private String moisture;
	
	@Column(name = "PATTERN")
	private String pattern;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "PLAN_ID")
	private Long planId;

}
