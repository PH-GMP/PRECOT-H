package com.focusr.Precot.util.Qc;

import java.util.Date;
import java.util.List;

import com.focusr.Precot.mssql.database.model.Qc.PhysicalAndChemcalTestARF001;

import lombok.Data;

@Data
public class RawCottonConsolidatePayload {

	private Long id;
//    private String millBatchNo;
    private String formatNo;
    private String revisionNo;
    private String formatName;
    private String refSopNo;
    private String date;
//    private List<PhysicalAndChemcalTestARF001> physicalAndChemicalTests;
//    
//    private String formatNo;
//	private String revisionNo;
//	private String formatName;
//	private String refSopNo;
//	private String date;
	private String bleachingBmrNo;
	private String arNo;
	private String dateOfReceipt;
	private String testedDate;
	private String mbNo;
	private String supplier;
	private String station;
	private String verity; 
	private String invoiceNo;
	private String noOfBale;
	private String quantity;
	private String flourescence;
	private Double whiteness;
	private Double micronaire;
	private Double nepsCount;
	private Double uql;
	private Double lengthByWeightMm;
	private Double lengthByNoMm;
	private Double sfc_w;
	private Double sfc_n;
	private Double ash;
	private Double ess_ext;
	private Double moisture;
	private Double trash;
	private String remark;

    // Getters and Setters
}
