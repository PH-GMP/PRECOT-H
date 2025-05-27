package com.focusr.Precot.util.drygoods;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class GoodsAbCons {
	
	String bale;
	
	BigDecimal newWt;
	
	List<String> batchNo;
	
	String bmr;
	
	String laydown;
	
	List<String>rmBatch;
	
	

}
