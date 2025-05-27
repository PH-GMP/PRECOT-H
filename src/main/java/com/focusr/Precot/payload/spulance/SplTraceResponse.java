package com.focusr.Precot.payload.spulance;



import java.math.BigDecimal;
import java.util.List;

import com.focusr.Precot.mssql.database.model.bleaching.BMR_Summary_Bleach;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummary;

import lombok.Data;

@Data
public class SplTraceResponse {

	List<SplBaleTraceResponse> bleachingData;
	
	List<SplBaleTraceResponse> spulanceData;
	
	String rollNo;
	
	String batchNo;
	
	String date;
	
	String orderNo;
	
	String shaftNo;
	
	String material;
	
	String brand;
	
	String netWeight;
	
	String gsm;
	
	String pattern;
	
	String length;
	
}
