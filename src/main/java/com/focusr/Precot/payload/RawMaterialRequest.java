package com.focusr.Precot.payload;

import java.util.List;

public class RawMaterialRequest {

	List<RawCottonIssueResponse> rawIssueCottonResponse;
	
	String issuedBy;
	
	String recievedBy;

	public List<RawCottonIssueResponse> getRawIssueCottonResponse() {
		return rawIssueCottonResponse;
	}

	public void setRawIssueCottonResponse(List<RawCottonIssueResponse> rawIssueCottonResponse) {
		this.rawIssueCottonResponse = rawIssueCottonResponse;
	}

	public String getIssuedBy() {
		return issuedBy;
	}

	public void setIssuedBy(String issuedBy) {
		this.issuedBy = issuedBy;
	}

	public String getRecievedBy() {
		return recievedBy;
	}

	public void setRecievedBy(String recievedBy) {
		this.recievedBy = recievedBy;
	}

	
	
	
	
}
