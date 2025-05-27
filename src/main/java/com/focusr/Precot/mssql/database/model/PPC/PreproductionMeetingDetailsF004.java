package com.focusr.Precot.mssql.database.model.PPC;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "PPC_PRE_PRODUCTIONS_MEETING_DETAILS_F004", schema = AppConstants.schema)
@Data
public class PreproductionMeetingDetailsF004 {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MEETING_ID")
	private Long meetingid;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PREPRODUCTION_MEETING_ID", nullable = false)
	@JsonBackReference
	private PreProductionMeetingF004 preproductionMeeting;

	// Packaging Details
	@Column(name = "OUTER_CARTON_ARTWORK")
	private String outerCartonArtwork;

	@Column(name = "OUTER_CARTON_ARTWORK_OBSERVATIONS")
	private String outerCartonArtworkObservations;

	@Column(name = "OUTER_CARTON_ARTWORK_SOP")
	private String outerCartonArtworkSOP;

	@Column(name = "OUTER_CARTON_BARCODE")
	private String outerCartonBarcode;

	@Column(name = "OUTER_CARTON_BARCODE_OBSERVATIONS")
	private String outerCartonBarcodeObservations;

	@Column(name = "OUTER_CARTON_BARCODE_SOP")
	private String outerCartonBarcodeSOP;

	@Column(name = "OUTER_CARTON_DIMENSION_LWH")
	private String outerCartonDimensionLWH;

	@Column(name = "OUTER_CARTON_DIMENSION_LWH_OBSERVATIONS")
	private String outerCartonDimensionLWHObservations;

	@Column(name = "OUTER_CARTON_DIMENSION_LWH_SOP")
	private String outerCartonDimensionLWH_SOP;

	@Column(name = "OUTER_CARTON_STAMP")
	private String outerCartonStamp;

	@Column(name = "OUTER_CARTON_STAMP_OBSERVATIONS")
	private String outerCartonStampObservations;

	@Column(name = "OUTER_CARTON_STAMP_SOP")
	private String outerCartonStampSOP;

	@Column(name = "ODOUR")
	private String odour;

	@Column(name = "ODOUR_OBSERVATIONS")
	private String odourObservations;

	@Column(name = "ODOUR_SOP")
	private String odourSOP;

	@Column(name = "INNER_CARTON_ARTWORK")
	private String innerCartonArtwork;

	@Column(name = "INNER_CARTON_ARTWORK_OBSERVATIONS")
	private String innerCartonArtworkObservations;

	@Column(name = "INNER_CARTON_ARTWORK_SOP")
	private String innerCartonArtworkSOP;

	@Column(name = "INNER_CARTON_BARCODE")
	private String innerCartonBarcode;

	@Column(name = "INNER_CARTON_BARCODE_OBSERVATIONS")
	private String innerCartonBarcodeObservations;

	@Column(name = "INNER_CARTON_BARCODE_SOP")
	private String innerCartonBarcodeSOP;

	@Column(name = "INNER_CARTON_DIMENSION_LWH")
	private String innerCartonDimensionLWH;

	@Column(name = "INNER_CARTON_DIMENSION_LWH_OBSERVATIONS")
	private String innerCartonDimensionLWHObservations;

	@Column(name = "INNER_CARTON_DIMENSION_LWH_SOP")
	private String innerCartonDimensionLWH_SOP;

	@Column(name = "INNER_CARTON_STAMP")
	private String innerCartonStamp;

	@Column(name = "INNER_CARTON_STAMP_OBSERVATIONS")
	private String innerCartonStampObservations;

	@Column(name = "INNER_CARTON_STAMP_SOP")
	private String innerCartonStampSOP;

	@Column(name = "BAG_APPEARANCE")
	private String bagAppearance;

	@Column(name = "BAG_APPEARANCE_OBSERVATIONS")
	private String bagAppearanceObservations;

	@Column(name = "BAG_APPEARANCE_SOP")
	private String bagAppearanceSOP;

	@Column(name = "CELLO_TAP_SHAPE")
	private String celloTapShape;

	@Column(name = "CELLO_TAP_SHAPE_OBSERVATIONS")
	private String celloTapShapeObservations;

	@Column(name = "CELLO_TAP_SHAPE_SOP")
	private String celloTapShapeSOP;

	@Column(name = "BAG_ORIENTATION")
	private String bagOrientation;

	@Column(name = "BAG_ORIENTATION_OBSERVATIONS")
	private String bagOrientationObservations;

	@Column(name = "BAG_ORIENTATION_SOP")
	private String bagOrientationSOP;

	@Column(name = "NO_OF_INNER_BOX")
	private String noOfInnerBox;

	@Column(name = "NO_OF_INNER_BOX_OBSERVATIONS")
	private String noOfInnerBoxObservations;

	@Column(name = "NO_OF_INNER_BOX_SOP")
	private String noOfInnerBoxSOP;

	@Column(name = "NO_OF_PACKS_PER_OUTER_BAG")
	private String noOfPacksPerOuterBag;

	@Column(name = "NO_OF_PACKS_PER_OUTER_BAG_OBSERVATIONS")
	private String noOfPacksPerOuterBagObservations;

	@Column(name = "NO_OF_PACKS_PER_OUTER_BAG_SOP")
	private String noOfPacksPerOuterBagSOP;

	@Column(name = "NO_OF_PACKS_PER_INNER_CARTON")
	private String noOfPacksPerInnerCarton;

	@Column(name = "NO_OF_PACKS_PER_INNER_CARTON_OBSERVATIONS")
	private String noOfPacksPerInnerCartonObservations;

	@Column(name = "NO_OF_PACKS_PER_INNER_CARTON_SOP")
	private String noOfPacksPerInnerCartonSOP;

	@Column(name = "NO_OF_PACKS_PER_OUTER_CARTON")
	private String noOfPacksPerOuterCarton;

	@Column(name = "NO_OF_PACKS_PER_OUTER_CARTON_OBSERVATIONS")
	private String noOfPacksPerOuterCartonObservations;

	@Column(name = "NO_OF_PACKS_PER_OUTER_CARTON_SOP")
	private String noOfPacksPerOuterCartonSOP;

	@Column(name = "INNER_BOX_ARTWORK")
	private String innerBoxArtwork;

	@Column(name = "INNER_BOX_ARTWORK_OBSERVATIONS")
	private String innerBoxArtworkObservations;

	@Column(name = "INNER_BOX_ARTWORK_SOP")
	private String innerBoxArtworkSOP;

	@Column(name = "CARTON_BOX_ARTWORK")
	private String cartonBoxArtwork;

	@Column(name = "CARTON_BOX_ARTWORK_OBSERVATIONS")
	private String cartonBoxArtworkObservations;

	@Column(name = "CARTON_BOX_ARTWORK_SOP")
	private String cartonBoxArtworkSop;

	// Bag details
	@Column(name = "OUTER_BAG_ARTWORK")
	private String outerBagArtwork;

	@Column(name = "OUTER_BAG_ARTWORK_OBSERVATIONS")
	private String outerBagArtworkObservations;

	@Column(name = "OUTER_BAG_ARTWORK_SOP")
	private String outerBagArtworkSOP;

	@Column(name = "OUTER_BAG_LOTCODE")
	private String outerBagLotcode;

	@Column(name = "OUTER_BAG_LOTCODE_OBSERVATIONS")
	private String outerBagLotcodeObservations;

	@Column(name = "OUTER_BAG_LOTCODE_SOP")
	private String outerBagLotcodeSOP;

	@Column(name = "OUTER_BAG_BARCODE")
	private String outerBagBarcode;

	@Column(name = "OUTER_BAG_BARCODE_OBSERVATIONS")
	private String outerBagBarcodeObservations;

	@Column(name = "OUTER_BAG_BARCODE_SOP")
	private String outerBagBarcodeSOP;

	@Column(name = "INNER_BAG_ARTWORK")
	private String innerBagArtwork;

	@Column(name = "INNER_BAG_ARTWORK_OBSERVATIONS")
	private String innerBagArtworkObservations;

	@Column(name = "INNER_BAG_ARTWORK_SOP")
	private String innerBagArtworkSOP;

	@Column(name = "INNER_BAG_LOTCODE")
	private String innerBagLotcode;

	@Column(name = "INNER_BAG_LOTCODE_OBSERVATIONS")
	private String innerBagLotcodeObservations;

	@Column(name = "INNER_BAG_LOTCODE_SOP")
	private String innerBagLotcodeSOP;

	@Column(name = "INNER_BAG_BARCODE")
	private String innerBagBarcode;

	@Column(name = "INNER_BAG_BARCODE_OBSERVATIONS")
	private String innerBagBarcodeObservations;

	@Column(name = "INNER_BAG_BARCODE_SOP")
	private String innerBagBarcodeSOP;

	// Parameters
	@Column(name = "CARTON_BOX_GROSS_WT")
	private String cartonBoxGrossWt;

	@Column(name = "CARTON_BOX_GROSS_WT_OBSERVATIONS")
	private String cartonBoxGrossWtObservations;

	@Column(name = "CARTON_BOX_GROSS_WT_SOP")
	private String cartonBoxGrossWtSOP;

	@Column(name = "NET_WT_FILLED_BAG")
	private String netWtFilledBag;

	@Column(name = "NET_WT_FILLED_BAG_OBSERVATIONS")
	private String netWtFilledBagObservations;

	@Column(name = "NET_WT_FILLED_BAG_SOP")
	private String netWtFilledBagSOP;

	@Column(name = "GROSS_WT_FILLED_BAG")
	private String grossWtFilledBag;

	@Column(name = "GROSS_WT_FILLED_BAG_OBSERVATIONS")
	private String grossWtFilledBagObservations;

	@Column(name = "GROSS_WT_FILLED_BAG_SOP")
	private String grossWtFilledBagSOP;

	@Column(name = "COUNT_PER_PACK")
	private String countPerPack;

	@Column(name = "COUNT_PER_PACK_OBSERVATIONS")
	private String countPerPackObservations;

	@Column(name = "COUNT_PER_PACK_SOP")
	private String countPerPackSOP;

	@Column(name = "SHAPE")
	private String shape;

	@Column(name = "SHAPE_OBSERVATIONS")
	private String shapeObservations;

	@Column(name = "SHAPE_SOP")
	private String shapeSOP;

	@Column(name = "SIZE")
	private String size;

	@Column(name = "SIZE_OBSERVATIONS")
	private String sizeObservations;

	@Column(name = "SIZE_SOP")
	private String sizeSOP;

	@Column(name = "PATTERN_SIDE_1")
	private String patternSide1;

	@Column(name = "PATTERN_SIDE_1_OBSERVATIONS")
	private String patternSide1Observations;

	@Column(name = "PATTERN_SIDE_1_SOP")
	private String patternSide1SOP;

	@Column(name = "PATTERN_SIDE_2")
	private String patternSide2;

	@Column(name = "PATTERN_SIDE_2_OBSERVATIONS")
	private String patternSide2Observations;

	@Column(name = "PATTERN_SIDE_2_SOP")
	private String patternSide2SOP;

	@Column(name = "EDGE_CONDITION")
	private String edgeCondition;

	@Column(name = "EDGE_CONDITION_OBSERVATIONS")
	private String edgeConditionObservations;

	@Column(name = "EDGE_CONDITION_SOP")
	private String edgeConditionSOP;

	@Column(name = "FILLING_HEIGHT")
	private String fillingHeight;

	@Column(name = "FILLING_HEIGHT_OBSERVATIONS")
	private String fillingHeightObservations;

	@Column(name = "FILLING_HEIGHT_SOP")
	private String fillingHeightSOP;

	@Column(name = "SPEC_UPDATE_MEDLINE_PORTAL")
	private String specUpdateMedlinePortal;

	@Column(name = "SPEC_UPDATE_MEDLINE_PORTAL_OBSERVATIONS")
	private String specUpdateMedlinePortalObservations;

	@Column(name = "SPEC_UPDATE_MEDLINE_PORTAL_SOP")
	private String specUpdateMedlinePortalSOP;

	@Column(name = "CCP")
	private String ccp;

	@Column(name = "CCP_OBSERVATIONS")
	private String ccpObservations;

	@Column(name = "CCP_SOP")
	private String ccpSOP;

	@Column(name = "REMARKS")
	private String remarks;

	@ElementCollection(fetch = FetchType.LAZY)
	@Column(name = "PARTICIPATE_NAME")
	private List<String> participateName;

	public PreproductionMeetingDetailsF004() {
	}

}
