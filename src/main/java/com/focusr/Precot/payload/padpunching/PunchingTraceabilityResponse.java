package com.focusr.Precot.payload.padpunching;

import java.math.BigDecimal;
import java.util.List;

import com.focusr.Precot.payload.spulance.SplBaleTraceResponse;

import lombok.Data;

@Data
public class PunchingTraceabilityResponse {

	private String manDate;
	
	private int julianDay;
	
	private int packyear;
	
	private int shiftId;
	
	private List<String> orderList;
	
	private List<String> saleOrders;
	
	private List<String> saleOrderItem;
	
	private String productCode;
	
	private List<String> batchNos;
	
	
	// ORDER INFO TABLE
	
	private String customerPO;
	
	private String material;
	
	private String mixDescription;
	
	private BigDecimal gsm;
	
	private String pattern;
	
	private BigDecimal saleOrder;
	
	private BigDecimal soItem;
	
	private String poNumber;
	
	private String orderNo;
	
		// FOR MACHINES 
	
	private List<PadPunchingMachineTraceResponse> machineList;
	
		// FOR ROLL CONSUMPTION
	
	private List<PadPunchingTraceSpulanceDataResponse> rollConsumption;
	
	private List<String> packingMaterialList;
	
	
		// FOR AB RP 
	
	private List<SplBaleTraceResponse> abCottonResponse;
	
	private List<SplBaleTraceResponse> rpCottonResponse;
}
