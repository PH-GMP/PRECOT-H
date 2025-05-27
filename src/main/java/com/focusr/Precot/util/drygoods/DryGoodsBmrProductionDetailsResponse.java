package com.focusr.Precot.util.drygoods;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Map;

import lombok.Data;

@Data
public class DryGoodsBmrProductionDetailsResponse {

	private BigDecimal saleOrder;
	private BigDecimal saleOrderItem;
	private BigDecimal quantity; // Assuming this is a numeric value
	private String orderNumber;
	private BigDecimal bags; // Assuming this is an integer
	private String material;
	private String productionDescription;
	private String poNumber;
	private BigDecimal bagWeight; // Assuming this is a numeric value
	private Map<String, Integer> mapVariable;
	private String batchNo;

}
