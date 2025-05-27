package com.focusr.Precot.Buds.Payload;

import lombok.Data;

@Data
public class BudsTraceabilitySliverLineDTO {

	private String canNo;
    private String netWeight;
    private String prodDate;
    private String orderNumber;
    private String laydownNumber;
    private String stdWeight;
    
    
	public BudsTraceabilitySliverLineDTO(String canNo, String netWeight, String prodDate, String orderNumber,
			String laydownNumber, String stdWeight) {
		super();
		this.canNo = canNo;
		this.netWeight = netWeight;
		this.prodDate = prodDate;
		this.orderNumber = orderNumber;
		this.laydownNumber = laydownNumber;
		this.stdWeight = stdWeight;
	}
	
}
