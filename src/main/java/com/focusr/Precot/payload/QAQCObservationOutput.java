package com.focusr.Precot.payload;

import java.util.List;

import javax.persistence.Column;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonProperty;
@Data
public class QAQCObservationOutput {
    @JsonProperty("obs_id")
    private Long obs_id;
    
    @JsonProperty("test_id")
    private Long test_id;

    @JsonProperty("obr")
    private String obr;
    
    @JsonProperty("descriptionObr")
    private String descriptionObr;
    
    @JsonProperty("descriptionremark")
    private String descriptionremark;
    
    @JsonProperty("identificationObr")
    private String identificationObr;
    
    @JsonProperty("identificationrmk")
    private String identificationrmk;
    
    @JsonProperty("fibre_obs")
    private String fibre_obs;
    
    @JsonProperty("fibre_rmk")
    private String fibre_rmk;
    
    @JsonProperty("acid_obs")
    private String acid_obs;
    
    @JsonProperty("ACID_RMK")
    private String ACID_RMK;
    
    @JsonProperty("surface_obs")
    private String surface_obs;
    
    @JsonProperty("surface_rmk")
    private String surface_rmk;
    
    @JsonProperty("Foreign_obs")
    private String Foreign_obs;
    
    @JsonProperty("Foreign_rmk")
    private String Foreign_rmk;
    
    @JsonProperty("Fluorescence_obs")
    private String Fluorescence_obs;
    
    @JsonProperty("Fluorescence_rmk")
    private String Fluorescence_rmk;
    
    @JsonProperty("Neps_obs")
    private String Neps_obs;
    
    @JsonProperty("Neps_rmk")
    private String Neps_rmk;
    
    @JsonProperty("Neps_count_obs")
    private String Neps_count_obs;
    
    @JsonProperty("Neps_count_rmk")
    private String Neps_count_rmk;
    
    @JsonProperty("UQL_w_obs")
    private String UQL_w_obs;
    
    @JsonProperty("UQL_w_rmk")
    private String UQL_w_rmk;
    
    @JsonProperty("Ln_obs")
    private String Ln_obs;
    
    @JsonProperty("Ln_rmk")
    private String Ln_rmk;
    
    @JsonProperty("Lw_obs")
    private String Lw_obs;
    
    @JsonProperty("Lw_rmk")
    private String Lw_rmk;
    
    @JsonProperty("SFC_n_obs")
    private String SFC_n_obs;
    
    @JsonProperty("SFC_n_rmk")
    private String SFC_n_rmk;
    
    @JsonProperty("SFC_w_obs")
    private String SFC_w_obs;
    
    @JsonProperty("SFC_w_rmk")
    private String SFC_w_rmk;
    
    @JsonProperty("Micronaire_obs")
    private String Micronaire_obs;
    
    @JsonProperty("Micronaire_rmk")
    private String Micronaire_rmk;
    
    @JsonProperty("Whiteness_obs")
    private String Whiteness_obs;
    
    @JsonProperty("Whiteness_rmk")
    private String Whiteness_rmk;
    
    @JsonProperty("Extractable_obs")
    private String Extractable_obs;
    
    @JsonProperty("Extractable_rmk")
    private String Extractable_rmk;
    
    @JsonProperty("abs_1")
    private String abs_1;
    
    @JsonProperty("abs_2")
    private String abs_2;
    
    @JsonProperty("abs_3")
    private String abs_3;
    
    @JsonProperty("abs_4")
    private String abs_4;
    
    @JsonProperty("abs_5")
    private String abs_5;
    
    @JsonProperty("abs_6")
    private String abs_6;
    
    @JsonProperty("abs_avg")
    private String abs_avg;
    
    @JsonProperty("abs_avg_2")
    private String abs_avg_2;
    
    @JsonProperty("remark")
    private String remark;
    
    @JsonProperty("sulphatedFlWtObr")
    private String sulphatedFlWtObr;
    
    @JsonProperty("sulphatedIlWtObr")
    private String sulphatedIlWtObr;
    
    @JsonProperty("sulphatedBaObr")
    private String sulphatedBaObr;
    
    @JsonProperty("sulphatedResObr")
    private String sulphatedResObr;
    
    @JsonProperty("WatersolubleFlWtObr")
    private String WatersolubleFlWtObr;
    
    @JsonProperty("WatersolubleIlWtObr")
    private String WatersolubleIlWtObr;
    
    @JsonProperty("WatersolubleNmObr")
    private String WatersolubleNmObr;
    
    @JsonProperty("WatersolubleResObr")
    private String WatersolubleResObr;
    
    @JsonProperty("EthersolubleFlWtObr")
    private String EthersolubleFlWtObr;
    
    @JsonProperty("EthersolubleIlWtObr")
    private String EthersolubleIlWtObr;
    
    @JsonProperty("EthersolubleYxObr")
    private String EthersolubleYxObr;
    
    @JsonProperty("EthersolubleResObr")
    private String EthersolubleResObr;
    
    @JsonProperty("LossondryingFlWtObr")
    private String LossondryingFlWtObr;
    
    @JsonProperty("LossondryingIlWtObr")
    private String LossondryingIlWtObr;
    
    @JsonProperty("LossondryingKlObr")
    private String LossondryingKlObr;
    
    @JsonProperty("LossondryingResObr")
    private String LossondryingResObr;
    
    @JsonProperty("final_remark")
    private String final_remark;
    
    @JsonProperty("sub_batch_no")
    private String sub_batch_no;
    
    @JsonProperty("product")

    private String product;
    
    @JsonProperty("materila_passes")

    private String materila_passes;
    
    @JsonProperty("remarks_a")

    private String remarks_a;
    
    @JsonProperty("remarks_b")
    
    private String remarks_b;
    
    @JsonProperty("remarks_c")
    
    private String remarks_c;
    
    @JsonProperty("remarks_d")
    
    private String remarks_d;
    
    @JsonProperty("remarks_e")
    
    private String remarks_e;
    
    @JsonProperty("remarks_f")
    
    private String remarks_f;

    // Getters and Setters
    // (include your getters and setters here)
}
