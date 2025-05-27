package com.focusr.Precot.payload;

import java.math.BigDecimal;
import java.util.List;

public class BmrSummaryRawCottonResponse {

	List<RawCottonIssueResponse> issueResponse;
	
	BigDecimal totalBales;
	
	BigDecimal totalWeight;

	public BigDecimal getTotalWeight() {
		return totalWeight;
	}

	public void setTotalWeight(BigDecimal totalWeight) {
		this.totalWeight = totalWeight;
	}

	public List<RawCottonIssueResponse> getIssueResponse() {
		return issueResponse;
	}

	public void setIssueResponse(List<RawCottonIssueResponse> issueResponse) {
		this.issueResponse = issueResponse;
	}

	public BigDecimal getTotalBales() {
		return totalBales;
	}

	public void setTotalBales(BigDecimal totalBales) {
		this.totalBales = totalBales;
	}
	
	
	
}
