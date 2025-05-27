package com.focusr.Precot.payload.spulance;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SplSapResponse1 {

	BigDecimal weight;
	
	String brand;
	
	String order;
	
	BigDecimal shiftId;
	
//	List<SplStoppageWeightResponse> response;
	
//	List<Map<String, List<SplStoppageWeightResponse>>> response;
	Map<String, List<SplStoppageWeightResponse>> response;
	
}
