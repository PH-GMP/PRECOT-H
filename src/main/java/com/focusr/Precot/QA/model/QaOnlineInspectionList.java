package com.focusr.Precot.QA.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_INPROCESS_INSPECTION_REPORT_F034", schema = AppConstants.schema)
public class QaOnlineInspectionList {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;

	
	//common
	
	@Column(name = "TIME")
	private String time;
	
	@Column(name = "LOT_SIZE")
	private String lotSize;
	
	@Column(name = "SAMPLE_SIZE")
	private String sampleSize;
	
	
	//34
	
	@Column(name = "WRONG_MISSING_FGNO34")
	private String wrongBoxFixed34;
	
	@Column(name = "INSECT_CONTAMINATION34")
	private String insectContamination34;
	
	@Column(name = "METAL_CONTAMINATION34")
	private String metalContamination34;
	
	@Column(name = "LESS_COUNT_WEIGHT_PER_BAG34")
	private String lessCountWeightPerBag34;
	
	//major
	
	@Column(name = "CUT_PADS34")
	private String cutPads34;
	
	@Column(name = "IMPROPER_OPEN_DAMAGED_SEALING34")
	private String improperOpenDamagedSealing34;
	
	@Column(name = "DIRT_DUST_CONTAMINATION34")
	private String DirtDustContamination34;
	
	@Column(name = "PASTIC_CONTAMINATION34")
	private String plasticContamination34;
	
	@Column(name = "HAIR_CONTAMINATION34")
	private String hairContamination34;
	
	@Column(name = "LOWER_HIGHER_FILLING_HEIGHT_LESS_DIA34")
	private String lowerHigherFillingHeightLessData34;
	
	@Column(name = "IMPROPER_PAD_ALLIGNMENT34")
	private String improperPadAllignment34;
	
	//minor
	
	@Column(name = "BLACK_CONTAMINATION34")
	private String blackContamintion;
	
	@Column(name = "COLOUR_CONTAMINATION34")
	private String coloutContamination34;
	
	@Column(name = "EDGE_CONDITION34")
	private String edgeCondition34;
	
	@Column(name = "FOLDED_PADS34")
	private String folderPads34;
	
	@Column(name = "IMPROPER_OR_ILLEGIBLE_PRINTING_OF_FGNO34")
	private String improperOrIllegiblePrintingOfFgNo34;
	
	
	
	//35
	
	//critical
	
	@Column(name = "WRONG_MISSING_FGNO35")
	private String wrongBoxFixed35;
	
	@Column(name = "INSECT_CONTAMINATION35")
	private String insectContamination35;
	
	@Column(name = "METAL_CONTAMINATION35")
	private String metalContamination35;
	
	@Column(name = "LESS_COUNT35")
	private String lessCount35;
	
	@Column(name = "MAJOR_DISCOLOURATION_BREAKAGE35")
	private String majorDiscolourationBreakage35;
	
	@Column(name = "SERRATION35")
	private String serration35;
	
	//major
	
	@Column(name = "IMPROPER_OPEN_DAMAGED_SEALING35")
	private String improperOpenDamagedSealing35;
	
	@Column(name = "DIRT_DUST_CONTAMINATION35")
	private String DirtDustContaminatio35n;
	
	@Column(name = "PASTIC_CONTAMINATION35")
	private String plasticContamination35;
	
	@Column(name = "HAIR_CONTAMINATION35")
	private String hairContamination35;
	
	@Column(name = "NO_COTTON_AT_END_LESS_BONDING_STRENGTH35")
	private String noCottonAtEndLessBondingStrength35;
	
	@Column(name = "SHAPE_OR_COMPACTNESS_OF_BALLS_NOT_CORRECT35")
	private String shapeOrCompactnessOfBallsNotCorrect35;
	
	//Minor
	
	@Column(name = "BLACK_CONTAMINATION35")
	private String blackContamination35;
	
	@Column(name = "COLOUR_CONTAMINATION35")
	private String colourContamination35;
	
	@Column(name = "LESS_WEIGHT_SLIVER_DEFECT35")
	private String lessWeightSliverDefect35;
	
	@Column(name = "LOOSE_COTTON_LESS_COTTON35")
	private String looseCottonLessCotton35;
	
	@Column(name = "IMPROPER_OR_ILLEGIBLE_PRINTING_FGNO35")
	private String improperOrIllegiblePrintingFgNo35;
	
	
	
	//36
	
		//critical
		
		@Column(name = "SHARP_OR_BROKEN_STICKS36")
		private String sharpOrBrokenSticks36;
		
		@Column(name = "INSECT_METAL_CONTAMINATION36")
		private String insectMetalContaminations36;
		
		@Column(name = "ADHESIVES36")
		private String adhesives36;
		
		@Column(name = "LESS_COUNT36")
		private String lessCount36;
		
		@Column(name = "WRONG_MISSING_FGNO36")
		private String wrongMissingFgNo36;
		
		
		
		//major
		
		@Column(name = "LOOSE_COTTON_TIP36")
		private String looseCottonTip36;
		
		@Column(name = "IRREGULAR_TIP_SHARP36")
		private String irregularTipSharp36;
		
		@Column(name = "PLASTIC_WOOD_CONTAMINATION36")
		private String plasticWoodContamination36;
		
		@Column(name = "HAIR_CONTAMINATION36")
		private String hairContamination36;
		
		@Column(name = "WEAK_STICK36")
		private String weakStick36;
		
		@Column(name = "COMPACTNESS_OF_BUDS_NOT_CORRECT36")
		private String compactnessOfBudsNotCorrect36;
		
		//Minor
		
		@Column(name = "UNEVEN_COTTON_COVERAGE36")
		private String unevenCottonCoverage36;
		
		@Column(name = "COLOUR_CONTAMINATION36")
		private String colourContamination36;
		
		@Column(name = "SMALL_SURFACE_DEFECTS36")
		private String smallSurfaceDefects36;
		
		@Column(name = "LOOSE_COTTON_LESS_COTTON36")
		private String looseCottonLessCotton36;
		
		@Column(name = "IMPROPER_OR_ILLEGIBLE_PRINTING_FGNO36")
		private String improperOrIllegiblePrintingFgNo36;
	
	    @Column(name = "RESULT")
	    private String result;
	
	    @Column(name = "INSPECTION_ID")
		private Long inspectionId;
}
