package com.focusr.Precot.payload.spulance;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class GeminiF08Approach2 {
	
	private String pOrder1;
    private String pOrder2;
    private String pOrder3;
    private BigDecimal netWeight;
    private String brand;
    private List<StoppageData> stoppageData;
    
    List<Map<String, Object>> stoppage;
    
    
    @Data
    class StoppageData {
        private String stoppageCategory;
        private BigDecimal totalHours;

        // Getters and setters
    }


}

