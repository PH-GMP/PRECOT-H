package com.focusr.Precot.QA.model;

import java.util.Date;
import java.util.List;

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

import lombok.Data;

@Data
@Entity
@Table(name = "QA_FINAL_INSPECTION_REPORT_F037", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = {  "DATE", "SHIFT","BMR_NO", "PORDER", "DEPT_NAME" }) })

public class FinalInspectionReportF037 extends UserDateAudit{	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FINALINSPECTION_ID")
	private Long finalInspectionId;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "PRODUCT_DESCRIPTION")
	private String productDescription;
	
	@Column(name = "SHIFT")
	private String shift;

	@Column(name = "BMR_NO")
	private String bmrNo;
	
	@Column(name = "FIR_NO")
	private String firNo;
	
	@Column(name = "CUSTOMER_NAME")
	private String customerName;

	@Column(name = "PORDER")
	private String pOrder;

	@Column(name = "DATE")
	private String date;
	
	@Column(name = "TOTAL_QUANTITY")
	private String totalQantity;
	
	@Column(name = "ITEM_CODE")
	private String itemCode;
	
	@Column(name = "FG_NO")
	private String fgNo;
	
	@Column(name = "AQL_SAMPLE_SIZE")
	private String aqlSampleSize;

	@Column(name = "LOT_NO")
	private String lotNo;
	
	@Column(name = "GENERALINSPECTION_LEVEL")
	private String generalInspectionLevel;
	
	@Column(name = "DEPT_NAME")
	private String deptName;
	
//	PARAMETERS
	
//	SPECIFICATION
	
	@Column(name = "QTYBAG_SPECIFICATION")
	private String qtyBagSpecification;
	
	@Column(name = "WEIGHTBAG_SPECIFICATION")
	private String weightBagSpecification;
	
	@Column(name = "FILLINGHEIGHT_SPECIFICATION")
	private String fillingHeightSpecification;
	
	@Column(name = "GSMWEIGHT_SPECIFICATION")
	private String gsmWeightOfBallsSpecification;
	
	@Column(name = "SURFACEPATTERN_SPECIFICTION")
	private String surfacePatternSpecification;
	
	@Column(name = "NOOFFOLDS_SPECIFICATION")
	private String noOfFoldsSpecification;
	
	@Column(name = "MOISTURE_SPECIFICATION")
	private String moistureSpecification;
	
	
	
//	SAMPLE SIZE
	
	@Column(name = "QTYBAG_SAMPLESIZE")
	private String qtyBagSamplesize;
	
	@Column(name = "WEIGHTBAG_SAMPLESIZE")
	private String weightBagSamplesize;
	
	@Column(name = "FILLINGHEIGHT_SAMPLESIZE")
	private String fillingHeightSamplesize;
	
	@Column(name = "GSMWEIGHT_SAMPLESIZE")
	private String gsmWeightOfBallsSamplesize;
	
	@Column(name = "SURFACEPATTERN_SAMPLESIZE")
	private String surfacePatternSamplesize;
	
	@Column(name = "NOOFFOLDS_SAMPLESIZE")
	private String noOfFoldsSamplesize;
	
	@Column(name = "MOISTURE_SAMPLESIZE")
	private String moistureSamplesize;
	
//	ACTUAL FINDINGS
	
	@Column(name = "QTYBG_ACTUALFINDINGS")
	private String qtyBagActualFindings;
	
	@Column(name = "WEIGHTBAG_ACTUALFINDINGS")
	private String weightBagActualFindings;
	
	@Column(name = "FILLINGHEIGHT_ACTUALFINDINGS")
	private String fillingHeightActualFindings;
	
	@Column(name = "GSMWEIGHT_ACTUALFINDINGS")
	private String gsmWeightOfBallsActualFindings;
	
	@Column(name = "SURFACEPATTERN_ACTUALFINDINGS")
	private String surfacePatternActualFindings;
	
	@Column(name = "NOOFFOLDS_ACTUALFINDINGS")
	private String noOfFoldsActualFindings;
	
	@Column(name = "MOISTURE_ACTUALFINDINGS")
	private String moistureActualFindings;
	
//	DEFECTS CRITICAL
	
	@Column(name = "LESSER_QUANTITY")
	private String lesserQuantity;
	
	@Column(name = "INCORRECT_PACKAGINGMATERIAL")
	private String incorrectPackagingMaterial;
	
	@Column(name = "WRONGMISSING_LOTNUMBER")
	private String wrongMissingLotNumber;
	
	@Column(name = "METAL_INSECTCONTAMINATION")
	private String metalInsectContamination;
	
	@Column(name = "SIGNIFICANT_FOREIGNMATERIAL")
	private String significantForeignMaterial;
	
	@Column(name = "INCORRECT_BARCODEONBAG")
	private String incorrectBarCodeOnBag;
	
	@Column(name = "IMPROPER_SHAPERSIZE")
	private String improperShaperSize;
	
	@Column(name = "MAJOR_DISCOLORATION")
	private String majorDiscoloration;
	
	
//	DEFECTS MAJOR
	
	@Column(name = "FOLDED_PADS")
	private String foldedPads;
	
	@Column(name = "DUST_CONTAMINATION")
	private String dustContamination;
	
	@Column(name = "LOWER_FILLINGHEIGHT")
	private String lowerFillingHeight;
	
	@Column(name = "IMPROPER_OPENDAMAGEDSEALING")
	private String improperOpenDamagedSealing;
	
	@Column(name = "NOOF_COTTONATENDS")
	private String noCottonAtEnds;
	
	
//	DIFECTS MINOR
	
	
	@Column(name = "MINOR_COLOURCONTAMINATION")
	private String minorColourContamination;
	
	@Column(name = "BLACK_CONTAMINATION")
	private String blackContamination;
	
	@Column(name = "LESS_GSM")
	private String lessGsm;
	
	@Column(name = "EDGE_CONDITION")
	private String edgeCondition;
	
	@Column(name = "HARD_BALLS")
	private String hardBalls;
	
	@Column(name = "LESS_COTTON")
	private String lessCotton;
	
//	TOTAL NO OF DEFECTS OBSERVED
	
	@Column(name = "CRITICAL_TOTALNOOFDEFECTSOBSERVED")
	private String criticalTotalNoOfDefectObserved;
	
	@Column(name = "MAJOR_TOTALNOOFDEFECTSOBSERVED")
	private String majorTotalNoOfDefectObserved;
	
	@Column(name = "MINOR_TOTALNOOFDEFECTSOBSERVED")
	private String minorTotalNoOfDefectObserved;
	
	
//	MAXIMUM NO OF DEFECTS OBSERVED
	
	@Column(name = "CRITICAL_MAXIMUMNOOFDEFECTSOBSERVED")
	private String criticalMaximumNoOfDefectObserved;
	
	@Column(name = "MAJOR_MAXIMUMNOOFDEFECTSOBSERVED")
	private String majorMaximumNoOfDefectObserved;
	
	@Column(name = "MINOR_MAXIMUMNOOFDEFECTSOBSERVED")
	private String minorMaximumNoOfDefectObserved;
	
	
	@Column(name = "LOT_STATUS")
	private String lotStatus;
	
	@Column(name = "REMARK")
	private String REMARK;
	
	@Column(name = "REASON")
	private String reason;
	
	// QA Inspector

		@Column(name = "QA_INSPECTOR_STATUS")
		private String qa_inspector_status;

		@Column(name = "QA_INSPECTOR_SAVE_ON")
		private Date qa_inspector_save_on;

		@Column(name = "QA_INSPECTOR_SAVE_BY")
		private String qa_inspector_save_by;

		@Column(name = "QA_INSPECTOR_SAVE_ID")
		private Long qa_inspector_save_id;

		@Column(name = "QA_INSPECTOR_SUBMIT_ON")
		private Date qa_inspector_submit_on;

		@Column(name = "QA_INSPECTOR_SUBMIT_BY")
		private String qa_inspector_submit_by;

		@Column(name = "QA_INSPECTOR_SUBMIT_ID")
		private Long qa_inspector_submit_id;

		@Column(name = "QA_INSPECTOR_SIGN")
		private String qa_inspector_sign;
	
//	QA MANAGER

		@Column(name = "QA_MR_STATUS")
		private String qa_mr_status;

		@Column(name = "QA_MR_SUBMIT_ON")
		private Date qa_mr_submit_on;

		@Column(name = "QA_MR_SUBMIT_BY")
		private String qa_mr_submit_by;

		@Column(name = "QA_MR_SUBMIT_ID")
		private Long qa_mr_submit_id;

		@Column(name = "QA_MR_SIGN")
		private String qa_mr_sign;

		@Column(name = "REMARKS")
		private String remarks;

		
		

		// sign image

		@Lob
		@Column(name = "QA_INSPECTOR_SIGNATURE_IMAGE")
		private byte[] qa_inspector_signature_image;

	
		@Lob
		@Column(name = "QA_MR_SIGNATURE_IMAGE")
		private byte[] qa_mr_signature_image;

	

}
