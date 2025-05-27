package com.focusr.Precot.mssql.database.model.bleaching;

import java.util.Date;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;


@Entity
@Table(name = "BLEACH_MIXCHANGE_MACHINECLEAN_F38", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "date", "bmr_no_from", "bmr_no_to" }) })
//@Table(name = "BLEACH_MIXCHANGE_MACHINECLEAN_F38")
//@Table(name = "BLEACH_MIXCHANGE_MACHINECLEAN_F38", schema = AppConstants.schema, uniqueConstraints = {
//		@UniqueConstraint(columnNames = { "date", "bmr_no_from" }),
//		@UniqueConstraint(columnNames = { "date", "bmr_no_to" }) })
public class BleachMixingChangeMachineCleaningF38 extends UserDateAudit {

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
	// ststus
	@Column(name = "MAIL_STATUS")
	private String mail_status;
	
	@Lob
	@Column(name = "SUPERVISIOR_SIGNATURE")
	private byte[] supervisisorSignature;
	
	@Lob
	@Column(name = "HOD_SIGNATURE")
	private byte[] hodSignature;
	
	@Column(name = "REASON")
	private String reason;

	// SUPERVISOR

	@Column(name = "SUPERVISOR_STATUS")
	private String supervisor_status;

	@Column(name = "SUPERVISOR_SAVED_ON")
	private Date supervisor_saved_on;

	@Column(name = "SUPERVISOR_SAVED_BY")
	private String supervisor_saved_by;

	@Column(name = "SUPERVISOR_SAVED_ID")
	private Long supervisor_saved_id;

	@Column(name = "SUPERVISOR_SUBMIT_ON")
	private Date supervisor_submit_on;

	@Column(name = "SUPERVISOR_SUBMIT_BY")
	private String supervisor_submit_by;

	@Column(name = "SUPERVISOR_SUBMIT_ID")
	private Long supervisor_submit_id;

	@Column(name = "SUPERVISOR_SIGN")
	private String supervisor_sign;

	// HOD

	@Column(name = "HOD_STATUS")
	private String hod_status;

	@Column(name = "HOD_SAVED_ON")
	private Date hod_saved_on;

	@Column(name = "HOD_SAVED_BY")
	private String hod_saved_by;

	@Column(name = "HOD_SAVED_ID")
	private Long hod_saved_id;

	@Column(name = "HOD_SUBMIT_ON")
	private Date hod_submit_on;

	@Column(name = "HOD_SUBMIT_BY")
	private String hod_submit_by;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hod_submit_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getFormat_name() {
		return format_name;
	}

	public void setFormat_name(String format_name) {
		this.format_name = format_name;
	}

	public String getFormat_no() {
		return format_no;
	}

	public void setFormat_no(String format_no) {
		this.format_no = format_no;
	}

	public String getRevision_no() {
		return revision_no;
	}

	public void setRevision_no(String revision_no) {
		this.revision_no = revision_no;
	}

	public String getRef_sop_no() {
		return ref_sop_no;
	}

	public void setRef_sop_no(String ref_sop_no) {
		this.ref_sop_no = ref_sop_no;
	}

	public String getMix_changeover_from() {
		return mix_changeover_from;
	}

	public void setMix_changeover_from(String mix_changeover_from) {
		this.mix_changeover_from = mix_changeover_from;
	}

	public String getMix_changeover_to() {
		return mix_changeover_to;
	}

	public void setMix_changeover_to(String mix_changeover_to) {
		this.mix_changeover_to = mix_changeover_to;
	}

	public String getBmr_no_from() {
		return bmr_no_from;
	}

	public void setBmr_no_from(String bmr_no_from) {
		this.bmr_no_from = bmr_no_from;
	}

	public String getBmr_no_to() {
		return bmr_no_to;
	}

	public void setBmr_no_to(String bmr_no_to) {
		this.bmr_no_to = bmr_no_to;
	}

	public String getLaydown_area_cleaning() {
		return laydown_area_cleaning;
	}

	public void setLaydown_area_cleaning(String laydown_area_cleaning) {
		this.laydown_area_cleaning = laydown_area_cleaning;
	}

	public String getBlendomat_cleaning() {
		return blendomat_cleaning;
	}

	public void setBlendomat_cleaning(String blendomat_cleaning) {
		this.blendomat_cleaning = blendomat_cleaning;
	}

	public String getBrf_425_cleaning() {
		return brf_425_cleaning;
	}

	public void setBrf_425_cleaning(String brf_425_cleaning) {
		this.brf_425_cleaning = brf_425_cleaning;
	}

	public String getFire_diverotor_cleaning() {
		return fire_diverotor_cleaning;
	}

	public void setFire_diverotor_cleaning(String fire_diverotor_cleaning) {
		this.fire_diverotor_cleaning = fire_diverotor_cleaning;
	}

	public String getMetel_detector_cleaning() {
		return metel_detector_cleaning;
	}

	public void setMetel_detector_cleaning(String metel_detector_cleaning) {
		this.metel_detector_cleaning = metel_detector_cleaning;
	}

	public String getClp_unit_cleaning() {
		return clp_unit_cleaning;
	}

	public void setClp_unit_cleaning(String clp_unit_cleaning) {
		this.clp_unit_cleaning = clp_unit_cleaning;
	}

	public String getBrf_425_unit() {
		return brf_425_unit;
	}

	public void setBrf_425_unit(String brf_425_unit) {
		this.brf_425_unit = brf_425_unit;
	}

	public String getMpm_unit_cleaning() {
		return mpm_unit_cleaning;
	}

	public void setMpm_unit_cleaning(String mpm_unit_cleaning) {
		this.mpm_unit_cleaning = mpm_unit_cleaning;
	}

	public String getApplied_unit_cleaning_one() {
		return applied_unit_cleaning_one;
	}

	public void setApplied_unit_cleaning_one(String applied_unit_cleaning_one) {
		this.applied_unit_cleaning_one = applied_unit_cleaning_one;
	}

	public String getErm_unit_cleaning() {
		return erm_unit_cleaning;
	}

	public void setErm_unit_cleaning(String erm_unit_cleaning) {
		this.erm_unit_cleaning = erm_unit_cleaning;
	}

	public String getCcp_unit_cleaning() {
		return ccp_unit_cleaning;
	}

	public void setCcp_unit_cleaning(String ccp_unit_cleaning) {
		this.ccp_unit_cleaning = ccp_unit_cleaning;
	}

	public String getDustex_unit_cleaning() {
		return dustex_unit_cleaning;
	}

	public void setDustex_unit_cleaning(String dustex_unit_cleaning) {
		this.dustex_unit_cleaning = dustex_unit_cleaning;
	}

	public String getHennatex_condenser_unit() {
		return hennatex_condenser_unit;
	}

	public void setHennatex_condenser_unit(String hennatex_condenser_unit) {
		this.hennatex_condenser_unit = hennatex_condenser_unit;
	}

	public String getCakepress_machine_cleaning() {
		return cakepress_machine_cleaning;
	}

	public void setCakepress_machine_cleaning(String cakepress_machine_cleaning) {
		this.cakepress_machine_cleaning = cakepress_machine_cleaning;
	}

	public String getKier_machine_chemical_clean() {
		return kier_machine_chemical_clean;
	}

	public void setKier_machine_chemical_clean(String kier_machine_chemical_clean) {
		this.kier_machine_chemical_clean = kier_machine_chemical_clean;
	}

	public String getHydro_machine_cleaning() {
		return hydro_machine_cleaning;
	}

	public void setHydro_machine_cleaning(String hydro_machine_cleaning) {
		this.hydro_machine_cleaning = hydro_machine_cleaning;
	}

	public String getCake_opener_clean() {
		return cake_opener_clean;
	}

	public void setCake_opener_clean(String cake_opener_clean) {
		this.cake_opener_clean = cake_opener_clean;
	}

	public String getDryer_cleaning() {
		return dryer_cleaning;
	}

	public void setDryer_cleaning(String dryer_cleaning) {
		this.dryer_cleaning = dryer_cleaning;
	}

	public String getMtf_unit_clean() {
		return mtf_unit_clean;
	}

	public void setMtf_unit_clean(String mtf_unit_clean) {
		this.mtf_unit_clean = mtf_unit_clean;
	}

	public String getRieter_clean() {
		return rieter_clean;
	}

	public void setRieter_clean(String rieter_clean) {
		this.rieter_clean = rieter_clean;
	}

	public String getApplied_unit_cleaning_two() {
		return applied_unit_cleaning_two;
	}

	public void setApplied_unit_cleaning_two(String applied_unit_cleaning_two) {
		this.applied_unit_cleaning_two = applied_unit_cleaning_two;
	}

	public String getMetal_fire_detector() {
		return metal_fire_detector;
	}

	public void setMetal_fire_detector(String metal_fire_detector) {
		this.metal_fire_detector = metal_fire_detector;
	}

	public String getBalepress_conveyor_cleaning() {
		return balepress_conveyor_cleaning;
	}

	public void setBalepress_conveyor_cleaning(String balepress_conveyor_cleaning) {
		this.balepress_conveyor_cleaning = balepress_conveyor_cleaning;
	}

	public String getBalepress_stapper_mechine_cleaning() {
		return balepress_stapper_mechine_cleaning;
	}

	public void setBalepress_stapper_mechine_cleaning(String balepress_stapper_mechine_cleaning) {
		this.balepress_stapper_mechine_cleaning = balepress_stapper_mechine_cleaning;
	}

	public String getBale_evacuation_weight_machine_cleaning() {
		return bale_evacuation_weight_machine_cleaning;
	}

	public void setBale_evacuation_weight_machine_cleaning(String bale_evacuation_weight_machine_cleaning) {
		this.bale_evacuation_weight_machine_cleaning = bale_evacuation_weight_machine_cleaning;
	}

	public String getCarding_machines_cleaning() {
		return carding_machines_cleaning;
	}

	public void setCarding_machines_cleaning(String carding_machines_cleaning) {
		this.carding_machines_cleaning = carding_machines_cleaning;
	}

	public String getChemical_buckets_chemical_weighing_balance_cleaning() {
		return chemical_buckets_chemical_weighing_balance_cleaning;
	}

	public void setChemical_buckets_chemical_weighing_balance_cleaning(
			String chemical_buckets_chemical_weighing_balance_cleaning) {
		this.chemical_buckets_chemical_weighing_balance_cleaning = chemical_buckets_chemical_weighing_balance_cleaning;
	}

	public String getBake_storage_floor_cleaning() {
		return bake_storage_floor_cleaning;
	}

	public void setBake_storage_floor_cleaning(String bake_storage_floor_cleaning) {
		this.bake_storage_floor_cleaning = bake_storage_floor_cleaning;
	}

	public String getMail_status() {
		return mail_status;
	}

	public void setMail_status(String mail_status) {
		this.mail_status = mail_status;
	}

	public String getSupervisor_status() {
		return supervisor_status;
	}

	public void setSupervisor_status(String supervisor_status) {
		this.supervisor_status = supervisor_status;
	}

	public Date getSupervisor_saved_on() {
		return supervisor_saved_on;
	}

	public void setSupervisor_saved_on(Date supervisor_saved_on) {
		this.supervisor_saved_on = supervisor_saved_on;
	}

	public String getSupervisor_saved_by() {
		return supervisor_saved_by;
	}

	public void setSupervisor_saved_by(String supervisor_saved_by) {
		this.supervisor_saved_by = supervisor_saved_by;
	}

	public Long getSupervisor_saved_id() {
		return supervisor_saved_id;
	}

	public void setSupervisor_saved_id(Long supervisor_saved_id) {
		this.supervisor_saved_id = supervisor_saved_id;
	}

	public Date getSupervisor_submit_on() {
		return supervisor_submit_on;
	}

	public void setSupervisor_submit_on(Date supervisor_submit_on) {
		this.supervisor_submit_on = supervisor_submit_on;
	}

	public String getSupervisor_submit_by() {
		return supervisor_submit_by;
	}

	public void setSupervisor_submit_by(String supervisor_submit_by) {
		this.supervisor_submit_by = supervisor_submit_by;
	}

	public Long getSupervisor_submit_id() {
		return supervisor_submit_id;
	}

	public void setSupervisor_submit_id(Long supervisor_submit_id) {
		this.supervisor_submit_id = supervisor_submit_id;
	}

	public String getSupervisor_sign() {
		return supervisor_sign;
	}

	public void setSupervisor_sign(String supervisor_sign) {
		this.supervisor_sign = supervisor_sign;
	}

	public String getHod_status() {
		return hod_status;
	}

	public void setHod_status(String hod_status) {
		this.hod_status = hod_status;
	}

	public Date getHod_saved_on() {
		return hod_saved_on;
	}

	public void setHod_saved_on(Date hod_saved_on) {
		this.hod_saved_on = hod_saved_on;
	}

	public String getHod_saved_by() {
		return hod_saved_by;
	}

	public void setHod_saved_by(String hod_saved_by) {
		this.hod_saved_by = hod_saved_by;
	}

	public Long getHod_saved_id() {
		return hod_saved_id;
	}

	public void setHod_saved_id(Long hod_saved_id) {
		this.hod_saved_id = hod_saved_id;
	}

	public Date getHod_submit_on() {
		return hod_submit_on;
	}

	public void setHod_submit_on(Date hod_submit_on) {
		this.hod_submit_on = hod_submit_on;
	}

	public String getHod_submit_by() {
		return hod_submit_by;
	}

	public void setHod_submit_by(String hod_submit_by) {
		this.hod_submit_by = hod_submit_by;
	}

	public Long getHod_submit_id() {
		return hod_submit_id;
	}

	public void setHod_submit_id(Long hod_submit_id) {
		this.hod_submit_id = hod_submit_id;
	}

	public String getHod_sign() {
		return hod_sign;
	}

	public void setHod_sign(String hod_sign) {
		this.hod_sign = hod_sign;
	}

	public BleachMixingChangeMachineCleaningF38() {
		super();
		// TODO Auto-generated constructor stub
	}

	public byte[] getSupervisisorSignature() {
		return supervisisorSignature;
	}

	public void setSupervisisorSignature(byte[] supervisisorSignature) {
		this.supervisisorSignature = supervisisorSignature;
	}

	public byte[] getHodSignature() {
		return hodSignature;
	}

	public void setHodSignature(byte[] hodSignature) {
		this.hodSignature = hodSignature;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	
	
	

	

}
