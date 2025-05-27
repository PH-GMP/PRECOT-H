package com.focusr.Precot.payload.spulance;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class StoppageReportResponse {

    private List<OrderDetails> orders;

    @Data
    public static class OrderDetails {
        
        private String productionOrder;
        private BigDecimal netWeight;
        private String brand;
        private List<Map<String, Integer>> stoppageData;  // Changed to single stoppage data
        
        

		public OrderDetails() {
			super();
			// TODO Auto-generated constructor stub
		}



		public OrderDetails(String po, BigDecimal netWeight, String brand,
				ArrayList arrayList) {
			super();
			this.productionOrder = po;
			this.netWeight = netWeight;
			this.brand = brand;
			this.stoppageData = arrayList;
		}



		public OrderDetails(String productionOrder, BigDecimal netWeight, String brand) {
			super();
			this.productionOrder = productionOrder;
			this.netWeight = netWeight;
			this.brand = brand;
		}

        
        
        
    }

//    @Data
//    public static class StoppageData {
//        
//        @JsonProperty("stoppageData")
//        private Map<String, Integer> stoppageTypes;  // Maps stoppage type to count
//        
//        public StoppageData(Map<String, Integer> stoppageTypes) {
//            super();
//            this.stoppageTypes = stoppageTypes;
//        }
//    }
}