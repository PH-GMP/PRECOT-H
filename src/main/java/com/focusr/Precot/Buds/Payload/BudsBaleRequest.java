package com.focusr.Precot.Buds.Payload;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class BudsBaleRequest {

	String bale;
	
	BigDecimal netWt;
	
	List<String> batchNo;
	
	String bmr;
	
	String laydown;
	
	List<String>rmBatch;
	
}
