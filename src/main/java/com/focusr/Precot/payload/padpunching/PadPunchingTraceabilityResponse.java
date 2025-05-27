package com.focusr.Precot.payload.padpunching;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class PadPunchingTraceabilityResponse {

	private List<String> batchNos;
	
	private String customerPoNumber;
	
	private BigDecimal saleOrder;
	
	private BigDecimal saleOrderItem;
	
	private String orderNo;
	
	private String material;
	
	private String productCode;
	
	private String productDesc;
	
	private String category;
	
	private String subCategory;
	
	private int year;
	
	private int julianDate;
	
	private int shiftId;
	
	private String gsm;
	
	private String pattern;
	
	private String edge;
	
	private List<PadPunchingMachineTraceResponse> machineResponse;
	
}
