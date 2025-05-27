package com.focusr.Precot.mssql.database.model.bleaching.audit;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BLEACH_MACHINE_CLEANING_RECORD_HISTORY_F16", schema = AppConstants.schema)
public class BleachMachineCleaningRecordHistoryF16 extends UserDateAudit{

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
	private Long Id;
	
	@Column(name = "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;
	
	@Column(name = "REVISION_NO")
	private Long revisionNo;
	
	@Column(name = "REF_SOP_NO")
	private String refSopNo;
	
	@Column(name = "UNIT")
	private String unit ;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "BLENDOMATE_CLEANING")
	private String blendomateCleaning;
	
	@Column(name = "METAL_DETECTOR_CLEANING_1")
	private String metalDetectorCleaning1;
	
	@Column(name = "CLP_UNIT_CLEANING")
	private String clPUnitCleaning;
	
	@Column(name = "MPM_FILLING_BOX_CLEANING")
	private String mpmFillingBoxCleaning;
	
	@Column(name = "APPLIED_UNIT_FILTER_BAG_CLEANING_1")
	private String appliedUnitFilterBagCleaning1;
	
	@Column(name = "ERM_MACHINE_CLEANING")
	private String ermMachineCleaning;
	
	@Column(name = "CCP_UNIT_CLEANING")
	private String ccpUnitCleaning;
	
	@Column(name = "DUSTEX_UNIT_CLEANING")
	private String dustexUnitCleaning;
	
	@Column(name = "HENNATEX_UNIT_CLEANING")
	private String hennatexUnitCleaning;
	
	@Column(name = "CAKE_PRESS_CLEANING")
	private String cakePressCleaning;
	
	@Column(name = "KIER_MACHINE_CLEANING")
	private String kierMachineCleaning;
	
	@Column(name = "HYDRO_MACHINE_CLEANING")
	private String hydroMachineCleaning;
	
	@Column(name = "OPENER_MACHINE_CLEANING")
	private String openerMachineCleaning;
	
	@Column(name = "DRYER_MACHINE_CLEANING")
	private String dryerMachineCleaning;
	
	@Column(name = "METAL_DETECTOR_CLEANING_2")
	private String metalDetectorCleaning2;
	
	@Column(name = "RIETER_MACHINE_CLEANING")
	private String rieterMachineCleaning;
	
	@Column(name = "APPLIED_UNIT_FILTER_BAG_CLEANING_2")
	private String appliedUnitFilterBagCleaning2;
	
	@Column(name = "BALE_PRESS_CLEANING")
	private String balePressCleaning;
	
	@Column(name = "MTF_UNIT_CLEANING")
	private String mtfUnitCleaning;
	
	@Column(name = "REMARKS")
	private String remarks;

	// SUPERVISOR
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

	// HOD
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

	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "VERSION")
	private int version;

}
