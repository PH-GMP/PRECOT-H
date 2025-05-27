package com.focusr.Precot.payload.spulance;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SplStoppageWeightResponse {

	private String sCause;
    private String sCode;
    private String stoppageCategory;
    private BigDecimal totalHours;
    private Integer stoppageCount;
	
}
