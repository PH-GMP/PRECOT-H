package com.focusr.Precot.payload.qc;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class aboserbentDTO {
	
	
	private String physicalApp;
	
	private String identifiactionTest;
	
	private String remark;
	
	  @JsonProperty("surface_obs")
	    private String surfaceObs;

	    @JsonProperty("acid_obs")
	    private String acidObsph;
	    
	    private String acidRmk;

	    @JsonProperty("fibre_obs")
	    private String fibreObs;

	    @JsonProperty("foreign_obs")
	    private String foreignObs;

	    @JsonProperty("abs_avg")
	    private String sinking_time;

	    @JsonProperty("abs_avg_2")
	    private String absorbency;

	    @JsonProperty("sulphatedResObr")
	    private String sulphatedResObr;

	    @JsonProperty("watersolubleResObr")
	    private String watersolubleResObr;

	    @JsonProperty("ethersolubleResObr")
	    private String ethersolubleResObr;

	    @JsonProperty("neps_count_rmk")
	    private String nepsCountRmk;

	    @JsonProperty("uQL_w_rmk")
	    private String uQLWRmk;

	    @JsonProperty("ln_rmk")
	    private String lnRmk;

	    @JsonProperty("lw_rmk")
	    private String lwRmk;

	    @JsonProperty("sFC_n_obs")
	    private String sFCNObs;

	    @JsonProperty("sFC_w_obs")
	    private String sFCWObs;

	    @JsonProperty("micronaire_obs")
	    private String micronaireObs;

	    @JsonProperty("whiteness_obs")
	    private String whitenessObs;
	    
	    private String totalfungalCount;
	    
	    private String totalViableCount;
	    
	    private String fluronce;
	    
	    private String extractable;
	    
	    private String dryingloss;
	    
	    private String acceptedProduct;
	    
	    private String specification;
	    
	    private String subBatchNo;
	    
	    
}
