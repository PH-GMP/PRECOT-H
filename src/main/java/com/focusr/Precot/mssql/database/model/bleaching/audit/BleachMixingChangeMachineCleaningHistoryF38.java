package com.focusr.Precot.mssql.database.model.bleaching.audit;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BLEACH_MIXCHANGE_MACHINECLEAN_HISTORY_F38", schema = AppConstants.schema)
public class BleachMixingChangeMachineCleaningHistoryF38 extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "DATE")
	private String date;

	@Column(name = "FORMAT_NAME")
	private String format_name;

	@Column(name = "FORMAT_NO")
	private String format_no;

	@Column(name = "REVISION_NO")
	private String revision_no;

	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;

	@Column(name = "MIX_CHANGEOVER_FROM")
	private String mix_changeover_from;

	@Column(name = "MIX_CHANGEOVER_TO")
	private String mix_changeover_to;

	@Column(name = "BMR_NO_FROM")
	private String bmr_no_from;

	@Column(name = "BMR_NO_TO")
	private String bmr_no_to;

	@Column(name = "LAYDOWN_AREA_CLEANING")
	private String laydown_area_cleaning;

	@Column(name = "BLENDOMAT_CLEANING")
	private String blendomat_cleaning;

	@Column(name = "BRF_425_CLEANING")
	private String brf_425_cleaning;

	@Column(name = "FIRE_DIVEROTOR_CLEANING")
	private String fire_diverotor_cleaning;

	@Column(name = "METEL_DETECTOR_CLEANING")
	private String metel_detector_cleaning;

	@Column(name = "CLP_UNIT_CLEANING")
	private String clp_unit_cleaning;

	@Column(name = "BRF_425_UNIT")
	private String brf_425_unit;

	@Column(name = "MPM_UNIT_CLEANING")
	private String mpm_unit_cleaning;

	@Column(name = "APPLIED_UNIT_CLEANING_ONE")
	private String applied_unit_cleaning_one;

	@Column(name = "ERM_UNIT_CLEANING")
	private String erm_unit_cleaning;

	@Column(name = "CCP_UNIT_CLEANING")
	private String ccp_unit_cleaning;

	@Column(name = "DUSTEX_UNIT_CLEANING")
	private String dustex_unit_cleaning;

	@Column(name = "HENNATEX_CONDENSER_UNIT	")
	private String hennatex_condenser_unit;

	@Column(name = "CAKEPRESS_MACHINE_CLEANING")
	private String cakepress_machine_cleaning;

	@Column(name = "KIER_MACHINE_CHEMICAL_CLEAN")
	private String kier_machine_chemical_clean;

	@Column(name = "HYDRO_MACHINE_CLEANING")
	private String hydro_machine_cleaning;

	@Column(name = "CAKE_OPENER_CLEAN")
	private String cake_opener_clean;

	@Column(name = "DRYER_CLEANING")
	private String dryer_cleaning;

	@Column(name = "MTF_UNIT_CLEAN")
	private String mtf_unit_clean;

	@Column(name = "RIETER_CLEAN")
	private String rieter_clean;

	@Column(name = "APPLIED_UNIT_CLEANING_TWO")
	private String applied_unit_cleaning_two;

	@Column(name = "METAL_FIRE_DETECTOR")
	private String metal_fire_detector;

	@Column(name = "BALEPRESS_CONVEYOR_CLEANING")
	private String balepress_conveyor_cleaning;

	@Column(name = "BALEPRESS_STAPPER_MECHINE_CLEANING")
	private String balepress_stapper_mechine_cleaning;

	@Column(name = "BALE_EVACUATION_WEIGHT_MACHINE_CLEANING")
	private String bale_evacuation_weight_machine_cleaning;

//	@Column(name = "CHEMICAL_BUCKETS_WEIGHT_BALANCE_CLEANING")
//	private String chemical_buckets_weight_balance_cleaning;

	@Column(name = "CARDING_MACHINES_CLEANING")
	private String carding_machines_cleaning;

	@Column(name = "CHEMICAL_BUCKETS_CHEMICAL_WEIGHING_BALANCE_CLEANING")
	private String chemical_buckets_chemical_weighing_balance_cleaning;

	@Column(name = "BAKE_STORAGE_FLOOR_CLEANING")
	private String bake_storage_floor_cleaning;
	
	
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisor_status;
	
	@Column(name = "SUPERVISOR_SUBMIT_ON")
	private Date supervisor_submit_on;

	@Column(name = "SUPERVISOR_SUBMIT_BY")
	private String supervisor_submit_by;

	@Column(name = "SUPERVISOR_SUBMIT_ID")
	private Long supervisor_submit_id;

	@Column(name = "SUPERVISOR_SIGN")
	private String supervisor_sign;
	
	@Column(name = "HOD_STATUS")
	private String hod_status;
	
	@Column(name = "HOD_SUBMIT_ON")
	private Date hod_submit_on;

	@Column(name = "HOD_SUBMIT_BY")
	private String hod_submit_by;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hod_submit_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;
	
	@Column(name = "VERSION")
	private int version;
	
	@Column(name = "REASON")
	private String reason;
	
}
