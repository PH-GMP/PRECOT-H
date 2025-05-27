package com.focusr.Precot.payload.spulance;

import java.util.List;
import java.util.Map;

import com.focusr.Precot.mssql.database.model.splunance.BMR01RP01ProductionDetails;

import lombok.Data;

@Data
public class BMR01ProdDetailsResponse {

	private List<BMR01RP01ProductionDetails> bmr01rp01productiondetails;
	private List<Map<String, Object>> bmr01rp01productiondetailsSap;
	
	//constructor
	public BMR01ProdDetailsResponse(List<BMR01RP01ProductionDetails> bmr01rp01productiondetails,
			List<Map<String, Object>> bmr01rp01productiondetailsSap) {
		super();
		this.bmr01rp01productiondetails = bmr01rp01productiondetails;
		this.bmr01rp01productiondetailsSap = bmr01rp01productiondetailsSap;
	}
	
	
	

	

}
