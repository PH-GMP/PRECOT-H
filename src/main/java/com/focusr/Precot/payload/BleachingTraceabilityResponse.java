package com.focusr.Precot.payload;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.focusr.Precot.mssql.database.model.bleaching.BMR_Summary_Bleach;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummary;

import lombok.Data;

@Data
public class BleachingTraceabilityResponse {

	String bmrNumber;
	
	String laydownNumber;
	
	String batchNumber;
	
	List<String> baleNumber;
	
	String orderNumber;
	
	String batchWeight;
	
	List<Date> date;
	
	List<String> supplier;
	
	List<String> phBatchNumber;
	
	BigDecimal weight;
	
	List<BmrSummary> summaryBleach;
	
}
