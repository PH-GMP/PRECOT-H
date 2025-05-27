package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "SPUNLACE_DAILY_PROD_PLAN_F010", schema = AppConstants.schema)
public class DailyProdPlanF010 extends UserDateAudit{
	
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

	public DailyProdPlanF010() {
		super();
	}

	public Long getProdId() {
		return prodId;
	}

	public void setProdId(Long prodId) {
		this.prodId = prodId;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getProdName() {
		return prodName;
	}

	public void setProdName(String prodName) {
		this.prodName = prodName;
	}

	public String getMixing() {
		return mixing;
	}

	public void setMixing(String mixing) {
		this.mixing = mixing;
	}

	public String getPlannedProdKG() {
		return plannedProdKG;
	}

	public void setPlannedProdKG(String plannedProdKG) {
		this.plannedProdKG = plannedProdKG;
	}

	public String getGsm() {
		return gsm;
	}

	public void setGsm(String gsm) {
		this.gsm = gsm;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public String getThickness() {
		return thickness;
	}

	public void setThickness(String thickness) {
		this.thickness = thickness;
	}

	public String getMoisture() {
		return moisture;
	}

	public void setMoisture(String moisture) {
		this.moisture = moisture;
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Long getPlanId() {
		return planId;
	}

	public void setPlanId(Long planId) {
		this.planId = planId;
	}

}
