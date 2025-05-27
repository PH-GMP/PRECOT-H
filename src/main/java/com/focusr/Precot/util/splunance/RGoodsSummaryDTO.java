package com.focusr.Precot.util.splunance;

import java.math.BigDecimal;

public interface RGoodsSummaryDTO {

	String getProductDescription(); 
    String getWidthInMm();        
    String getMixing();             
    Integer getNoOfShaft();         
    BigDecimal getBatchQuantity();
    Double getNoOfRollsShaft();     
    String getInHouseExport();      
	
}
