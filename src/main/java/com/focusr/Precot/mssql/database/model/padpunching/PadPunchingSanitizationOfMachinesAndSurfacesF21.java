package com.focusr.Precot.mssql.database.model.padpunching;

import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.SpunlaceSaveSumbitSupervisor;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_F21", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "MACHINE_NAME", "WEEK_NO","MONTH","YEAR" }) })
public class PadPunchingSanitizationOfMachinesAndSurfacesF21 extends SpunlaceSaveSumbitSupervisor {
	
	@Id
	@Column(name = "SANITIZATION_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long sanitizationId;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;
	
	@Column(name= "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "REVISION_NUMBER")
	private String revisionNo;
	
	@Column(name = "SOP_NUMBER")
	private String sopNumber;
	
	@Column(name="MACHINE_NAME")
	private String machineName;
	
	@Column(name="WEEK_NO")
	private String weekNo;
	
	@Column(name="DATE")
	private String Date;
	
	@Column(name="MONTH")
	private String month;
	
	@Column(name="YEAR")
	private String year;
	
	@Column(name="NAME_OF_CHEMICAL")
	private String nameOfChemical;
	
	@Column(name="CHEMICAL_BATCH_NUMBER")
	private String chemicalBatchNumber;
	
	@Column(name="EXP_DATE")
	private String expDate;
	
	@Column(name="ROLL_FEEDING_AREA_CONVEYOR")
	private String rollFeedingAreaConveyor;
	
	@Column(name="PUNCHING_TOOLS")
	private String punchingTools;
	
	@Column(name="TOOLS_DIES_SURFACES")
	private String toolsDiesSurfaces;
	
	@Column(name="TRAVEL_ROLLERS")
	private String travelRollers;
	
	@Column(name="CARRIERS_WAGON_MAGAZINE")
	private String carriersWagonMagazine;
	
	@Column(name="PUSHERS")
	private String pushers;
	
	@Column(name="CHUTE_FOR_FALU")
	private String chuteForFalu;
	
	@Column(name="CUTTING_TABLE")
	private String cuttingTable;
	
	@Column(name="CUTTING_BLADES")
	private String cuttingBlades;
	
	@Column(name="ALL_PACKING_TABLES")
	private String allPackingTables;
	
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name="SANITIZED_BY")
	private String sanitizedBy;
	
	@Column(name = "REASON")
	private String reason;
	
	
	

}
