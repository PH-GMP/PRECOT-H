package com.focusr.Precot.payload.spulance;



import java.math.BigDecimal;
import java.util.List;

import com.focusr.Precot.mssql.database.model.bleaching.BmrSummary;

import lombok.Data;

@Data
public class SplBaleTraceResponse {

	String baleNo;
	
	String netWeight;
	
	String batchNo;
	
	String bmrNumber;
	
	String laydownNumber;
	
	String orderNumber;
	
	List<String> phNumber;
	
	List<String> supplier;
	
	List<BmrSummary> summaryDetails;
	
}
