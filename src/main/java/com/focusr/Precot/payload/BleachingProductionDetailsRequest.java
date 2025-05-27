package com.focusr.Precot.payload;

import java.util.List;

public class BleachingProductionDetailsRequest {

	List<BleachingProductionDetailsResponse> bleachProductionDetailsResponses;
	
	String verifiedBy;
	
	String reviewedBy;

	public List<BleachingProductionDetailsResponse> getBleachProductionDetailsResponses() {
		return bleachProductionDetailsResponses;
	}

	public void setBleachProductionDetailsResponses(
			List<BleachingProductionDetailsResponse> bleachProductionDetailsResponses) {
		this.bleachProductionDetailsResponses = bleachProductionDetailsResponses;
	}

	public String getVerifiedBy() {
		return verifiedBy;
	}

	public void setVerifiedBy(String verifiedBy) {
		this.verifiedBy = verifiedBy;
	}

	public String getReviewedBy() {
		return reviewedBy;
	}

	public void setReviewedBy(String reviewedBy) {
		this.reviewedBy = reviewedBy;
	}
	
	
	
}
