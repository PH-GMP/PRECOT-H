package com.focusr.Precot.util.Qc;

import java.sql.Date;

public interface TblsupPayloadChemicalAnalysis {


	String getBatchNo(); 

	String getSuplier();

	String getMat_Dec();

	String getMatDoc();

	  // Adding setter for the ID field
    void setId(Integer id);

    // Adding getter for the ID field (if needed for other use)
    Integer getId();
}
