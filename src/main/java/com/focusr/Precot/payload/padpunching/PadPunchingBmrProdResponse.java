package com.focusr.Precot.payload.padpunching;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class PadPunchingBmrProdResponse {

	private String batchNumber;
	
	private String orderNumber;
	
	private String product;
	
	private String edge;
	
	private Integer quantity;
}

