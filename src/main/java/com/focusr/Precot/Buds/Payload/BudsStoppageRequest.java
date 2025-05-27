package com.focusr.Precot.Buds.Payload;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;

@Data
public class BudsStoppageRequest {

	private Date packDate;
	
	private BigDecimal shiftId;
	
	private String type;
	
	private String machine;
	
	private String fromTime;
	
	private String toTime;
	
	private String reason;
	
	private BigDecimal totalHours;
	
}
