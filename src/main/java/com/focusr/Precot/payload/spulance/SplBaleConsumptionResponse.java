package com.focusr.Precot.payload.spulance;

import java.math.BigDecimal;
import java.util.List;

public class SplBaleConsumptionResponse {

	String baleNo;
	
	String netWeight;
	
	List<BigDecimal> batchNo;

	public String getBaleNo() {
		return baleNo;
	}

	public void setBaleNo(String baleNo) {
		this.baleNo = baleNo;
	}

	public String getNetWeight() {
		return netWeight;
	}

	public void setNetWeight(String netWeight) {
		this.netWeight = netWeight;
	}

	public List<BigDecimal> getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(List<BigDecimal> batchNo) {
		this.batchNo = batchNo;
	}

	
	
	
}
