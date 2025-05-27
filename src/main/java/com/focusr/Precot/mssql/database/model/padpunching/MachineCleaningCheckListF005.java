package com.focusr.Precot.mssql.database.model.padpunching;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.SaveSubmitSupervisorHod;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PADPUNCHING_MACHINE_CLEANING_CHECK_LIST_F005",schema=AppConstants.schema,uniqueConstraints = {
		@UniqueConstraint(columnNames = {"DATE","MACHINE_NAME"})})
public class MachineCleaningCheckListF005 extends SaveSubmitSupervisorHod{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LIST_ID")
	private Long listId;
	
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
	
//	@Column(name = "SHIFT")
//	private String shift;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "MACHINE_NAME")
	private String machineName;
	
	@Column(name = "FREQUENCY")
	private String frequency;
	
	@Column(name = "PUNCHING_UNIT_PARTS")
    private String punchingUnitParts;

    @Column(name = "PAD_PUSHER")
    private String padPusher;

    @Column(name = "PAD_EJECTOR")
    private String padEjector;

    @Column(name = "PAD_TRANSPORT_WAGON")
    private String padTransportWagon;

    @Column(name = "CLEANING_OF_GREASE")
    private String cleaningOfGrease;

    @Column(name = "CRITICAL_SENSORS")
    private String criticalSensors;

    @Column(name = "ROLL_UNWINDING_CONVEYOR")
    private String rollUnwindingConveyor;

    @Column(name = "SEALING_BAG_OUT_FEED_CONVEYOR")
    private String sealingBagOutFeedConveyor;

    @Column(name = "TRIM_COLLECTION_TANK")
    private String trimCollectionTank;

    @Column(name = "CHILLER_UNIT_FILTER")
    private String chillerUnitFilter;

    @Column(name = "CLEANING_CARRIER")
    private String cleaningCarrier;

    @Column(name = "BAG_MAGAZINE")
    private String bagMagazine;

    @Column(name = "CLEANED_BY")
    private String cleanedBy;
    
    @Column(name = "REMARKS")
	private String remarks;	
	
	@Column(name = "REASON")
	private String reason;
	
}
