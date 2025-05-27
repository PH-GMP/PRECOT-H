package com.focusr.Precot.Buds.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BUDS_LOGBOOK_PRODUCTION_LINE", schema = AppConstants.schema)
public class BudsLogbookProductionLine  extends UserDateAudit {

	@Id
	@Column(name = "LINE_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long lineId;
	
	@Column(name = "MACHINE_NAME")
	private String machineName;
	
	@Column(name = "MAN_POWER_ALLOCATION1")
	private String manPowerAllocation1;
	
	@Column(name = "MAN_POWER_ALLOCATION2")
	private String manPowerAllocation2;
	
	@Column(name = "BMR_NUMBER1")
	private String bmrNumber1;
	
	@Column(name = "BMR_NUMBER2")
	private String bmrNumber2; 
	
	@Column(name = "PRODUCT_NAME1")
	private String productaName1;
	
	@Column(name = "PRODUCT_NAME2")
	private String productaName2;
	
	@Column(name = "LOG_ID")
	private Long logId;

	public Long getLineId() {
		return lineId;
	}

	public void setLineId(Long lineId) {
		this.lineId = lineId;
	}

	public String getMachineName() {
		return machineName;
	}

	public void setMachineName(String machineName) {
		this.machineName = machineName;
	}

	public String getManPowerAllocation1() {
		return manPowerAllocation1;
	}

	public void setManPowerAllocation1(String manPowerAllocation1) {
		this.manPowerAllocation1 = manPowerAllocation1;
	}

	public String getManPowerAllocation2() {
		return manPowerAllocation2;
	}

	public void setManPowerAllocation2(String manPowerAllocation2) {
		this.manPowerAllocation2 = manPowerAllocation2;
	}

	public String getBmrNumber1() {
		return bmrNumber1;
	}

	public void setBmrNumber1(String bmrNumber1) {
		this.bmrNumber1 = bmrNumber1;
	}

	public String getBmrNumber2() {
		return bmrNumber2;
	}

	public void setBmrNumber2(String bmrNumber2) {
		this.bmrNumber2 = bmrNumber2;
	}

	public String getProductaName1() {
		return productaName1;
	}

	public void setProductaName1(String productaName1) {
		this.productaName1 = productaName1;
	}

	public String getProductaName2() {
		return productaName2;
	}

	public void setProductaName2(String productaName2) {
		this.productaName2 = productaName2;
	}

	public Long getLogId() {
		return logId;
	}

	public void setLogId(Long logId) {
		this.logId = logId;
	}
	
}
