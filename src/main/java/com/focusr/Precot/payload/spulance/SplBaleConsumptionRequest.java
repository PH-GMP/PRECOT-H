package com.focusr.Precot.payload.spulance;

import java.util.List;

public class SplBaleConsumptionRequest {

	private List<SplBaleConsumptionResponse> rpBaleConsumption;
	
	private List<SplBaleConsumptionResponse> apBaleConsumptionResponse;

	public List<SplBaleConsumptionResponse> getRpBaleConsumption() {
		return rpBaleConsumption;
	}

	public void setRpBaleConsumption(List<SplBaleConsumptionResponse> rpBaleConsumption) {
		this.rpBaleConsumption = rpBaleConsumption;
	}

	public List<SplBaleConsumptionResponse> getApBaleConsumptionResponse() {
		return apBaleConsumptionResponse;
	}

	public void setApBaleConsumptionResponse(List<SplBaleConsumptionResponse> apBaleConsumptionResponse) {
		this.apBaleConsumptionResponse = apBaleConsumptionResponse;
	}
	
	
	
}
