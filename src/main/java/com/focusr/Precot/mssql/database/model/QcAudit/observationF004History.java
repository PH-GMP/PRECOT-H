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

@Table(name = "OBSERVATIONS_F004_HISTORY", schema = AppConstants.schema)
@Entity
@Data
public class observationF004History extends UserDateAudit{


	@Id
	@Column(name = "OBS_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long obs_id;
	
	@Column(name = "TEST_ID")
	private Long test_id;
	
	@Column(name = "OBR")	
	private String obr;
	
	@Column (name = "REMARKS")
	private String remarks;
	
	// 1. Identification Test [with 66 % Sulfuric acid]
	@Column(name = "IDE_TEST_1")
	private String ide_test_1;

	@Column(name = "IDE_TEST_2")
	private String ide_test_2;

	@Column(name = "IDE_TEST_3")
	private String ide_test_3;

	@Column(name = "IDE_TEST_4")
	private String ide_test_4;

	@Column(name = "IDE_TEST_5")
	private String ide_test_5;

	@Column(name = "IDE_TEST_6")
	private String ide_test_6;

	@Column(name = "IDE_TEST_7")
	private String ide_test_7;

	@Column(name = "IDE_TEST_8")
	private String ide_test_8;

	@Column(name = "IDE_TEST_9")
	private String ide_test_9;

	@Column(name = "IDE_TEST_10")
	private String ide_test_10;
	
	@Column(name = "IDE_TEST_RMK")
	private String ide_test_rmk;

	// 2. Width Of Fabric
	@Column(name = "WID_FAB_1")
	private String wid_fab_1;

	@Column(name = "WID_FAB_2")
	private String wid_fab_2;

	@Column(name = "WID_FAB_3")
	private String wid_fab_3;

	@Column(name = "WID_FAB_4")
	private String wid_fab_4;

	@Column(name = "WID_FAB_5")
	private String wid_fab_5;

	@Column(name = "WID_FAB_6")
	private String wid_fab_6;

	@Column(name = "WID_FAB_7")
	private String wid_fab_7;

	@Column(name = "WID_FAB_8")
	private String wid_fab_8;

	@Column(name = "WID_FAB_9")
	private String wid_fab_9;

	@Column(name = "WID_FAB_10")
	private String wid_fab_10;
	
	@Column(name = "WID_CAL")
	private String wid_fab_cal;
	
	@Column(name = "WID_RMK")
	private String wid_rmk;

	// 3. GSM
	@Column(name = "GSM_1")
	private String gsm_1;

	@Column(name = "GSM_2")
	private String gsm_2;

	@Column(name = "GSM_3")
	private String gsm_3;

	@Column(name = "GSM_4")
	private String gsm_4;

	@Column(name = "GSM_5")
	private String gsm_5;

	@Column(name = "GSM_6")
	private String gsm_6;

	@Column(name = "GSM_7")
	private String gsm_7;

	@Column(name = "GSM_8")
	private String gsm_8;

	@Column(name = "GSM_9")
	private String gsm_9;

	@Column(name = "GSM_10")
	private String gsm_10;
	
	@Column(name = "GSM_CAL")
	private String gsm_cal;
	
	@Column(name = "GSM_RMK")
	private String gsm_rmk;

	// 4. Thickness (mm)
	@Column(name = "THK_MM_1")
	private String thk_mm_1;

	@Column(name = "THK_MM_2")
	private String thk_mm_2;

	@Column(name = "THK_MM_3")
	private String thk_mm_3;

	@Column(name = "THK_MM_4")
	private String thk_mm_4;

	@Column(name = "THK_MM_5")
	private String thk_mm_5;

	@Column(name = "THK_MM_6")
	private String thk_mm_6;

	@Column(name = "THK_MM_7")
	private String thk_mm_7;

	@Column(name = "THK_MM_8")
	private String thk_mm_8;

	@Column(name = "THK_MM_9")
	private String thk_mm_9;

	@Column(name = "THK_MM_10")
	private String thk_mm_10;
	
	@Column(name = "THK_CAL")
	private String thk_cal;
	
	@Column(name = "THK_RMK")
	private String thk_rmk;
	
	// 5. No. of ply of thread
	@Column(name = "PLY_OBS")
	private String ply_obs;

	@Column(name = "PLY_REMARK")
	private String ply_remark;

	// 6. Whiteness Indices [Berger 10deg/D65]
	@Column(name = "WHITENESS_OBS")
	private String whiteness_obs;

	@Column(name = "WHITENESS_REMARK")
	private String whiteness_remark;

	// 7. Fluorescence [Under UV]
	@Column(name = "FLUORESCENCE_OBS")
	private String fluorescence_obs;

	@Column(name = "FLUORESCENCE_REMARK")
	private String fluorescence_remark;

	// 8. pH
	@Column(name = "PH_OBS")
	private String ph_obs;

	@Column(name = "PH_REMARK")
	private String ph_remark;

	// 9. Presence of Starch
	@Column(name = "STARCH_OBS")
	private String starch_obs;

	@Column(name = "STARCH_REMARK")
	private String starch_remark;

	// 10. Absorbency (g/g)
	@Column(name = "ABSORBENCY_OBS")
	private String absorbency_obs;

	@Column(name = "ABSORBENCY_REMARK")
	private String absorbency_remark;

	// 11. Sinking Time (Sec)
	@Column(name = "SINKING_TIME_OBS")
	private String sinking_time_obs;

	@Column(name = "SINKING_TIME_REMARK")
	private String sinking_time_remark;

	// 12. Sulphate Ash content (%)
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

	// 15. Moisture content (%)
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
	
	@Column(name = "FINAL_REMARK")
	private String final_remark;

	@Column(name = "LOT_STATUS")
	private String lot_status;
	
	@Column(name = "ACCEPT_QTY")
	private String accept_qty;

	@Column(name = "REJ_QTY")
	private String rej_qty;
	
	@Column(name = "IDE_TEST_AVG")
	private String ide_test_avg;



	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TEST_ID", insertable = false, updatable = false)
	@JsonIgnore
	private exfoliatingfabricanalysisreportHistory exfoliatingfabricanalysisreporthistory;
	
	
	

}
