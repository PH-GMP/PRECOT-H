package com.focusr.Precot.QA.payload;

import java.util.List;

import com.focusr.Precot.QA.model.InwardInspectionReport;

import lombok.Data;
@Data
public class InwardInspectionDetailsDto {
	 private List<String> suppliers;
	    private List<String> invoices;
	    private List<String> iirNumbers;
	    private List<InwardInspectionReport> inspectionDetails;
}
