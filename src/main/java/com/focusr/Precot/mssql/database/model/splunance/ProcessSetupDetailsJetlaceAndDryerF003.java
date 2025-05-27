package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.SpulanceSaveSubmitOperator;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003",schema=AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = {"DATE","SHIFT","ORDER_NO" }) })
public class ProcessSetupDetailsJetlaceAndDryerF003 extends SpulanceSaveSubmitOperator {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROCESS_ID")
	private Long process_id;
	
	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "SOP_NO")
	private String sopNumber;

	@Column(name = "REVISION_NO")
	private String revisionNo;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "SHIFT")
	private String shift;
	
	@Column(name = "ORDER_NO")
	private String order_no;
	
	@Column(name = "MIXING")
	private String mixing;
	
	@Column(name = "CUSTOMER_NAME")
	private String customer_name;
	
	@Column(name = "STD_GSM")
	private String std_gsm;
	
	@Column(name = "WIDTH")
	private String width;
	
	@Column(name = "PATTERN")
	private String pattern;
	
	@Column(name = "MOISTURE")
	private String moisture;
	
	@Column(name = "THICKNESS")
	private String thickness;
	
	//
	
	@Column(name = "J1_CONVEYOR_SPEED")
	private String j1_conveyor_speed;
	
	@Column(name = "JP_CONVEYOR_SPEED")
	private String jp_conveyor_speed;
	
	@Column(name = "INJ_PW_PRESSURE")
	private String inj_pw_pressure;
	
	@Column(name = "INJ_01_PRESSURE")
	private String inj_01_pressure;
	
	@Column(name = "INJ_IPA_PRESSURE")
	private String inj_ipa_pressure;
	
	@Column(name = "INJ_11_PRESSURE")
	private String inj_11_pressure;
	
	@Column(name = "INJ_12_PRESSURE")
	private String inj_12_pressure;
	
	@Column(name = "INJ_21_PRESSURE")
	private String inj_21_pressure;
	
	@Column(name = "INJ_PW_STRIP")
	private String inj_pw_strip;
	
	@Column(name = "VACCUM")
	private String vaccum;
	
	@Column(name = "INJ_01_STRIP_SPECIFICATION")
	private String inj_01_strip_specification;
	
	@Column(name = "INJ_IPA_STRIP_SPECIFICATION")
	private String inj_ipa_strip_specification;
	
	@Column(name = "INJ_11_STRIP_SPECIFICATION")
	private String inj_11_strip_specification;
	
	@Column(name = "INJ_12_STRIP_SPECIFICATION")
	private String inj_12_strip_specification;
	
	@Column(name = "INJ_21_STRIP_SPECIFICATION")
	private String inj_21_strip_specification;
	
	@Column(name = "CPA_DRUM_SPEED")
	private String cpa_drum_speed;
	
	@Column(name = "C1_DRUM_SPEED")
	private String c1_drum_speed;
	
	@Column(name = "C2_DRUM_SPEED")
	private String c2_drum_speed;
	
	@Column(name = "J2S_CONVEYER_SPEED")
	private String j2s_conveyer_speed;
	
	//DRYER
	
	@Column(name = "MDU_TENSION_DRAFT_A")
	private String mdu_tension_draft_a;
	
	@Column(name = "MDL_TENSION_DRAFT_A")
	private String mdl_tension_draft_a;
	
	@Column(name = "MDL_SPEED_A")
	private String mdl_speed_a;
	
	@Column(name = "MDU_SPEED_A")
	private String mdu_speed_a;
	
	@Column(name = "TTU_A")
	private String ttu_a;
	
	@Column(name = "TTL_A")
	private String ttl_a;
	
	@Column(name = "MFU_SPEED_A")
	private String mfu_speed_a;
	
	@Column(name = "MFL_SPEED_A")
	private String mfl_speed_a;
	
	@Column(name = "TOP_DAMPER_INLET_A")
	private String top_damper_inlet_a;
	
	@Column(name = "TOP_DAMPER_OUTLET_A")
	private String top_damper_outlet_a;
	
	@Column(name = "BOTTOM_DAMPER_INLET_A")
	private String bottom_damper_inlet_a;
	
	@Column(name = "BOTTOM_DAMPER_OUTLET_A")
	private String bottom_damper_outlet_a;
	
	@Column(name = "BOILER_TEMPERATURE_A")
	private String boiler_temperature_a;
	//
	
	@Column(name = "MDU_TENSION_DRAFT_B")
	private String mdu_tension_draft_b;
	
	@Column(name = "MDL_TENSION_DRAFT_B")
	private String mdl_tension_draft_b;
	
	@Column(name = "MDL_SPEED_B")
	private String mdl_speed_b;
	
	@Column(name = "MDU_SPEED_B")
	private String mdu_speed_b;
	
	@Column(name = "TTU_B")
	private String ttu_b;
	
	@Column(name = "TTL_B")
	private String ttl_b;
	
	@Column(name = "MFU_SPEED_B")
	private String mfu_speed_b;
	
	@Column(name = "MFL_SPEED_B")
	private String mfl_speed_b;
	
	@Column(name = "TOP_DAMPER_INLET_B")
	private String top_damper_inlet_b;
	
	@Column(name = "TOP_DAMPER_OUTLET_B")
	private String top_damper_outlet_b;
	
	@Column(name = "BOTTOM_DAMPER_INLET_B")
	private String bottom_damper_inlet_b;
	
	@Column(name = "BOTTOM_DAMPER_OUTLET_B")
	private String bottom_damper_outlet_b;
	
	@Column(name = "BOILER_TEMPERATURE_B")
	private String boiler_temperature_b;
	
	//new
		@Column(name = "REASON")
		private String reason;
	
	
	
}
