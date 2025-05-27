package com.focusr.Precot.payload.padpunching;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;

@Data
public class PadPunchingStoppageResponse {

//	private String packdate;
	
	private Date packdate;
	
	private BigDecimal shift;
	
	private String type;
	
	private String machine;
	
	private String fromTime;
	
	private String toTime;
	
	private BigDecimal totalTime;
	
	private String remarks;
	
}
