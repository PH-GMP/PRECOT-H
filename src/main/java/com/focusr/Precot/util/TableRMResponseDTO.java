package com.focusr.Precot.util;

import com.focusr.Precot.payload.TableRMResponse;

public class TableRMResponseDTO implements TableRMResponse {

    private String batchNo;
    private String supplier;
    private String formattedDate; // Formatted date field

    // Constructor
    public TableRMResponseDTO(String batchNo, String supplier, String formattedDate) {
        this.batchNo = batchNo;
        this.supplier = supplier;
        this.formattedDate = formattedDate;
    }

    // Getters and Setters
    @Override
    public String getbatchNo() {
        return batchNo;
    }

    public void setBatchNo(String batchNo) {
        this.batchNo = batchNo;
    }

    @Override
    public String getsupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    @Override
    public String getDate() {
        return formattedDate; // Return formatted date
    }

    // Setter for formatted date
    public void setFormattedDate(String formattedDate) {
        this.formattedDate = formattedDate;
    }

	@Override
	public String setDate(String s) {
		// TODO Auto-generated method stub
		return null;
	}
}

