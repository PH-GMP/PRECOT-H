package com.focusr.Precot.Buds.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrManufacturingSteps;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BUDS_DAILY_PRODUCTION_SLIVER_LINE", schema = AppConstants.schema)
public class BudsDailyProductionSliverLine extends UserDateAudit {

	@Column(name = "LINE_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long lineId;
	
		// FOR X 
	
	@Column(name = "SLIVER_CAN_NUMBER_1")
	private String sliverCanNumber1;
	
	@Column(name = "GPM_1")
	private String gpm1;
	
	@Column(name = "CARDING_MC_NO_1")
	private String cardingMachineNumber1;
	
	@Column(name = "NET_WEIGHT_1")
	private String netWeight1;
	
		// FOR Y 
	
	@Column(name = "SLIVER_CAN_NUMBER_2")
	private String sliverCanNumber2;
	
	@Column(name = "GPM_2")
	private String gpm2;
	
	@Column(name = "CARDING_MC_NO_2")
	private String cardingMachineNumber2;
	
	@Column(name = "NET_WEIGHT_2")
	private String netWeight2;
	
	
		// MAPPING 
	
	@Column(name = "ID")
	private Long id;
	
//	@ManyToOne
//    @JoinColumn(name = "ID", nullable = false)
//	@JsonIgnore
//    private BudsDailyProductionSliverHeader sliverProduction;
	
	
		// GETTERS AND SETTTERS

	public Long getLineId() {
		return lineId;
	}

	public void setLineId(Long lineId) {
		this.lineId = lineId;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSliverCanNumber1() {
		return sliverCanNumber1;
	}

	public void setSliverCanNumber1(String sliverCanNumber1) {
		this.sliverCanNumber1 = sliverCanNumber1;
	}

	public String getGpm1() {
		return gpm1;
	}

	public void setGpm1(String gpm1) {
		this.gpm1 = gpm1;
	}

	public String getCardingMachineNumber1() {
		return cardingMachineNumber1;
	}

	public void setCardingMachineNumber1(String cardingMachineNumber1) {
		this.cardingMachineNumber1 = cardingMachineNumber1;
	}

	public String getNetWeight1() {
		return netWeight1;
	}

	public void setNetWeight1(String netWeight1) {
		this.netWeight1 = netWeight1;
	}

	public String getSliverCanNumber2() {
		return sliverCanNumber2;
	}

	public void setSliverCanNumber2(String sliverCanNumber2) {
		this.sliverCanNumber2 = sliverCanNumber2;
	}

	public String getGpm2() {
		return gpm2;
	}

	public void setGpm2(String gpm2) {
		this.gpm2 = gpm2;
	}

	public String getCardingMachineNumber2() {
		return cardingMachineNumber2;
	}

	public void setCardingMachineNumber2(String cardingMachineNumber2) {
		this.cardingMachineNumber2 = cardingMachineNumber2;
	}

	public String getNetWeight2() {
		return netWeight2;
	}

	public void setNetWeight2(String netWeight2) {
		this.netWeight2 = netWeight2;
	}	
	
}
