package com.focusr.Precot.payload;

import java.math.BigDecimal;

public class ProductReconInterface {
 
	BigDecimal inputQuantity;
	
	BigDecimal outputQuantity;
	
	BigDecimal yieldQuantity;

	public BigDecimal getInputQuantity() {
		return inputQuantity;
	}

	public void setInputQuantity(BigDecimal inputQuantity) {
		this.inputQuantity = inputQuantity;
	}

	public BigDecimal getOutputQuantity() {
		return outputQuantity;
	}

	public void setOutputQuantity(BigDecimal outputQuantity) {
		this.outputQuantity = outputQuantity;
	}

	public BigDecimal getYieldQuantity() {
		return yieldQuantity;
	}

	public void setYieldQuantity(BigDecimal yieldQuantity) {
		this.yieldQuantity = yieldQuantity;
	}
	
	
}


