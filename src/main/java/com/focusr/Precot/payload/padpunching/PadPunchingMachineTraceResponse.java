package com.focusr.Precot.payload.padpunching;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class PadPunchingMachineTraceResponse {

	private String machine;
	
	private BigDecimal bagPackQty;
	
	private BigDecimal boxPackQty;
	
	private String rollNo;
	
	private String prodDate;
	
	private BigDecimal shiftId;
	
	private String shaftNo;
	
	private BigDecimal netWeight;
}
