package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.payload.spulance.SpunlaceSummerySubmit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_BMR_07_MANUFACTURING_STEPS", schema = AppConstants.schema)
public class BMR07ManufacturingSteps extends SpunlaceSummerySubmit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "FORM_NO")
	private String form_no;

	@Column(name = "STATUS")
	private String status;

	// WBO

	@Column(name = "AB_COTTON")
	private String ab_cotton;

	@Column(name = "RP_COTTON")
	private String rp_cotton;

	@Column(name = "WBO_DATE_PROD")
	private String wbo_date_prod;

	@Column(name = "WBO_TIME_PROD")
	private String wbo_time_prod;

	@Column(name = "WBO_NAME_PROD")
	private String wbo_name_prod;

	@Column(name = "WBO_SIGN_SIGN")
	private String wbo_sign_sign;

	@Column(name = "WBO_DATE_QA")
	private String wbo_date_qa;

	@Column(name = "WBO_TIME_QA")
	private String wbo_time_qa;

	@Column(name = "WBO_NAME_QA")
	private String wbo_name_qa;

	@Column(name = "WBO_SIGN_QA")
	private String wbo_sign_qa;

	// CARDING M/C ALC

	@Column(name = "ALC1_ACTUAL_SET_GSM")
	private String alc1_actual_set_gsm;

	@Column(name = "ALC1_DATE_PROD")
	private String alc1_date_prod;

	@Column(name = "ALC1_TIME_PROD")
	private String alc1_time_prod;

	@Column(name = "ALC1_NAME_PROD")
	private String alc1_name_prod;

	@Column(name = "ALC1_SIGN_PROD")
	private String alc1_sign_prod;

	@Column(name = "ALC1_DATE_QA")
	private String alc1_date_qa;

	@Column(name = "ALC1_TIME_QA")
	private String alc1_time_qa;

	@Column(name = "ALC1_NAME_QA")
	private String alc1_name_qa;

	@Column(name = "ALC1_SIGN_QA")
	private String alc1_sign_qa;

	// CARDING M/C REITER 01

	@Column(name = "REITER01_ACTUAL_SET_GSM")
	private String reiter01_actual_set_gsm;

	@Column(name = "REITER01_DATE_PROD")
	private String reiter01_date_prod;

	@Column(name = "REITER01_TIME_PROD")
	private String reiter01_time_prod;

	@Column(name = "REITER01_NAME_PROD")
	private String reiter01_name_prod;

	@Column(name = "REITER01_SIGN_PROD")
	private String reiter01_sign_prod;

	@Column(name = "REITER01_DATE_QA")
	private String reiter01_date_qa;

	@Column(name = "REITER01_TIME_QA")
	private String reiter01_time_qa;

	@Column(name = "REITER01_NAME_QA")
	private String reiter01_name_qa;

	@Column(name = "REITER01_SIGN_QA")
	private String reiter01_sign_qa;

	// CARDING M/C ALC-2

	@Column(name = "ALC2_ACTUAL_SET_GSM")
	private String alc2_actual_set_gsm;

	@Column(name = "ALC2_DATE_PROD")
	private String alc2_date_prod;

	@Column(name = "ALC2_TIME_PROD")
	private String alc2_time_prod;

	@Column(name = "ALC2_NAME_PROD")
	private String alc2_name_prod;

	@Column(name = "ALC2_SIGN_PROD")
	private String alc2_sign_prod;

	@Column(name = "ALC2_DATE_QA")
	private String alc2_date_qa;

	@Column(name = "ALC2_TIME_QA")
	private String alc2_time_qa;

	@Column(name = "ALC2_NAME_QA")
	private String alc2_name_qa;

	@Column(name = "ALC2_SIGN_QA")
	private String alc2_sign_qa;

	// CARDING M/C REITER 02

	@Column(name = "REITER02_ACTUAL_SET_GSM")
	private String reiter02_actual_set_gsm;

	@Column(name = "REITER02_DATE_PROD")
	private String reiter02_date_prod;

	@Column(name = "REITER02_TIME_PROD")
	private String reiter02_time_prod;

	@Column(name = "REITER02_NAME_PROD")
	private String reiter02_name_prod;

	@Column(name = "REITER02_SIGN_PROD")
	private String reiter02_sign_prod;

	@Column(name = "REITER02_DATE_QA")
	private String reiter02_date_qa;

	@Column(name = "REITER02_TIME_QA")
	private String reiter02_time_qa;

	@Column(name = "REITER02_NAME_QA")
	private String reiter02_name_qa;

	@Column(name = "REITER02_SIGN_QA")
	private String reiter02_sign_qa;

	// JETLACE

	@Column(name = "JETLACE_CAR_SPEED")
	private String jetlace_car_speed;

	@Column(name = "JETLACE_VACUM_SECTION")
	private String jetlace_vacum_section;

	@Column(name = "JETLACE_PRE_WETTING")
	private String jetlace_pre_wetting;

	@Column(name = "JETLACE_PATTERN")
	private String jetlace_pattern;

	@Column(name = "INJECTOR_IPA")
	private String injector_ipa;

	@Column(name = "INJECTOR_11")
	private String injector_11;

	@Column(name = "INJECTOR_21")
	private String injector_21;

	@Column(name = "JETLACE_DATE_PROD")
	private String jetlace_date_prod;

	@Column(name = "JETLACE_TIME_PROD")
	private String jetlace_time_prod;

	@Column(name = "JETLACE_NAME_PROD")
	private String jetlace_name_prod;

	@Column(name = "JETLACE_SIGN_PROD")
	private String jetlace_sign_prod;

	@Column(name = "JETLACE_DATE_QA")
	private String jetlace_date_qa;

	@Column(name = "JETLACE_TIME_QA")
	private String jetlace_time_qa;

	@Column(name = "JETLACE_NAME_QA")
	private String jetlace_name_qa;

	@Column(name = "JETLACE_SIGN_QA")
	private String jetlace_sign_qa;

	// DRYER A

	@Column(name = "DRYERA_TEMP")
	private String dryera_temp;

	@Column(name = "DRYERA_BLOW_SPEED")
	private String dryera_blow_speed;

	@Column(name = "DRYERA_DRUM_SPEED")
	private String dryera_drum_speed;

	@Column(name = "DRYERA__INTEL_DRUM_SPEED")
	private String dryera__intel_drum_speed;

	@Column(name = "DRYERA__OUTLET_DRUM_SPEED")
	private String dryera__outlet_drum_speed;

	@Column(name = "DRYERA_DATE_PROD")
	private String dryera_date_prod;

	@Column(name = "DRYERA_TIME_PROD")
	private String dryera_time_prod;

	@Column(name = "DRYERA_NAME_PROD")
	private String dryera_name_prod;

	@Column(name = "DRYERA_SIGN_PROD")
	private String dryera_sign_prod;

	@Column(name = "DRYERA_DATE_QA")
	private String dryera_date_qa;

	@Column(name = "DRYERA_TIME_QA")
	private String dryera_time_qa;

	@Column(name = "DRYERA_NAME_QA")
	private String dryera_name_qa;

	@Column(name = "DRYERA_SIGN_QA")
	private String dryera_sign_qa;

	// DRYER B

	@Column(name = "DRYERB_TEMP")
	private String dryerb_temp;

	@Column(name = "DRYERB_BLOW_SPEED")
	private String dryerb_blow_speed;

	@Column(name = "DRYERB_DRUM_SPEED")
	private String dryerb_drum_speed;

	@Column(name = "DRYERB__INTEL_DRUM_SPEED")
	private String dryerb__intel_drum_speed;

	@Column(name = "DRYERB__OUTLET_DRUM_SPEED")
	private String dryerb__outlet_drum_speed;

	@Column(name = "DRYERB_DATE_PROD")
	private String dryerb_date_prod;

	@Column(name = "DRYERB_TIME_PROD")
	private String dryerb_time_prod;

	@Column(name = "DRYERB_NAME_PROD")
	private String dryerb_name_prod;

	@Column(name = "DRYERB_SIGN_PROD")
	private String dryerb_sign_prod;

	@Column(name = "DRYERB_DATE_QA")
	private String dryerb_date_qa;

	@Column(name = "DRYERB_TIME_QA")
	private String dryerb_time_qa;

	@Column(name = "DRYERB_NAME_QA")
	private String dryerb_name_qa;

	@Column(name = "DRYERB_SIGN_QA")
	private String dryerb_sign_qa;

	// WINDER

	@Column(name = "WINDER_LINE_SPEED")
	private String winder_line_speed;

	@Column(name = "WINDER_ROLL_WIDTH")
	private String winder_roll_width;

	@Column(name = "WINDER_ROLL_THICKNESS")
	private String winder_roll_thickness;

	@Column(name = "WINDER_DATE_PROD")
	private String winder_date_prod;

	@Column(name = "WINDER_TIME_PROD")
	private String winder_time_prod;

	@Column(name = "WINDER_NAME_PROD")
	private String winder_name_prod;

	@Column(name = "WINDER_SIGN_PROD")
	private String winder_sign_prod;

	@Column(name = "WINDER_DATE_QA")
	private String winder_date_qa;

	@Column(name = "WINDER_TIME_QA")
	private String winder_time_qa;

	@Column(name = "WINDER_NAME_QA")
	private String winder_name_qa;

	@Column(name = "WINDER_SIGN_QA")
	private String winder_sign_qa;

	// MAHLO

	@Column(name = "MAHLO_SHAFT_NO")
	private String mahlo_shaft_no;

	@Column(name = "MAHLO_ACTUAL_GSM")
	private String mahlo_actual_gsm;

	@Column(name = "MAHLO_ACTUAL_MOISTURE")
	private String mahlo_actual_moisture;

	@Column(name = "MAHLO_DATE_PROD")
	private String mahlo_date_prod;

	@Column(name = "MAHLO_TIME_PROD")
	private String mahlo_time_prod;

	@Column(name = "MAHLO_NAME_PROD")
	private String mahlo_name_prod;

	@Column(name = "MAHLO_SIGN_PROD")
	private String mahlo_sign_prod;

	@Column(name = "MAHLO_DATE_QA")
	private String mahlo_date_qa;

	@Column(name = "MAHLO_TIME_QA")
	private String mahlo_time_qa;

	@Column(name = "MAHLO_NAME_QA")
	private String mahlo_name_qa;

	@Column(name = "MAHLO_SIGN_QA")
	private String mahlo_sign_qa;

	// LUCID

	@Column(name = "LUCID_OBSERVED_01")
	private String lucid_observed_01;

	@Column(name = "LUCID_OBSERVED_02")
	private String lucid_observed_02;

	@Column(name = "LIUCID_DATE_PROD")
	private String lucid_date_prod;

	@Column(name = "LUCID_TIME_PROD")
	private String lucid_time_prod;

	@Column(name = "LUCID_NAME_PROD")
	private String lucid_name_prod;

	@Column(name = "LUCID_SIGN_PROD")
	private String lucid_sign_prod;

	@Column(name = "LUCID_DATE_QA")
	private String lucid_date_qa;

	@Column(name = "LUCID_TIME_QA")
	private String lucid_time_qa;

	@Column(name = "LUCID_NAME_QA")
	private String lucid_name_qa;

	@Column(name = "LUCID_SIGN_QA")
	private String lucid_sign_qa;

	// New

	@Column(name = "ROLL_GSM")
	private String roll_gsm;

	@Column(name = "TARGET_GSM")
	private String target_gsm;

	@Column(name = "TARGER_MOISTURE")
	private String targer_moisture;

	@Column(name = "BATCH_NO")
	private String batchNo;

	// 18-11-2024 enhancement

	@Column(name = "INJECTOR_01")
	private String injector_01;
	
	// 18-02-2025 enhancement

	@Column(name = "INJECTOR_12")
	private String injector_12;
	

}
