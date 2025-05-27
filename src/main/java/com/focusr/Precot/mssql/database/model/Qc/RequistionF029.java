package com.focusr.Precot.mssql.database.model.Qc;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "REQUISITION_SAMPLE_REPORT", schema = AppConstants.schema)

public class RequistionF029 extends UserDateAudit{

	@Id
	@Column(name = "TEST_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long test_id;
	
		@Column(name = "FORMAT")
		private String format;
		
		@Column(name = "UNIT_H")
		private String unit_h;
		
		@Column(name = "UNIT")
		private String unit;
		
		@Column(name = "FORMAT_NO")
		private String format_no;
		
		@Column(name = "REF_SOP_NO")
		private String ref_sop_no;
		
		@Column(name = "REVISION_NO")
		private String revision_no;
		
	    @Column(name = "YEAR")
	    private String year;

	    @Column(name = "MONTH")
	    private String month;

	    @Column(name = "DATE")
	    private String date;
		
	    @Column(name = "REQUISITION_NO")
	    private String requisitionNo;

	    @Column(name = "DISPATCH_DATE")
	    private String dispatchDate;

	    @Column(name = "CUSTOMER")
	    private String customer;

	    @Column(name = "PRODUCT_DESCRIPTION")
	    private String productDescription;

	    @Column(name = "MIXING")
	    private String mixing;

	    @Column(name = "BAG_TYPE")
	    private String bagType;

	    @Column(name = "PATTERN")
	    private String pattern;
	    
	    @Column(name = "PATTERN_A")
	    private String pattern_a;

	    @Column(name = "EDGE")
	    private String edge;
	    
	    @Column(name = "EDGE_A")
	    private String edge_a;

	    @Column(name = "GSM_GPM")
	    private String gsmGpm;
	    
	    @Column(name = "GSM_GPM_A")
	    private String gsmGpm_a;
	    @Column(name = "GSM_GPM_B")
	    private String gsmGpm_b;
	    @Column(name = "GSM_GPM_C")
	    private String gsmGpm_c;
	    @Column(name = "GSM_GPM_D")
	    private String gsmGpm_d;
	    @Column(name = "GSM_GPM_E")
	    private String gsmGpm_e;
	    @Column(name = "GSM_GPM_AVG")
	    private String gsmGpm_avg;

	    @Column(name = "THICKNESS")
	    private String thickness;

	    @Column(name = "THICKNESS_A")
	    private String thickness_a;
	    @Column(name = "THICKNESS_B")
	    private String thickness_b;
	    @Column(name = "THICKNESS_C")
	    private String thickness_c;
	    @Column(name = "THICKNESS_D")
	    private String thickness_d;
	    @Column(name = "THICKNESS_E")
	    private String thickness_e;
	    @Column(name = "THICKNESS_AVG")
	    private String thickness_avg;

	    @Column(name = "PAD_WEIGHT")
	    private String padWeight;

	    @Column(name = "PAD_WEIGHT_A")
	    private String padWeight_a;
	    @Column(name = "PAD_WEIGHT_B")
	    private String padWeight_b;
	    @Column(name = "PAD_WEIGHT_C")
	    private String padWeight_c;
	    @Column(name = "PAD_WEIGHT_D")
	    private String padWeight_d;
	    @Column(name = "PAD_WEIGHT_E")
	    private String padWeight_e;
	    @Column(name = "PAD_WEIGHT_AVG")
	    private String padWeight_avg;

	    @Column(name = "DIMENSION_LENGTH")
	    private String dimensionLength;

	    @Column(name = "DIMENSION_LENGTH_A")
	    private String dimensionLength_a;
	    @Column(name = "DIMENSION_LENGTH_B")
	    private String dimensionLength_b;
	    @Column(name = "DIMENSION_LENGTH_C")
	    private String dimensionLength_c;
	    @Column(name = "DIMENSION_LENGTH_D")
	    private String dimensionLength_d;
	    @Column(name = "DIMENSION_LENGTH_E")
	    private String dimensionLength_e;
	    @Column(name = "DIMENSION_LENGTH_AVG")
	    private String dimensionLength_avg;

	    @Column(name = "DIMENSION_WIDTH")
	    private String dimensionWidth;

	    @Column(name = "DIMENSION_WIDTH_A")
	    private String dimensionWidth_a;
	    @Column(name = "DIMENSION_WIDTH_B")
	    private String dimensionWidth_b;
	    @Column(name = "DIMENSION_WIDTH_C")
	    private String dimensionWidth_c;
	    @Column(name = "DIMENSION_WIDTH_D")
	    private String dimensionWidth_d;
	    @Column(name = "DIMENSION_WIDTH_E")
	    private String dimensionWidth_e;
	    @Column(name = "DIMENSION_WIDTH_AVG")
	    private String dimensionWidth_avg;

	    @Column(name = "DIMENSION_HEIGHT")
	    private String dimensionHeight;

	    @Column(name = "DIMENSION_HEIGHT_A")
	    private String dimensionHeight_a;
	    @Column(name = "DIMENSION_HEIGHT_B")
	    private String dimensionHeight_b;
	    @Column(name = "DIMENSION_HEIGHT_C")
	    private String dimensionHeight_c;
	    @Column(name = "DIMENSION_HEIGHT_D")
	    private String dimensionHeight_d;
	    @Column(name = "DIMENSION_HEIGHT_E")
	    private String dimensionHeight_e;
	    @Column(name = "DIMENSION_HEIGHT_AVG")
	    private String dimensionHeight_avg;

	    @Column(name = "DIAMETER")
	    private String diameter;

	    @Column(name = "DIAMETER_A")
	    private String diameter_a;
	    @Column(name = "DIAMETER_B")
	    private String diameter_b;
	    @Column(name = "DIAMETER_C")
	    private String diameter_c;
	    @Column(name = "DIAMETER_D")
	    private String diameter_d;
	    @Column(name = "DIAMETER_E")
	    private String diameter_e;
	    @Column(name = "DIAMETER_AVG")
	    private String diameter_avg;

	    @Column(name = "MOISTURE")
	    private String moisture;

	    @Column(name = "MOISTURE_A")
	    private String moisture_a;
	    @Column(name = "MOISTURE_B")
	    private String moisture_b;
	    @Column(name = "MOISTURE_C")
	    private String moisture_c;
	    @Column(name = "MOISTURE_D")
	    private String moisture_d;
	    @Column(name = "MOISTURE_E")
	    private String moisture_e;
	    @Column(name = "MOISTURE_AVG")
	    private String moisture_avg;

	    @Column(name = "COUNT_PER_PACK")
	    private String countPerPack;
	    
	    @Column(name = "COUNT_PER_PACK_A")
	    private String countPerPack_a;
	    @Column(name = "COUNT_PER_PACK_B")
	    private String countPerPack_b;
	    @Column(name = "COUNT_PER_PACK_C")
	    private String countPerPack_c;
	    @Column(name = "COUNT_PER_PACK_D")
	    private String countPerPack_d;
	    @Column(name = "COUNT_PER_PACK_E")
	    private String countPerPack_e;
	    @Column(name = "COUNT_PER_PACK_AVG")
	    private String countPerPack_avg;

	    @Column(name = "PACK_GROSS_WEIGHT")
	    private String packGrossWeight;
	    
	    @Column(name = "PACK_GROSS_WEIGHT_A")
	    private String packGrossWeight_a;
	    
	    @Column(name = "PACK_GROSS_WEIGHT_B")
	    private String packGrossWeight_b;
	    
	    @Column(name = "PACK_GROSS_WEIGHT_C")
	    private String packGrossWeight_c;
	    
	    @Column(name = "PACK_GROSS_WEIGHT_D")
	    private String packGrossWeight_d;
	    
	    @Column(name = "PACK_GROSS_WEIGHT_E")
	    private String packGrossWeight_e;
	    
	    @Column(name = "PACK_GROSS_WEIGHT_AVG")
	    private String packGrossWeight_avg;
	    
	    @Column(name = "PACK_FILLING_HEIGHT")
	    private String packFillingHeight;

	    @Column(name = "PACK_FILLING_HEIGHT_A")
	    private String packFillingHeight_a;
	    
	    @Column(name = "PACK_FILLING_HEIGHT_B")
	    private String packFillingHeight_b;

	    @Column(name = "PACK_FILLING_HEIGHT_C")
	    private String packFillingHeight_c;

	    @Column(name = "PACK_FILLING_HEIGHT_D")
	    private String packFillingHeight_d;

	    @Column(name = "PACK_FILLING_HEIGHT_E")
	    private String packFillingHeight_e;

	    @Column(name = "PACK_FILLING_HEIGHT_AVG")
	    private String packFillingHeight_avg;


	    @Column(name = "PACK_TYPE")
	    private String packType;

	    @Column(name = "PACK_DIMENSIONS_LENGTH")
	    private String packDimensionsLength;

	    @Column(name = "PACK_DIMENSIONS_WIDTH")
	    private String packDimensionsWidth;

	    @Column(name = "GUSSET_HEIGHT")
	    private String gussetHeight;

	    @Column(name = "PACK_MICRON_THICKNESS")
	    private String packMicronThickness;

	    @Column(name = "OVERALL_APPEARANCE")
	    private String overallAppearance;

	    @Column(name = "CD_MD")
	    private String cdMd;

	    @Column(name = "SAMPLE_COLLECTED_FROM")
	    private String sampleCollectedFrom;

	    @Column(name = "BATCH_NO")
	    private String batchNo;

	    @Column(name = "ABSORBENCY")
	    private String absorbency;

	    @Column(name = "SINKING_TIME")
	    private String sinkingTime;

	    @Column(name = "WHITENESS_INDEX")
	    private String whitenessIndex;
	    
	    private String uql_mm;
	    
	    private String lw_mm;

	    @Column(name = "PH")
	    private String ph;

	    @Column(name = "ASH_CONTENT")
	    private String ashContent;
	    
	    private String micron_value;
	    
	    private String ln_mm;
	    
	    private String mixing_b;
	    private String fluorence;

	    @Column(name = "NEPS_PER_GM")
	    private String nepsPerGm;
	    
	    @Column(name = "ODR")
	    private String odr;
	    
	    @Column(name = "SA")
	    private String sa;
	    
	    private String finish;
	    
	    private String wss;
	    
	    private String ess;

	    @Column(name = "BUD_TYPE")
	    private String budType;

	    @Column(name = "STICK_MATERIAL")
	    private String stickMaterial;

	    @Column(name = "STICK_DIAMETER")
	    private String stickDiameter;

	    @Column(name = "STICK_COLOR")
	    private String stickColor;

	    @Column(name = "STICK_LENGTH")
	    private String stickLength;

	    @Column(name = "BUD_SHAPE")
	    private String budShape;

	    @Column(name = "BUD_FULL_LENGTH")
	    private String budFullLength;

	    @Column(name = "COTTON_LENGTH")
	    private String cottonLength;

	    @Column(name = "SINGLE_BUD_WEIGHT")
	    private String singleBudWeight;

	    @Column(name = "BUD_DIAMETER")
	    private String budDiameter;

	    @Column(name = "PACKAGING_TYPE")
	    private String packagingType;

	    @Column(name = "PACKAGING_MATERIAL")
	    private String packagingMaterial;

	    @Column(name = "PACKAGING_WIDTH")
	    private String packagingWidth;

	    @Column(name = "PACKAGING_LENGTH")
	    private String packagingLength;

	    @Column(name = "PACKAGING_HEIGHT")
	    private String packagingHeight;

	    @Column(name = "PACKAGING_GROSS_WEIGHT")
	    private String packagingGrossWeight;
	    
	    @Column(name = "FINAL_MOISTURE")
	    private String finalmoisture;

	    @Column(name = "STICK_STRENGTH")
	    private String stickStrength;

	    @Column(name = "REMARKS")
	    private String remarks;
	    
	    @Column(name = "REMARKS_A")
	    private String remarks_a;
	    
		@Column(name = "QC_STATUS")
		private String qc_status;

		@Column(name = "QC_SUBMIT_ON")
		private Date qc_submit_on;

		@Column(name = "QC_SUBMIT_BY")
		private String qc_submit_by;

		@Column(name = "QC_SUBMIT_ID")
		private Long qc_submit_id;
	    
		@Column(name = "INS_STATUS")
		private String ins_status;

		@Column(name = "INS_SUBMIT_ON")
		private Date ins_submit_on;

		@Column(name = "INS_SUBMIT_BY")
		private String ins_submit_by;

		@Column(name = "INS_SUBMIT_ID")
		private Long ins_submit_id;
			
		@Column(name = "chemist_STATUS")
		private String chemist_status;

		@Column(name = "chemist_SAVED_ON")
		private Date chemist_saved_on;

		@Column(name = "chemist_SAVED_BY")
		private String chemist_saved_by;

		@Column(name = "chemist_SAVED_ID")
		private Long chemist_saved_id;
		
//----------------------------------------------------------------------
		
		@Column(name = "INS_SAVED_ON")
		private Date ins_saved_on;

		@Column(name = "INS_SAVED_BY")
		private String ins_saved_by;

		@Column(name = "INS_SAVED_ID")
		private Long ins_saved_id;

		@Column(name = "chemist_SUBMIT_ON")
		private Date chemist_submit_on;

		@Column(name = "chemist_SUBMIT_BY")
		private String chemist_submit_by;

		@Column(name = "chemist_SUBMIT_ID")
		private Long chemist_submit_id;

		@Column(name = "chemist_SIGN")
		private String chemist_sign;
		
		@Column(name = "REASON")
		private String reason;
		
		@Column(name = "QC_SIGN")
		private String qc_sign;
		
		@Column(name = "INS_SIGN")
		private String ins_sign;
		
		@Column(name = "APPROVED_SAMPLE")
		private String approved_sample;
		
		@Column(name = "HOD_SUBMIT_ON")
		private Date hod_submit_on;

		@Column(name = "HOD_SUBMIT")
		private String hod_submit_by;

		@Column(name = "HOD_SIGN")
		private String hod_sign;
		
		@Column(name = "HOD_ID")
		private Long hod_id;
		
		@Column(name = "HOD_STATUS")
		private String hod_status;
		
		@Column(name = "DEVELOP_SUBMIT_ON")
		private Date develop_submit_on;

		@Column(name = "DEVELOP_SUBMIT_BY")
		private String develop_submit_by;

		@Column(name = "DEVELOP_ID")
		private Long develop_id;
		
		@Column(name = "DEVELOP_SUBMIT_SIGN")
		private String develop_sign;
		
		@Column(name = "DEVELOP_STATUS")
		private String develop_status;
		
		@Column(name = "QC_STATUS_B")
		private String qc_status_b;
		
		@Column(name = "QC_SUBMIT_ON_B")
		private Date qc_submit_on_b;

		@Column(name = "QC_SUBMIT_BY_B")
		private String qc_submit_by_b;
		
		@Column(name = "QC_SIGN_B")
		private String qc_sign_b;

		@Column(name = "QC_SUBMIT_ID_B")
		private Long qc_submit_id_b;
		
		@Column(name = "DEPARTMENT")
		private String department;
		
		private String remark;
		
		private String sample_requistion;
		
		private String approveStatus;
	
}
