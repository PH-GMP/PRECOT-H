package com.focusr.Precot.mssql.database.model.productDevelopment.audit;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;

import lombok.Data;

@Entity
@Table(name = "PRODUCT_DEVELOPMENT_SHEET_HISTORY_F001",schema = AppConstantsproductdevelopment.schema
)
@Data
public class ProductDevelopmentSheetHistoryF001 extends UserDateAudit {
	
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "ID")
	    private Long id;
	 
	    @Column(name = "FORMAT")
		private String format;
		
		@Column(name = "FORMAT_NO")
		private String format_no;
		
		@Column(name = "REF_SOP_NO")
		private String ref_sop_no;
		
		@Column(name = "UNIT")
		private String unit;
	
	    @Column(name = "PDS_NO")
	    private String pdsNo;

	    @Column(name = "REV_NO")
	    private String revisionNo;
	    
	    @Column(name = "REV_DATE")
	    private String revisionDate;
	    
	    @Column(name = "PDS_EFFECTIVEDATE")
	    private String PdseffectiveDate;

	    
	    @Column(name = "PRODUCT_DESCRIPTION")
	    private String productDescription;

	    @Column(name = "CUSTOMER_NAME")
	    private String customerName;

	    @Column(name = "PRODUCT_CODE")
	    private String productCode;

	    @Column(name = "BRAND")
	    private String brand;

	    @Column(name = "COUNTRY")
	    private String country;
	    
	    
	    @Column(name = "MIXING_RATIO")
	    private String mixingRatio;

	    @Column(name = "SAMPLE_REQUISITION_NO")
	    private String sampleRequisitionNo;
	    
	    @Column(name = "CUSTOMER_COMMENTS")
	    private String CustomerComment;

	    
//	    PRODUCT DETAILS --- A
	   
	
	    @Column(name = "SHAPE")
	    private String shapeSpecification;
	    
	    @Column(name = "SHAPE_TOLERENCE")
	    private String shapeTolerence;
	    
	
	    @Column(name = "SIZE")
	    private String size;
	    
	    @Column(name = "SIZE_LIMIT")
	    private String sizelimit;
	    
	    @Column(name = "SIZE_MIN")
	    private String sizeMin;
	    
	    @Column(name = "SIZE_MAX")
	    private String sizeMax;


	    @Column(name = "COUNT_PER_PACK")
	    private String countPerPack;
	    
	    @Column(name = "COUNT_PER_PACK_MIN")
	    private String countPerPackMin;

	    @Column(name = "COUNT_PER_PACK_MAX")
	    private String countPerPackMax;

	    @Column(name = "COUNT_PER_PACK_LIMIT")
	    private String countPerPackLimit;
	    
	    // No. of Packs per Inner Carton (Nos)
	    @Column(name = "PACKS_PER_INNER_CARTON")
	    private String packsPerInnerCarton;

	    @Column(name = "PACKS_PER_INNER_CARTON_MIN")
	    private String packsPerInnerCartonMin;

	    @Column(name = "PACKS_PER_INNER_CARTON_MAX")
	    private String packsPerInnerCartonMax;

	    @Column(name = "PACKS_PER_INNER_CARTON_LIMIT")
	    private String packsPerInnerCartonLimit;

	    // No. of Inner per Outer Carton (Nos)
	    @Column(name = "INNER_PER_OUTER_CARTON")
	    private String innerPerOuterCarton;

	    @Column(name = "INNER_PER_OUTER_CARTON_MIN")
	    private String innerPerOuterCartonMin;

	    @Column(name = "INNER_PER_OUTER_CARTON_MAX")
	    private String innerPerOuterCartonMax;

	    @Column(name = "INNER_PER_OUTER_CARTON_LIMIT")
	    private String innerPerOuterCartonLimit;

	    // No. Packs per Outer Carton (Nos)
	    @Column(name = "PACKS_PER_OUTER_CARTON")
	    private String packsPerOuterCarton;

	    @Column(name = "PACKS_PER_OUTER_CARTON_MIN")
	    private String packsPerOuterCartonMin;

	    @Column(name = "PACKS_PER_OUTER_CARTON_MAX")
	    private String packsPerOuterCartonMax;

	    @Column(name = "PACKS_PER_OUTER_CARTON_LIMIT")
	    private String packsPerOuterCartonLimit;

	    @Column(name = "GSM")
	    private String gsm;
	    
	    @Column(name = "GSM_LIMIT")
	    private String gsmLimit;
	    
	    @Column(name = "GSM_MAX")
	    private String gsmMax;
	    
	    @Column(name = "GSM_MIN")
	    private String gsmMin;
	    
	    
	    @Column(name = "SIDE_1_PATTERN")
	    private String side1Pattern;

	    @Column(name = "SIDE_2_PATTERN")
	    private String side2Pattern;
	    
	    
	    

	    @Column(name = "SIDE_1_PATTERN_TOLERANCE")
	    private String side1Patterntolerance;

	    @Column(name = "SIDE_2_PATTERN_TOLERANCE")
	    private String side2Patterntolerance;

	

	    @Column(name = "PRODUCT_SIZE")
	    private String productSize;

	    
	    @Column(name = "PRODUCT_TOLERANCE")
	    private String producttolerance;
	    
	 

	    // SKU Details Section (Weight in grams) --- B
	    @Column(name = "WT_INNER_EMPTY_BAG")
	    private String weightInnerEmptyBag;

	    @Column(name = "WT_INNER_EMPTY_BAG_MIN")
	    private String weightInnerEmptyBagMin;

	    @Column(name = "WT_INNER_EMPTY_BAG_MAX")
	    private String weightInnerEmptyBagMax;

	    @Column(name = "WT_INNER_EMPTY_BAG_LIMIT")
	    private String weightInnerEmptyBagLimit;

	    // Weight of Outer Empty Bag
	    @Column(name = "WT_OUTER_EMPTY_BAG")
	    private String weightOuterEmptyBag;

	    @Column(name = "WT_OUTER_EMPTY_BAG_MIN")
	    private String weightOuterEmptyBagMin;

	    @Column(name = "WT_OUTER_EMPTY_BAG_MAX")
	    private String weightOuterEmptyBagMax;

	    @Column(name = "WT_OUTER_EMPTY_BAG_LIMIT")
	    private String weightOuterEmptyBagLimit;

	    // Weight of Empty Inner Carton
	    @Column(name = "WT_EMPTY_INNER_CARTON")
	    private String weightEmptyInnerCarton;

	    @Column(name = "WT_EMPTY_INNER_CARTON_MIN")
	    private String weightEmptyInnerCartonMin;

	    @Column(name = "WT_EMPTY_INNER_CARTON_MAX")
	    private String weightEmptyInnerCartonMax;

	    @Column(name = "WT_EMPTY_INNER_CARTON_LIMIT")
	    private String weightEmptyInnerCartonLimit;

	    // Weight of Empty Outer Carton
	    @Column(name = "WT_EMPTY_OUTER_CARTON")
	    private String weightEmptyOuterCarton;

	    @Column(name = "WT_EMPTY_OUTER_CARTON_MIN")
	    private String weightEmptyOuterCartonMin;

	    @Column(name = "WT_EMPTY_OUTER_CARTON_MAX")
	    private String weightEmptyOuterCartonMax;

	    @Column(name = "WT_EMPTY_OUTER_CARTON_LIMIT")
	    private String weightEmptyOuterCartonLimit;

	    // Net Weight of Filled Pack
	    @Column(name = "NET_WT_FILLED_PACK")
	    private String netWtFilledPack;

	    @Column(name = "NET_WT_FILLED_PACK_MIN")
	    private String netWtFilledPackMin;

	    @Column(name = "NET_WT_FILLED_PACK_MAX")
	    private String netWtFilledPackMax;

	    @Column(name = "NET_WT_FILLED_PACK_LIMIT")
	    private String netWtFilledPackLimit;

	    // Gross Weight of Filled Pack
	    @Column(name = "GROSS_WT_FILLED_PACK")
	    private String grossWtFilledPack;

	    @Column(name = "GROSS_WT_FILLED_PACK_MIN")
	    private String grossWtFilledPackMin;

	    @Column(name = "GROSS_WT_FILLED_PACK_MAX")
	    private String grossWtFilledPackMax;

	    @Column(name = "GROSS_WT_FILLED_PACK_LIMIT")
	    private String grossWtFilledPackLimit;

	    // Net Weight of Filled Inner Carton
	    @Column(name = "NET_WT_FILLED_INNER_CARTON")
	    private String netWtFilledInnerCarton;

	    @Column(name = "NET_WT_FILLED_INNER_CARTON_MIN")
	    private String netWtFilledInnerCartonMin;

	    @Column(name = "NET_WT_FILLED_INNER_CARTON_MAX")
	    private String netWtFilledInnerCartonMax;

	    @Column(name = "NET_WT_FILLED_INNER_CARTON_LIMIT")
	    private String netWtFilledInnerCartonLimit;

	    // Gross Weight of Filled Inner Carton
	    @Column(name = "GROSS_WT_FILLED_INNER_CARTON")
	    private String grossWtFilledInnerCarton;

	    @Column(name = "GROSS_WT_FILLED_INNER_CARTON_MIN")
	    private String grossWtFilledInnerCartonMin;

	    @Column(name = "GROSS_WT_FILLED_INNER_CARTON_MAX")
	    private String grossWtFilledInnerCartonMax;

	    @Column(name = "GROSS_WT_FILLED_INNER_CARTON_LIMIT")
	    private String grossWtFilledInnerCartonLimit;

	    // Net Weight of Filled Outer Carton
	    @Column(name = "NET_WT_FILLED_OUTER_CARTON")
	    private String netWtFilledOuterCarton;

	    @Column(name = "NET_WT_FILLED_OUTER_CARTON_MIN")
	    private String netWtFilledOuterCartonMin;

	    @Column(name = "NET_WT_FILLED_OUTER_CARTON_MAX")
	    private String netWtFilledOuterCartonMax;

	    @Column(name = "NET_WT_FILLED_OUTER_CARTON_LIMIT")
	    private String netWtFilledOuterCartonLimit;

	    // Gross Weight of Filled Outer Carton
	    @Column(name = "GROSS_WT_FILLED_OUTER_CARTON")
	    private String grossWtFilledOuterCarton;

	    @Column(name = "GROSS_WT_FILLED_OUTER_CARTON_MIN")
	    private String grossWtFilledOuterCartonMin;

	    @Column(name = "GROSS_WT_FILLED_OUTER_CARTON_MAX")
	    private String grossWtFilledOuterCartonMax;

	    @Column(name = "GROSS_WT_FILLED_OUTER_CARTON_LIMIT")
	    private String grossWtFilledOuterCartonLimit;
	    
	    
	    // Primary Packaging Details - Film & Bag --A

	    @Column(name = "P_FILM_TYPE")
	    private String primaryfilmType;

	    @Column(name = "P_FILM_THICKNESS_MICRON")
	    private String primaryfilmThicknessMicron;

	    @Column(name = "P_FILM_THICKNESS_MICRON_LIMIT")
	    private String primaryfilmThicknessMicronLimit;

	    @Column(name = "P_FILM_THICKNESS_MICRON_MIN")
	    private String primaryfilmThicknessMicronMin;

	    @Column(name = "P_FILM_THICKNESS_MICRON_MAX")
	    private String primaryfilmThicknessMicronMax;

	    @Column(name = "P_BAG_TYPE")
	    private String primarybagType;

	    @Column(name = "P_BAG_DIMENSION")
	    private String primarybagDimension;
	   
	    
	    // Secondary Packaging Details - Film & Bag --B

	    @Column(name = "FILM_TYPE")
	    private String filmType;

	    @Column(name = "FILM_THICKNESS_MICRON")
	    private String filmThicknessMicron;

	    @Column(name = "FILM_THICKNESS_MICRON_LIMIT")
	    private String filmThicknessMicronLimit;

	    @Column(name = "FILM_THICKNESS_MICRON_MIN")
	    private String filmThicknessMicronMin;

	    @Column(name = "FILM_THICKNESS_MICRON_MAX")
	    private String filmThicknessMicronMax;

	    @Column(name = "BAG_TYPE")
	    private String bagType;

	    @Column(name = "BAG_DIMENSION")
	    private String bagDimension;
	    
	    
//	    Packing Requirement --- F
	    @Column(name = "INNER_BAG")
	    private String innerbag;
	    
	    @Column(name = "OUTER_BAG")
	    private String outerbag;
	    
	    @Column(name = "INNER_CARTON")
	    private String innercarton;
	    
	    @Column(name = "OUTER_CARTON")
	    private String outercarton;
	    
	    @Column(name = "BOPP_TAPE")
	    private String bopptape;
	    
	    // Lot Coding System & Customer Requirements -- G
	    
	 // Inner Carton Coding

	    @Column(name = "JULIAN_CODING_INNER_CARTON")
	    private String julianCodingInnerCarton;

	    @Column(name = "PO_NO_INNER_CARTON")
	    private String poNoInnerCarton;

	    @Column(name = "MFG_DATE_INNER_CARTON")
	    private String mfgDateInnerCarton;

	    @Column(name = "EXPIRY_DATE_INNER_CARTON")
	    private String expiryDateInnerCarton;

	    @Column(name = "PRINT_LOCATION_INNER_CARTON")
	    private String printLocationInnerCarton;

	    @Column(name = "LOT_CODE")
	    private String lotCode;
	    
	    @Column(name = "MRP")
	    private String mrp;

	    @Column(name = "USP")
	    private String usp;

	    @Column(name = "CUSTOMER_JULIAN_CODING")
	    private String customerJulianCoding;

	    @Column(name = "PO_NO_OUTER_BAG")
	    private String poNoOuterBag;

	    @Column(name = "MFG_DATE_OUTER_BAG")
	    private String mfgDateOuterBag;

	    @Column(name = "EXPIRY_DATE_OUTER_BAG")
	    private String expiryDateOuterBag;

	    @Column(name = "PRINT_LOCATION_OUTER_BAG")
	    private String printLocationOuterBag;
	    
	    @Column(name = "PO_NO_OUTER_CARTON")
	    private String poNoOuterCarton;

	    @Column(name = "MFG_DATE_OUTER_CARTON")
	    private String mfgDateOuterCarton;

	    @Column(name = "EXPIRY_DATE_OUTER_CARTON")
	    private String expiryDateOuterCarton;

	    @Column(name = "PRINT_LOCATION_OUTER_CARTON")
	    private String printLocationOuterCarton;
	    
	   @Column(name = "NOTES_FOR_REQURIMENT")
	    private String NotesofRequirment;
	    
	    
	    

	    
	    
	    

	    // Inner Carton Details -C

	    @Column(name = "INNER_CARTON_TYPE")
	    private String innercartonType;

	    @Column(name = "INNER_DIMENSION_OUTER_MM")
	    private String innerdimensionOuterMm;

	    @Column(name = "INNER_NO_OF_PLY")
	    private String innernumberOfPly;
	    
	    @Column(name = "INNER_FLUTE")
	    private String innerflute;
	    
	    @Column(name = "INNER_BURSTING_STRENGHT")
	    private String innerburstingstrenght;
	    
	    @Column(name = "INNER_BOARD_GSM")
	    private String innerboardgsm;
	    
//	    OUTERCARTON --- D
	    
	    @Column(name = "OUTER_CARTON_TYPE")
	    private String outercartonname;
	    

	    
	    @Column(name = "DIMENSION_OUTER_MM")
	    private String outerdimensionOuterMm;

	    @Column(name = "NO_OF_PLY")
	    private String outernumberOfPly;
	    
	    @Column(name = "FLUTE")
	    private String outerflute;
	    
	    @Column(name = "OUTER_BURSTING_STRENGHT")
	    private String outerburstingstrenght;
	    
	    @Column(name = "OUTER_BOARD_GSM")
	    private String outerboardgsm;
	    
	    @Column(name = "PLY_COLOR_1")
	    private String plycolor1;
	    
	    @Column(name = "PLY_COLOR_2")
	    private String plycolor2;
	    
	    @Column(name = "PLY_COLOR_3")
	    private String plycolor3;
	    
	    
//	    Sealing Quality -- E
	    
	    @Column(name = "BAG_SEAL")
	    private String bagseal;
	    
	    @Column(name = "CARTON_SEAL")
	    private String cartonseal;
	    
//	    STICKER_REQUIRMENTS--  H
	    
	    
	    @Column(name = "BARCODE_STICKER")
	    private String barcodesticker;
	    
	    @Column(name = "PLAIN_BOX_STICKER")
	    private String plainboxsticker;
	    
	    
	    
	    
//	    PACKING METHOD ---- I
	    
	    @Column(name = "ALIGNMENT_OF_INNER_CARTON")
	    private String alighmentofinnercarton;
	    
	    @Column(name = "ORIENTATION_OF_INNER_CARTON")
	    private String orienatationofinnercarton;
	    
	    @Column(name = "ALIGNMENT_OF_PACKS")
	    private String alighmentofpacks;
	    
	    @Column(name = "ORIENTATION_OF_PACKS")
	    private String orientationofpacks;
	    
	    @Column(name = "NATURE_OF_CHANGE")
	    private String Natureofchange;
	    

	    

	   
	    
	 // Development Supervisor Details
	    @Column(name = "DEVELOPMENTSUPERVISOR_STATUS")
	    private String developmentSupervisorStatus;

	

	    @Column(name = "DEVELOPMENTSUPERVISOR_SUBMIT_ON")
	    private Date developmentSupervisorSubmitOn;

	    @Column(name = "DEVELOPMENTSUPERVISOR_SUBMIT_BY")
	    private String developmentSupervisorSubmitBy;

	    @Column(name = "DEVELOPMENTSUPERVISOR_SUBMIT_ID")
	    private Long developmentSupervisorSubmitId;

	    @Column(name = "DEVELOPMENTSUPERVISOR_SIGN")
	    private String developmentSupervisorSign;

	    // QC (HOD) Details
	    @Column(name = "QC_STATUS")
	    private String qcStatus;

	    @Column(name = "QC_SUBMIT_ON")
	    private Date qcSubmitOn;

	    @Column(name = "QC_SUBMIT_BY")
	    private String qcSubmitBy;

	    @Column(name = "QC_SUBMIT_ID")
	    private Long qcSubmitId;

	    @Column(name = "QC_SIGN")
	    private String qcSign;

	    @Column(name = "QC_MAIL_STATUS")
	    private String qcMailStatus;


		// Qa
	    
	    
	    @Column(name = "QA_STATUS")
	    private String qa_Status;

		@Column(name = "QA_SUBMIT_ON")
		private Date qa_submit_on;

		@Column(name = "QA_SUBMIT_BY")
		private String qa_submit_by;

		@Column(name = "QA_SUBMIT_ID")
		private Long qa_submit_id;

		@Column(name = "QA_SIGN")
		private String qa_sign;
		
		@Column(name = "QA_MAIL_STATUS")
		private String qa_mail_status;
		
		// PPC_HOD Fields
		
		@Column(name = "PPC__STATUS")
		private String ppc_status;
		
		
		@Column(name = "PPC_SUBMIT_ON")
		private Date ppc_submit_on;

		@Column(name = "PPC_SUBMIT_BY")
		private String ppc_submit_by;

		@Column(name = "PPC_SUBMIT_ID")
		private Long ppc_submit_id;

		@Column(name = "PPC_SIGN")
		private String ppc_sign;

		
		
		
		

		// Bleaching Fields
		@Column(name = "BLEACHING_SUBMIT_ON")
		private Date bleaching_submit_on;

		@Column(name = "BLEACHING_SUBMIT_BY")
		private String bleaching_submit_by;

		@Column(name = "BLEACHING_SUBMIT_ID")
		private Long bleaching_submit_id;

		@Column(name = "BLEACHING_SIGN")
		private String bleaching_sign;

		@Column(name = "BLEACHING_STATUS")
		private String bleaching_status;

		// Spunlace Fields
		@Column(name = "SPUNLACE_SUBMIT_ON")
		private Date spunlace_submit_on;

		@Column(name = "SPUNLACE_SUBMIT_BY")
		private String spunlace_submit_by;

		@Column(name = "SPUNLACE_SUBMIT_ID")
		private Long spunlace_submit_id;

		@Column(name = "SPUNLACE_SIGN")
		private String spunlace_sign;

		@Column(name = "SPUNLACE_STATUS")
		private String spunlace_status;

		// Pad Punching Fields
		@Column(name = "PAD_PUNCHING_SUBMIT_ON")
		private Date pad_punching_submit_on;

		@Column(name = "PAD_PUNCHING_SUBMIT_BY")
		private String pad_punching_submit_by;

		@Column(name = "PAD_PUNCHING_SUBMIT_ID")
		private Long pad_punching_submit_id;

		@Column(name = "PAD_PUNCHING_SIGN")
		private String pad_punching_sign;

		@Column(name = "PAD_PUNCHING_STATUS")
		private String pad_punching_status;

		// Dry Goods Fields
		@Column(name = "DRY_GOODS_SUBMIT_ON")
		private Date dry_goods_submit_on;

		@Column(name = "DRY_GOODS_SUBMIT_BY")
		private String dry_goods_submit_by;

		@Column(name = "DRY_GOODS_SUBMIT_ID")
		private Long dry_goods_submit_id;

		@Column(name = "DRY_GOODS_SIGN")
		private String dry_goods_sign;

		@Column(name = "DRY_GOODS_STATUS")
		private String dry_goods_status;

		
      @Column(name = "VERSION")
	  private int version;
      
      @Column(name = "REASON")
      private String reason;
	    

	 

}
