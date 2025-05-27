package com.focusr.Precot.QA.payload;

import java.util.List;

import lombok.Data;

@Data
public class BmrDetailsRequest {

	private String bmrNumber;
	
	private String startBatch;
	
	private String endBatch;
	
	private String poNumber;
	
	private String quantity;
	
	private String productDescription;
	
	private Double batchQuantity;
	
	private Integer startShaft;
	
	private Integer endShaft;
	
	private String orderNumber;
	
	private String bags;
	
	private String cartons;
	
	private List<AllBMRDetailsProjection> projection;
	
}
