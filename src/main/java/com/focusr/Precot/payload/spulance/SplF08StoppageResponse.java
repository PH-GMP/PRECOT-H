package com.focusr.Precot.payload.spulance;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import lombok.Data;

@Data
public class SplF08StoppageResponse {

	private Long order;
    private String brand;
    private Double netWeight;
    private Map<String, Double> stoppageData;
    
    
    public void StoppageReportResponse(Long order, String brand, Double netWeight) {
        this.order = order;
        this.brand = brand;
        this.netWeight = netWeight;
        this.stoppageData = new HashMap<>();
    }

    public void addStoppageData(String stoppageCategory, Double totalHours) {
        this.stoppageData.put(stoppageCategory, totalHours);
    }
    
	
    
    @Data
    public static class OrderDetails {
        private BigDecimal order;
        private String brand;
        private BigDecimal netWeight;
        private Map<String, BigDecimal> stoppageData;

        public OrderDetails(BigDecimal order, String brand, BigDecimal netWeight) {
            this.order = order;
            this.brand = brand;
            this.netWeight = netWeight;
            this.stoppageData = new HashMap<>();
        }
        
        
        

        public void addStoppageData(String stoppageCategory, BigDecimal totalHours) {
            this.stoppageData.put(stoppageCategory, totalHours);
        }

		

		public String getBrand() {
			return brand;
		}

		public void setBrand(String brand) {
			this.brand = brand;
		}

		public BigDecimal getNetWeight() {
			return netWeight;
		}

		public void setNetWeight(BigDecimal netWeight) {
			this.netWeight = netWeight;
		}

		




		public OrderDetails(BigDecimal order) {
			super();
			this.order = order;
		}
        
    }
        
    
    
}
