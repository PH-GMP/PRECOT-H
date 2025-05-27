package com.focusr.Precot.Buds.Payload;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class BudsOrderInfoResponse {

	    private Integer saleOrder;
	    private Integer soItem;
	    private String pOrder;
	    private BigDecimal qty;
	    private Integer bags;
	    private String poNo;
	    private String material;
	    private String prodDesc;

}
