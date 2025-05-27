package com.focusr.Precot.payload.spulance;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.focusr.Precot.mssql.database.model.splunance.BMR09RP11ProcessDlyEqupBrkDwnRecord;

import lombok.Data;

@Data
public class BMR09ShopageDetailsResponse {

	List<BMR09RP11ProcessDlyEqupBrkDwnRecord> bmrSummaryDateList;
	List<Map<String, Object>> stoppageMapList = new ArrayList<>();
	
	
	
	//Constructor
	public BMR09ShopageDetailsResponse(List<BMR09RP11ProcessDlyEqupBrkDwnRecord> bmrSummaryDateList,
			List<Map<String, Object>> stoppageMapList) {
		super();
		this.bmrSummaryDateList = bmrSummaryDateList;
		this.stoppageMapList = stoppageMapList;
	}
	
	
	
	

}
