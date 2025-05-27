package com.focusr.Precot.payload;

import java.util.List;

public class BmrSummaryShoppageDetails {

	List<GetStoppageDetailsResponse> shoppageDetails;
	
	String reviewedBy;
	
	String verifiedBy;
	
	String bmr_no;
	
	String startDate;

	String endDate;

	

	

	public List<GetStoppageDetailsResponse> getShoppageDetails() {
		return shoppageDetails;
	}

	public void setShoppageDetails(List<GetStoppageDetailsResponse> shoppageDetails) {
		this.shoppageDetails = shoppageDetails;
	}

	public String getReviewedBy() {
		return reviewedBy;
	}

	public void setReviewedBy(String reviewedBy) {
		this.reviewedBy = reviewedBy;
	}

	public String getVerifiedBy() {
		return verifiedBy;
	}

	public void setVerifiedBy(String verifiedBy) {
		this.verifiedBy = verifiedBy;
	}

	public String getBmr_no() {
		return bmr_no;
	}

	public void setBmr_no(String bmr_no) {
		this.bmr_no = bmr_no;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	
	
	
	
}
