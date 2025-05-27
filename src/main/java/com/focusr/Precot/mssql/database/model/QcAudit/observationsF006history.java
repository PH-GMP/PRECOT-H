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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;
@Table(name = "OBSERVATIONS_F006_HISTORY", schema = AppConstants.schema)
@Entity
@Data
public class observationsF006history extends UserDateAudit{
	


	@Id
	@Column(name = "OBS_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long obs_id;
	
	@Column(name = "TEST_ID")
	private Long test_id;
	
	@Column(name = "OBSERVATION")
	private String observation;
	
	@Column (name = "REMARKS")
	private String remarks;
	
    @Column(name = "IDENTIFICATION_OBS")
    private String identification_obs;

    @Column(name = "IDENTIFICATION_RMK")
    private String identification_rmk;

    // 3. Fibre Average Length (mm.) (manual)
    @Column(name = "FIBRE_AVERAGE_LENGTH_OBS")
    private String fibre_average_length_obs;

    @Column(name = "FIBRE_AVERAGE_LENGTH_RMK")
    private String fibre_average_length_rmk;

    // 4. Acidity / Alkalinity (pH)
    @Column(name = "ACIDITY_PH_OBS")
    private String acidity_ph_obs;

    @Column(name = "ACIDITY_PH_RMK")
    private String acidity_ph_rmk;

    // 5. Surface Activitive Substances (S.A)
    @Column(name = "SURFACE_ACTIV_SUB_OBS")
    private String surface_activ_sub_obs;

    @Column(name = "SURFACE_ACTIV_SUB_RMK")
    private String surface_activ_sub_rmk;

    // 6. Foreign Fibers (Under Microscope)
    @Column(name = "FOREIGN_FIBERS_OBS")
    private String foreign_fibers_obs;

    @Column(name = "FOREIGN_FIBERS_RMK")
    private String foreign_fibers_rmk;

    // 7. Fluorescence (Under UV)
    @Column(name = "FLUORESCENCE_OBS")
    private String fluorescence_obs;

    @Column(name = "FLUORESCENCE_RMK")
    private String fluorescence_rmk;

    // 8. Neps
    @Column(name = "NEPS_OBS")
    private String neps_obs;

    @Column(name = "NEPS_RMK")
    private String neps_rmk;

    // 9. Neps count/gram
    @Column(name = "NEPS_COUNT_OBS")
    private String neps_count_obs;

    @Column(name = "NEPS_COUNT_RMK")
    private String neps_count_rmk;

    // Upper Quartile Length.mm by wt. - UQL (w)
    @Column(name = "UQL_W_OBS")
    private String uql_w_obs;

    @Column(name = "UQL_W_RMK")
    private String uql_w_rmk;

    // Length by number. mm L(n)
    @Column(name = "LN_OBS")
    private String ln_obs;

    @Column(name = "LN_RMK")
    private String ln_rmk;

    // Length by weight. mm L(w)
    @Column(name = "LW_OBS")
    private String lw_obs;

    @Column(name = "LW_RMK")
    private String lw_rmk;

    // Short fiber Content by number % SFC(n)
    @Column(name = "SFC_N_OBS")
    private String sfc_n_obs;

    @Column(name = "SFC_N_RMK")
    private String sfc_n_rmk;

    // Short fiber Content by wt. % SFC(w)
    @Column(name = "SFC_W_OBS")
    private String sfc_w_obs;

    @Column(name = "SFC_W_RMK")
    private String sfc_w_rmk;

    // 10. Micronaire Value. µg/inch
    @Column(name = "MICRONAIRE_OBS")
    private String micronaire_obs;

    @Column(name = "MICRONAIRE_RMK")
    private String micronaire_rmk;

    // 11. Whiteness Indices (Berger 10deg/D65)
    @Column(name = "WHITENESS_OBS")
    private String whiteness_obs;

    @Column(name = "WHITENESS_RMK")
    private String whiteness_rmk;

    // 12. Extractable Colouring Matters
    @Column(name = "EXTRACTABLE_OBS")
    private String extractable_obs;

    @Column(name = "EXTRACTABLE_RMK")
    private String extractable_rmk;
    
    @Column(name = "SULPHATED_OBS")
	private String sulphatedFlWtObr;

	@Column(name = "SULPHATED_WT")
	private String sulphatedIlWtObr;

	@Column(name = "SULPHATED_AVG")
	private String sulphatedBaObr;

	@Column(name = "SULPHATED_RES")
	private String sulphatedResObr;

	@Column(name = "SULPHATE_RMK")
	private String sulphate_rmk;

	// 13. Water Soluble Substances (%)
	@Column(name = "WATER_SOLUBLE_OBS")
	private String watersolubleFlWtObr;

	@Column(name = "WATER_SOLUBLE_WT")
	private String watersolubleIlWtObr;

	@Column(name = "WATER_SOLUBLE_AVG")
	private String watersolubleNmObr;

	@Column(name = "WATER_SOLUBLE_RES")
	private String watersolubleResObr;

	@Column(name = "WATER_SOLUBLE_RMK")
	private String water_soluble_rmk;

	// 14. Ether Soluble Extract (%)
	@Column(name = "ETHER_SOLUBLE_OBS")
	private String ethersolubleFlWtObr;

	@Column(name = "ETHER_SOLUBLE_WT")
	private String ethersolubleIlWtObr;

	@Column(name = "ETHER_SOLUBLE_AVG")
	private String ethersolubleYxObr;

	@Column(name = "ETHER_SOLUBLE_RES")
	private String ethersolubleResObr;

	@Column(name = "ETHER_SOLUBLE_RMK")
	private String ether_soluble_rmk;

	@Column(name = "ABS_1")
	private String abs_1;

	@Column(name = "ABS_2")
	private String abs_2;

	@Column(name = "ABS_3")
	private String abs_3;
	
	@Column(name = "ABS_4")
	private String abs_4;

	@Column(name = "ABS_5")
	private String abs_5;

	@Column(name = "ABS_6")
	private String abs_6;

	@Column(name = "ABS_AVG")
	private String abs_avg;
	
	@Column(name = "ABS_AVG_2")
	private String abs_avg_2;
	
	@Column(name = "ABS_RMK")
	private String abs_rmk;
	
	@Column(name = "ABS2_RMK")
	private String abs2_rmk;
	
	@Column(name = "MOISTURE_FINALWT")
	private String moistureFlWtObr;

	@Column(name = "MOISTURE_INITIALWT")
	private String moistureIlWtObr;

	@Column(name = "MOISTURE_K_L")
	private String moistureKlObr;

	@Column(name = "MOISTURE_RESULTS")
	private String moistureResultsObr;

	@Column(name = "MOISTURE_RMK")
	private String moisture_rmk;
	
	@Column(name = "PRODUCT_DESCRIPTION")
	private String product_description;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TEST_ID", insertable = false, updatable = false)
	@JsonIgnore
	private finishedproductanalysisreporthistory finishedproductanalysisreportF006;
	
}
