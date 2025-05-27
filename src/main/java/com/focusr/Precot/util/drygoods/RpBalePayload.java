package com.focusr.Precot.util.drygoods;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class RpBalePayload {
	
	String baleNo;
	
	BigDecimal netWt;
	
	String bmrNo;
	
	String mixing;

}
