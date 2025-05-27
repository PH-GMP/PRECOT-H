package com.focusr.Precot.mssql.database.model.splunance.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.mssql.database.model.SpunlaceSaveSumbitSupervisor;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_MACHINE_CLEANING_RECORD_HISTORY_F023", schema = AppConstants.schema)
public class MachineCleaningRecordHistoryF023 extends SpunlaceSaveSumbitSupervisor{


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RECORD_ID")
	private Long recordId;
	
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
	
//	BO , WBO 
	@Column(name = "BO_FEED_TABLE")
	private String boFeedTable;
	
	@Column(name = "BO_MID_TABLE")
	private String boMidTable;
	
//	FO/PO
	@Column(name = "FO_FEED_ROLLER")
	private String foFeedRoller;
	
	@Column(name = "FO_BEATER")
	private String foBeater;
	
	@Column(name = "FO_PERFORATED_PLATES")
	private String foPerforatedPlate;
	
//	RIETER1&2
	@Column(name = "RIETER_CHUTE_CLEAN")
	private String rieterChuteClean;
	
	@Column(name = "RIETER_FLATS_CLEAN")
	private String rieterFlatsClean;
	
	@Column(name = "RIETER_DOFFER_CLEAN")
	private String rieterDofferClean;
	
//	ALC1&2
	@Column(name = "ALC_CHUTE_CLEAN")
	private String alcChuteClean;
	
	@Column(name = "ALC_MICRODUST_CLEAN")
	private String alcMicrodustClean;
	
	@Column(name = "ALC_MESHBELT_CLEAN")
	private String alcMeshBeltClean;
	
	@Column(name = "ALC_EXHAUST_DUST_CLEAN")
	private String alcExhaustHMeshClean;
	
	@Column(name = "ALC_COLLECTING_BELT_CLEAN")
	private String alcCollectngBeltClean;
	
	@Column(name = "ALC_PLATFORM")
	private String alcPlatform;
	
//	Jetlace
	@Column(name = "JETLACE_BELTS")
	private String jetlaceBelts;
	
	@Column(name = "JETLACE_DRUMS")
	private String jetlaceDrums;
	
//	Dryer
	@Column(name = "DRYER_FEED_ROLLERS")
	private String dryerFeedRollers;
	
	@Column(name = "DRYER_DRUMS")
	private String dryerDrums;
	
//	Winder
	@Column(name = "WINDER_SROLLERS")
	private String winderSRollers;
	
	@Column(name = "WINDER_DRUM")
	private String winderDrum;
	
//	RP Bale press
	@Column(name = "RP_FEED_ROLLER")
	private String rpFeedRoller;
	
	@Column(name = "RP_BEATER")
	private String rpBeater;
	
	@Column(name = "RP_PERFORATED_PLATES")
	private String rpPerforatedPlates;
	
	@Column(name = "REASON")
	private String reason;

	@Column(name = "VERSION")
	private int version;
}
