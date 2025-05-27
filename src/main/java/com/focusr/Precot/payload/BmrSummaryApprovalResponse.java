package com.focusr.Precot.payload;

import java.util.List;

import com.focusr.Precot.mssql.database.model.bleaching.BMRProcessDeviationRecord;
import com.focusr.Precot.mssql.database.model.bleaching.BMR_ManufacturingSteps;
import com.focusr.Precot.mssql.database.model.bleaching.BMR_ProcessDelayEqupment;
import com.focusr.Precot.mssql.database.model.bleaching.BMR_Summary_Bleach;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrAnnexureList;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrCompletionTable;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummary;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummaryProductionDetails;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummaryRecordVerification;

public class BmrSummaryApprovalResponse {
	
	List<BleachingProductionDetailsRequest> productionDetailsResponses;
	
	List<BmrSummaryProductionDetails> productionDetails;
	
	List<BmrSummaryRawCottonResponse> rawCottonResponse;

	List<BmrSummary> bmrSummary;
	
	List<BleachBmrAnnexureList> annexureBleachBmrAnnexureLists;
	
//	List<BMRProductionDetailsResponse> productionDetails;
	
	BmrSummaryRecordVerification summaryRecordVerificationList;
	
	List<BMR_ManufacturingSteps> manufacturingStepsList;
	
	List<BMR_Summary_Bleach> manufacturingOperationsList;
	
	ProductReconInterface productionReconillation;
	
	List<BMR_ProcessDelayEqupment> shoppageDetailsList;
	
	List<BMRProcessDeviationRecord> processDeviationRecords;
	
	List<BleachBmrCompletionTable> bmrCompletionTable;

//	public List<BMRProductionDetailsResponse> getProductionDetails() {
//		return productionDetails;
//	}
//
//	public void setProductionDetails(List<BMRProductionDetailsResponse> productionDetails) {
//		this.productionDetails = productionDetails;
//	}

	public List<BmrSummary> getBmrSummary() {
		return bmrSummary;
	}

	public List<BmrSummaryRawCottonResponse> getRawCottonResponse() {
		return rawCottonResponse;
	}



	public void setRawCottonResponse(List<BmrSummaryRawCottonResponse> rawCottonResponse) {
		this.rawCottonResponse = rawCottonResponse;
	}



	public void setBmrSummary(List<BmrSummary> bmrSummary) {
		this.bmrSummary = bmrSummary;
	}

	public BmrSummaryRecordVerification getSummaryRecordVerificationList() {
		return summaryRecordVerificationList;
	}

	public void setSummaryRecordVerificationList(BmrSummaryRecordVerification summaryRecordVerificationList) {
		this.summaryRecordVerificationList = summaryRecordVerificationList;
	}

	public List<BMR_Summary_Bleach> getManufacturingOperationsList() {
		return manufacturingOperationsList;
	}

	public void setManufacturingOperationsList(List<BMR_Summary_Bleach> manufacturingOperationsList) {
		this.manufacturingOperationsList = manufacturingOperationsList;
	}

	public List<BMR_ManufacturingSteps> getManufacturingStepsList() {
		return manufacturingStepsList;
	}

	public void setManufacturingStepsList(List<BMR_ManufacturingSteps> manufacturingStepsList) {
		this.manufacturingStepsList = manufacturingStepsList;
	}

	public List<BleachBmrCompletionTable> getBmrCompletionTable() {
		return bmrCompletionTable;
	}

	public void setBmrCompletionTable(List<BleachBmrCompletionTable> bmrCompletionTable) {
		this.bmrCompletionTable = bmrCompletionTable;
	}

	public List<BleachingProductionDetailsRequest> getProductionDetailsResponses() {
		return productionDetailsResponses;
	}

	public void setProductionDetailsResponses(List<BleachingProductionDetailsRequest> productionDetailsResponses) {
		this.productionDetailsResponses = productionDetailsResponses;
	}

	public ProductReconInterface getProductionReconillation() {
		return productionReconillation;
	}

	public void setProductionReconillation(ProductReconInterface productionReconillation) {
		this.productionReconillation = productionReconillation;
	}

	

	public List<BMR_ProcessDelayEqupment> getShoppageDetailsList() {
		return shoppageDetailsList;
	}

	public void setShoppageDetailsList(List<BMR_ProcessDelayEqupment> shoppageDetailsList) {
		this.shoppageDetailsList = shoppageDetailsList;
	}

	public List<BMRProcessDeviationRecord> getProcessDeviationRecords() {
		return processDeviationRecords;
	}

	public void setProcessDeviationRecords(List<BMRProcessDeviationRecord> processDeviationRecords) {
		this.processDeviationRecords = processDeviationRecords;
	}

	public List<BleachBmrAnnexureList> getAnnexureBleachBmrAnnexureLists() {
		return annexureBleachBmrAnnexureLists;
	}

	public void setAnnexureBleachBmrAnnexureLists(List<BleachBmrAnnexureList> annexureBleachBmrAnnexureLists) {
		this.annexureBleachBmrAnnexureLists = annexureBleachBmrAnnexureLists;
	}

	public List<BmrSummaryProductionDetails> getProductionDetails() {
		return productionDetails;
	}

	public void setProductionDetails(List<BmrSummaryProductionDetails> productionDetails) {
		this.productionDetails = productionDetails;
	}
	
}
