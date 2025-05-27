package com.focusr.Precot.payload.spulance;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpulanceOrderResponse {

	private String order;
	
	private BigDecimal netWeight;
	
	private String brand;
}
