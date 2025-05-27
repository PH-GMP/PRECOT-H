package com.focusr.Precot.QA.payload;

import java.util.List;

import lombok.Data;

@Data
public class GrReceiptDetailsDto {
	 // List of suppliers returned in Step 1
    private List<String> suppliers;

    // List of invoices returned in Step 2
    private List<String> invoices;

    // List of material descriptions returned in Step 3
    private List<String> materialDescriptions;

    // Material details object returned in Step 4
    private MaterialDetailsDto materialDetails;
	

}
