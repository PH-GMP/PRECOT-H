package com.focusr.Precot.payload.padpunching;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;

@Data
public class DailyProductionDetailsBmrResponse {

	private Date packdate;
	
	private BigDecimal shiftId;
	
	private String julianday;
	
	private String machine;
	
	private String orderNo;
	
	private BigDecimal ncb;
	
	private BigDecimal noc;
	
	private BigDecimal bags;
	
	private String poNumber;
	
	private String material;
	
}
