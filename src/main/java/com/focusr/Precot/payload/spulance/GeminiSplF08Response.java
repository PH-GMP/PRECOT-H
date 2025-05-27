package com.focusr.Precot.payload.spulance;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class GeminiSplF08Response {

	private String pOrder1;
    private String pOrder2;
    private String pOrder3;
    private BigDecimal netWeight;
    private String brand;
    private String stoppageCategory;
    private BigDecimal totalHours;
	
}
