package com.focusr.Precot.payload.padpunching;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class PadPunchingTraceSpulanceDataResponse {

	private String rollNo;
	
	private Date prodDate;
	
	private BigDecimal netWeight;
	
	private BigDecimal shift;
	
	private String shaftNo;
	
}
