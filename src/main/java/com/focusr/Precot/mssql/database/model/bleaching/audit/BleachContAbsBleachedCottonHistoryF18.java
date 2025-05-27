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

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "BLEACH_CONT_ABS_BLEACHED_COTTON_HISTORY_F18",schema=AppConstants.schema)
public class BleachContAbsBleachedCottonHistoryF18 extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "DATE")
	private String date;

	@Column(name = "BMR_NO")
	private String bmrNo;

	@Column(name = "QUANTITY")
	private Float quantity;

	@Column(name = "BATCH_NO")
	private Long batchNo;

	@Column(name = "BALE_NO")
	private String baleNo;

	@Column(name = "NO_OF_HAIR")
	private Long noOfHair;

	@Column(name = "REF_HAIR")
	private String refHair;

	@Column(name = "NO_OF_JUTE")
	private Long noOfJute;

	@Column(name = "REF_JUTE")
	private String refJute;

	@Column(name = "NO_OF_COLOUR_THREAD")
	private Long noOfColourThread;

	@Column(name = "REF_COLOUR_THREAD")
	private String refColourThread;

	@Column(name = "NO_OF_WRAPPER")
	private Long noOfWrapper;

	@Column(name = "REF_WRAPPER")
	private String refWrapper;

	@Column(name = "NO_OF_METAL")
	private Long noOfMetal;

	@Column(name = "REF_METAL")
	private String refMetal;

	@Column(name = "NO_OF_RUST")
	private Long noOfRust;

	@Column(name = "REF_RUST")
	private String refRust;

	@Column(name = "NO_OF_PLASTIC")
	private Long noOfPlastic;

	@Column(name = "REF_PLASTIC")
	private String refPlastic;

	@Column(name = "NO_OF_BLACK_COTTON")
	private Long noOfBlackCotton;

	@Column(name = "REF_BLACK_COTTON")
	private String refBlackCotton;
	
	@Column(name = "NO_OF_UNBLEACHED_COTTON")
	private Long noOfUnBleachedCotton;
	
	@Column(name = "REF_UNBLEACHED_COTTON")
	private String refUnBleachedCotton;

	@Column(name = "NO_OF_OIL_COTTON")
	private Long noOfOilCotton;

	@Column(name = "REF_OIL_COTTON")
	private String refOilCotton;

	@Column(name = "NO_OF_SOIL")
	private Long noOfSoil;

	@Column(name = "REF_SOIL")
	private String refSoil;

	@Column(name = "NO_OF_YELLOW_COTTON")
	private Long noOfYellowCotton;

	@Column(name = "REF_YELLOW_COTTON")
	private String refYellowCotton;

	@Column(name = "NO_OF_PAPER")
	private Long noOfPaper;

	@Column(name = "REF_PAPER")
	private String refPaper;

	@Column(name = "NO_OF_STICK")
	private Long noOfStick;

	@Column(name = "REF_STICK")
	private String refStick;

	@Column(name = "NO_OF_FEATHER")
	private Long noOfFeather;

	@Column(name = "REF_FEATHER")
	private String refFeather;

	@Column(name = "NO_OF_CLOTH")
	private Long noOfCloth;

	@Column(name = "REF_CLOTH")
	private String refCloth;

	@Column(name = "NO_OF_WHITE_POLY_PROPYLENE")
	private Long noOfwhitePolyPropylene;

	@Column(name = "REF_WHITE_POLY_PROPYLENE")
	private String refWhitePolyPropylene;

	@Column(name = "NO_OF_COLOUR_POLY_PROPYLENE")
	private Long noOfColourPolyPropylene;

	@Column(name = "REF_COLOUR_POLY_PROPYLENE")
	private String refColourPolyPropylene;

	@Column(name = "NO_OF_RUBBER_PIECE")
	private Long noOfRubberPiece;

	@Column(name = "REF_RUBBER_PIECE")
	private String refRubberPiece;

	@Column(name = "TOTAL")
	private Long total;

	@Column(name = "REF_TOTAL")
	private String refTotal;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "VERSION")
	private int version;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "REMARKS")
	private String remarks;
	
		// SUPERVISIOR STATUS
	
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
	
		// HOD STATUS
	
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
	
}
