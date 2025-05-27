package com.focusr.Precot.payload.padpunching;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Map;

import lombok.Data;

@Data
public class PunchingBmrProductionDetailsResponse {
	private BigDecimal saleOrder;
	private BigDecimal saleOrderItem;
	private BigDecimal quantity; // Assuming this is a numeric value
	private String orderNumber;
	private BigDecimal bags; // Assuming this is an integer
	private String material;
	private String productionDescription;
	private String productCode;
	private String poNumber;
	private BigDecimal bagWeight; // Assuming this is a numeric value
	
	// OTHER FIELDS
	private BigDecimal boxQuantity;
	private BigDecimal bagPackQty;
	private BigDecimal boxPackQty;
	private String bagPackDate;
	private String boxPackDate;
}
