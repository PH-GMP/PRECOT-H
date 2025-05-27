package com.focusr.Precot.mssql.database.model.QcAudit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Table(name = "QA_qc_OBSERVATION_HISTORY",schema=AppConstants.schema)
@Entity
@Data
public class QAqcObservationsHistory extends UserDateAudit{
	

	
	@Id
	@Column(name = "OBS_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long obs_id;

    @JsonProperty("test_id")
    @Column(name = "TEST_ID")
    private Long test_id;

    @JsonProperty("obr")
    @Column(name = "OBSERVATION")
    private String descriptionObr;

    @JsonProperty("descriptionremark")
    @Column(name = "DESCRIPTIONREMARK")
    private String descriptionremark;

    @JsonProperty("identificationObr")
    @Column(name = "IDENTIFICATION_OBR")
    private String identificationObr;

    @JsonProperty("identificationrmk")
    @Column(name = "IDENTIFICATION_RMK")
    private String identificationrmk;

    @JsonProperty("fibre_obs")
    @Column(name = "FIBRE_OBS")
    private String fibre_obs;

    @JsonProperty("fibre_rmk")
    @Column(name = "FIBRE_RMK")
    private String fibre_rmk;

    @JsonProperty("acid_obs")
    @Column(name = "ACID_OBS")
    private String acid_obs;

    @JsonProperty("ACID_RMK")
    @Column(name = "ACID_RMK")
    private String acid_rmk;

    @JsonProperty("surface_obs")
    @Column(name = "SURFACE_OBS")
    private String surface_obs;

    @JsonProperty("surface_rmk")
    @Column(name = "SURFACE_RMK")
    private String surface_rmk;

    @JsonProperty("Foreign_obs")
    @Column(name = "FOREIGN_OBS")
    private String foreign_obs;

    @JsonProperty("Foreign_rmk")
    @Column(name = "FOREIGN_RMK")
    private String foreign_rmk;

    @JsonProperty("Fluorescence_obs")
    @Column(name = "FLUORESCENCE_OBS")
    private String fluorescence_obs;

    @JsonProperty("Fluorescence_rmk")
    @Column(name = "FLUORESCENCE_RMK")
    private String fluorescence_rmk;

    @JsonProperty("Neps_obs")
    @Column(name = "NEPS_OBS")
    private String neps_obs;

    @JsonProperty("Neps_rmk")
    @Column(name = "NEPS_RMK")
    private String neps_rmk;

    @JsonProperty("Neps_count_obs")
    @Column(name = "NEPS_COUNT_OBS")
    private String neps_count_obs;

    @JsonProperty("Neps_count_rmk")
    @Column(name = "NEPS_COUNT_RMK")
    private String neps_count_rmk;

    @JsonProperty("UQL_w_obs")
    @Column(name = "UQL_W_OBS")
    private String uQL_w_obs;

    @JsonProperty("UQL_w_rmk")
    @Column(name = "UQL_W_RMK")
    private String uQL_w_rmk;

    @JsonProperty("Ln_obs")
    @Column(name = "LN_OBS")
    private String ln_obs;

    @JsonProperty("Ln_rmk")
    @Column(name = "LN_RMK")
    private String ln_rmk;

    @JsonProperty("Lw_obs")
    @Column(name = "LW_OBS")
    private String lw_obs;

    @JsonProperty("Lw_rmk")
    @Column(name = "LW_RMK")
    private String lw_rmk;

    @JsonProperty("SFC_n_obs")
    @Column(name = "SFC_N_OBS")
    private String sFC_n_obs;

    @JsonProperty("SFC_n_rmk")
    @Column(name = "SFC_N_RMK")
    private String sFC_n_rmk;

    @JsonProperty("SFC_w_obs")
    @Column(name = "SFC_W_OBS")
    private String sFC_w_obs;

    @JsonProperty("SFC_w_rmk")
    @Column(name = "SFC_W_RMK")
    private String sFC_w_rmk;

    @JsonProperty("Micronaire_obs")
    @Column(name = "MICRONAIRE_OBS")
    private String micronaire_obs;

    @JsonProperty("Micronaire_rmk")
    @Column(name = "MICRONAIRE_RMK")
    private String micronaire_rmk;

    @JsonProperty("Whiteness_obs")
    @Column(name = "WHITENESS_OBS")
    private String whiteness_obs;

    @JsonProperty("Whiteness_rmk")
    @Column(name = "WHITENESS_RMK")
    private String whiteness_rmk;

    @JsonProperty("Extractable_obs")
    @Column(name = "EXTRACTABLE_OBS")
    private String extractable_obs;

    @JsonProperty("Extractable_rmk")
    @Column(name = "EXTRACTABLE_RMK")
    private String extractable_rmk;

    @JsonProperty("abs_1")
    @Column(name = "ABS_1")
    private String abs_1;

    @JsonProperty("abs_2")
    @Column(name = "ABS_2")
    private String abs_2;

    @JsonProperty("abs_3")
    @Column(name = "ABS_3")
    private String abs_3;

    @JsonProperty("abs_4")
    @Column(name = "ABS_4")
    private String abs_4;

    @JsonProperty("abs_5")
    @Column(name = "ABS_5")
    private String abs_5;

    @JsonProperty("abs_6")
    @Column(name = "ABS_6")
    private String abs_6;

    @JsonProperty("abs_avg")
    @Column(name = "ABS_AVG")
    private String abs_avg;

    @JsonProperty("abs_avg_2")
    @Column(name = "ABS_AVG_2")
    private String abs_avg_2;

    @JsonProperty("remark")
    @Column(name = "REMARK")
    private String remark;

    @JsonProperty("sulphatedFlWtObr")
    @Column(name = "SULPHATED_OBS")
    private String sulphatedFlWtObr;

    @JsonProperty("sulphatedIlWtObr")
    @Column(name = "SULPHATED_RMK")
    private String sulphatedIlWtObr;

    @JsonProperty("sulphatedBaObr")
    @Column(name = "SULPHATED_AVG")
    private String sulphatedBaObr;

    @JsonProperty("sulphatedResObr")
    @Column(name = "SULPHATED_RES")
    private String sulphatedResObr;

    @JsonProperty("WatersolubleFlWtObr")
    @Column(name = "WATER_SOLUBLE_OBS")
    private String watersolubleFlWtObr;

    @JsonProperty("WatersolubleIlWtObr")
    @Column(name = "WATER_SOLUBLE_RMK")
    private String watersolubleIlWtObr;

    @JsonProperty("WatersolubleNmObr")
    @Column(name = "WATER_SOLUBLE_AVG")
    private String watersolubleNmObr;

    @JsonProperty("WatersolubleResObr")
    @Column(name = "WATER_SOLUBLE_RES")
    private String watersolubleResObr;

    @JsonProperty("EthersolubleFlWtObr")
    @Column(name = "ETHER_SOLUBLE_OBS")
    private String ethersolubleFlWtObr;

    @JsonProperty("EthersolubleIlWtObr")
    @Column(name = "ETHER_SOLUBLE_RMK")
    private String ethersolubleIlWtObr;

    @JsonProperty("EthersolubleYxObr")
    @Column(name = "ETHER_SOLUBLE_AVG")
    private String ethersolubleYxObr;

    @JsonProperty("EthersolubleResObr")
    @Column(name = "ETHER_SOLUBLE_RES")
    private String ethersolubleResObr;

    @JsonProperty("LossondryingFlWtObr")
    @Column(name = "LOSS_ON_DRYING_OBS")
    private String lossondryingFlWtObr;

    @JsonProperty("LossondryingIlWtObr")
    @Column(name = "LOSS_ON_DRYING_RMK")
    private String lossondryingIlWtObr;

    @JsonProperty("LossondryingKlObr")
    @Column(name = "LOSS_ON_DRYING_AVG")
    private String lossondryingKlObr;

    @JsonProperty("LossondryingResObr")
    @Column(name = "LOSS_ON_DRYING_RES")
    private String lossondryingResObr;

    @JsonProperty("final_remark")
    @Column(name = "FINAL_REMARK")
    private String final_remark;

    @JsonProperty("sub_batch_no")
    @Column(name = "SUB_BATCH_NO")
    private String sub_batch_no;
    
    @JsonProperty("product")
    @Column(name = "PRODUCT")
    private String product;
    
    @JsonProperty("materila_passes")
    @Column(name = "MATERILA_PASSES")
    private String materila_passes;
    
    @JsonProperty("remarks_a")
    @Column(name = "REMARKS_A")
    private String remarks_a;
    
    @JsonProperty("remarks_b")
    @Column(name = "REMARKS_B")
    private String remarks_b;
    
    @JsonProperty("remarks_c")
    @Column(name = "REMARKS_C")
    private String remarks_c;
    
    @JsonProperty("remarks_d")
    @Column(name = "REMARKS_D")
    private String remarks_d;
    
    @JsonProperty("remarks_e")
    @Column(name = "REMARKS_E")
    private String remarks_e;
    
    @JsonProperty("remarks_f")
    @Column(name = "REMARKS_F")
    private String remarks_f;
    
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TEST_ID", insertable = false, updatable = false)
	@JsonIgnore
	private PHYSICALANDCHEMICALTESTHistory physicalandchemicaltest;

	
	
}
