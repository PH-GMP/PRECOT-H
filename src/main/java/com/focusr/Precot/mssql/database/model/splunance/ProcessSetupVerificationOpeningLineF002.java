package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.SpulanceSaveSubmitOperator;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_PROCESS_SETUP_VERIFICATION_OPENING_LINE_F002", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = {"DATE","SHIFT","ORDER_NO" }) })
public class ProcessSetupVerificationOpeningLineF002 extends SpulanceSaveSubmitOperator {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "OPENING_ID")
	private Long opening_id;

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

	@Column(name = "MATERIAL_CODE")
	private String material_code;

	@Column(name = "BO_STRIPER_ROLLER_SPEED")
	private String bo_striper_roller_speed;

	@Column(name = "BO_SPIKED_LATTICE_SPEED")
	private String bo_spiked_lattice_speed;

	@Column(name = "BO_WIPER_ROLLER_SPEED")
	private String bo_wiper_roller_speed;

	@Column(name = "BO_TRANSPORT_FAN_SPEED")
	private String bo_transport_fan_speed;

	// WBO 1
	@Column(name = "SCALE_SETTING_1")
	private String scale_setting_1;

	@Column(name = "TOTAL_WEIGHT_1")
	private String total_weight_1;

	@Column(name = "WBO_1_1")
	private String wbo_1_1;

	@Column(name = "WBO_2_1")
	private String wbo_2_1;

	@Column(name = "WBO_STRIPPER_ROLLER_SPEED_1")
	private String wbo_stripper_roller_speed_1;

	@Column(name = "WBO_SPIKED_LATTICE_SPEED_1")
	private String wbo_spiked_lattice_speed_1;

	@Column(name = "WBO_WIPER_ROLLER_SPEED_1")
	private String wbo_wiper_roller_speed_1;

	// WBO 2
	@Column(name = "SCALE_SETTING_2")
	private String scale_setting_2;

	@Column(name = "TOTAL_WEIGHT_2")
	private String total_weight_2;

	@Column(name = "WBO_1_2")
	private String wbo_1_2;

	@Column(name = "WBO_2_2")
	private String wbo_2_2;

	@Column(name = "WBO_STRIPPER_ROLLER_SPEED_2")
	private String wbo_stripper_roller_speed_2;

	@Column(name = "WBO_SPIKED_LATTICE_SPEED_2")
	private String wbo_spiked_lattice_speed_2;

	@Column(name = "WBO_WIPER_ROLLER_SPEED_2")
	private String wbo_wiper_roller_speed_2;

	//
	@Column(name = "CMO_FEED_ROLLER_SPEED")
	private String cmo_feed_roller_speed;

	@Column(name = "TRANSPORT_FAN_SPEED")
	private String transport_fan_speed;

	// FINE OPENER REITER
	@Column(name = "FEED_ROLLER_SPEED_FOR")
	private String feed_roller_speed_for;

	@Column(name = "TRANSPORT_FAN_SPEED_FOR")
	private String transport_fan_speed_for;
	// -------------------------//
	// FINE OPENER ALC 01
	@Column(name = "FEED_ROLLER_SPEED_FOA")
	private String feed_roller_speed_foa;

	@Column(name = "TRANSPORT_FAN_SPEED_FOA")
	private String transport_fan_speed_foa;
	// PRE-OPENER - RETIER

	@Column(name = "FEED_ROLLER_SPEED_POR")
	private String feed_roller_speed_por;

	@Column(name = "TRANSPORT_FAN_SPEED_POR")
	private String transport_fan_speed_por;

	// PRE-OPENER-ALC
	@Column(name = "FEED_ROLLER_SPEED_POA")
	private String feed_roller_speed_poa;

	@Column(name = "TRANSPORT_FAN_SPEED_POA")
	private String transport_fan_speed_poa;

	// REITER CARDING

	@Column(name = "REITER_CHUTE_FEED_ROLLER_SPEED")
	private String reiter_chute_feed_roller_speed;

	@Column(name = "FEED_ROLLER_SPEED_RC")
	private String feed_roller_speed_rc;

	@Column(name = "LICKER_IN_SPEED")
	private String licker_in_speed;

	@Column(name = "FLAT_SPEED")
	private String flat_speed;

	@Column(name = "CONDENSER_ROLLER_SPEED")
	private String condenser_roller_speed;

	@Column(name = "REITER_CARD_1_DELIVERY_SPEED")
	private String reiter_card_1_delivery_speed;

	// AIR LAY CARDING

	@Column(name = "ALC_TOP_CHUTE_PRESSURE")
	private String alc_top_chute_pressure;

	@Column(name = "ALC_BOTTOM_CHUTE_PRESSURE")
	private String alc_bottom_chute_pressure;

	@Column(name = "ALC_FEED_ROLLER_SPEED")
	private String alc_feed_roller_speed;

	@Column(name = "ALC_K1_ROLLER_SPEED")
	private String alc_k1_roller_speed;

	@Column(name = "ALC_K2_ROLLER_SPEED")
	private String alc_k2_roller_speed;

	@Column(name = "ALC_K3_ROLLER_SPEED")
	private String alc_k3_roller_speed;

	@Column(name = "TURBO_ROLLER_SPEED")
	private String turbo_roller_speed;

	@Column(name = "PRESS_ROLLER_SPEED")
	private String press_roller_speed;

	@Column(name = "MESH_BELT_SPEED")
	private String mesh_belt_speed;

	@Column(name = "COLLECTING_BELT_SPEED")
	private String collecting_belt_speed;
	/// FINE OPENER ALC 02

	// FINE OPENER ALC
	@Column(name = "FEED_ROLLER_SPEED_FOA_2")
	private String feed_roller_speed_foa_2;

	@Column(name = "TRANSPORT_FAN_SPEED_FOA_2")
	private String transport_fan_speed_foa_2;
	// PRE-OPENER - RETIER

	@Column(name = "FEED_ROLLER_SPEED_POR_2")
	private String feed_roller_speed_por_2;

	@Column(name = "TRANSPORT_FAN_SPEED_POR_2")
	private String transport_fan_speed_por_2;

	// PRE-OPENER-ALC
	@Column(name = "FEED_ROLLER_SPEED_POA_2")
	private String feed_roller_speed_poa_2;

	@Column(name = "TRANSPORT_FAN_SPEED_POA_2")
	private String transport_fan_speed_poa_2;

	// REITER CARDING

	@Column(name = "REITER_CHUTE_FEED_ROLLER_SPEED_2")
	private String reiter_chute_feed_roller_speed_2;

	@Column(name = "FEED_ROLLER_SPEED_RC_2")
	private String feed_roller_speed_rc_2;

	@Column(name = "LICKER_IN_SPEED_2")
	private String licker_in_speed_2;

	@Column(name = "FLAT_SPEED_2")
	private String flat_speed_2;

	@Column(name = "CONDENSER_ROLLER_SPEED_2")
	private String condenser_roller_speed_2;

	@Column(name = "REITER_CARD_1_DELIVERY_SPEED_2")
	private String reiter_card_1_delivery_speed_2;

	// AIR LAY CARDING

	@Column(name = "ALC_TOP_CHUTE_PRESSURE_2")
	private String alc_top_chute_pressure_2;

	@Column(name = "ALC_BOTTOM_CHUTE_PRESSURE_2")
	private String alc_bottom_chute_pressure_2;

	@Column(name = "ALC_FEED_ROLLER_SPEED_2")
	private String alc_feed_roller_speed_2;

	@Column(name = "ALC_K1_ROLLER_SPEED_2")
	private String alc_k1_roller_speed_2;

	@Column(name = "ALC_K2_ROLLER_SPEED_2")
	private String alc_k2_roller_speed_2;

	@Column(name = "ALC_K3_ROLLER_SPEED_2")
	private String alc_k3_roller_speed_2;

	@Column(name = "TURBO_ROLLER_SPEED_2")
	private String turbo_roller_speed_2;

	@Column(name = "PRESS_ROLLER_SPEED_2")
	private String press_roller_speed_2;

	@Column(name = "MESH_BELT_SPEED_2")
	private String mesh_belt_speed_2;

	@Column(name = "COLLECTING_BELT_SPEED_2")
	private String collecting_belt_speed_2;

	//new approach
	@Column(name = "REASON")
	private String reason;
	
	
}
