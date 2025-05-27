package com.focusr.Precot.mssql.database.model.QcAudit;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PHYSICAL_AND_CHEMCAL_TEST_AR_F001_HISTORY", schema = AppConstants.schema)
public class PhysicalAndChemcalTestARF001History {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name="RAW_COTTON_ANALYSIS_ID")
	private Long rawCottenAnalysisId;
	
	@Column(name = "SUPPLIER")
	private String supplier;

	@Column(name = "STATION")
	private String station;
	
	@Column(name = "BILL_OR_INVOICE_NO")
	private String billOrInvoiceNo;

	@Column(name = "DATE_OF_RECEIPT")
	private String dateOfReceipt;

	@Column(name = "TESTED_DATE")
	private String testedDate;

	@Column(name = "AR_NO")
	private String arNo;

	@Column(name = "COTTON_VARITEY")
	private String cottonVaritey;

	@Column(name = "NO_OF_BALE")
	private String noOfBale;

	@Column(name = "QUANTITY")
	private String quantity;

	@Column(name = "SAMPLE_SIZE")
	private Long sampleSize;

	@Column(name = "IDENTIFICATION_TEST_OBSR")
	private String identificationTestObsr;

	@Column(name = "IDENTIFICATION_TEST_RMRK")
	private String identificationTestRmrk;

	@Column(name = "MICRONAIRE_VALUE_OBSR")
	private Double micronaireValueObsr;
	
	//--------------------------
	
	@Column(name = "MICRONAIRE_VALUE_OBSR_A")
	private String micronaireValueObsra;
	
	@Column(name = "MICRONAIRE_VALUE_OBSR_B")
	private String micronaireValueObsrb;

	@Column(name = "MICRONAIRE_VALUE_OBSR_C")
	private String micronaireValueObsrc;
	
	@Column(name = "MICRONAIRE_VALUE_OBSR_D")
	private String micronaireValueObsrd;
	
	//---------------------------

	@Column(name = "MICRONAIRE_VALUE_RMRK")
	private String micronaireValueRmrk;
	
	@Column(name = "AVARAGE_LENGTH_OBSR")	
	private String avarageLengthObsr;

	@Column(name = "AVARAGE_LENGTH_RMRK")
	private String avarageLengthRmrk;
	
	@Column(name = "NEPS_OBSR")
	private Double nepsObsr;
	
	@Column(name = "NEPS_RMRK")
	private String nepsRmrk;
	
	@Column(name = "UPPER_QUARTILE_LENGTH_OBSR")
	private Double upperQuartileLengthObsr;

	//-------------------------
	
	@Column(name = "UPPER_QUARTILE_LENGTH_OBSR_A")
	private String upperQuartileLengthObsra;
	
	@Column(name = "UPPER_QUARTILE_LENGTH_OBSR_B")
	private String upperQuartileLengthObsrb;
	
	@Column(name = "UPPER_QUARTILE_LENGTH_OBSR_C")
	private String upperQuartileLengthObsrc;
	
	@Column(name = "UPPER_QUARTILE_LENGTH_OBSR_D")
	private String upperQuartileLengthObsrd;
	
	//------------------------
	@Column(name = "UPPER_QUARTILE_LENGTH_RMRK")
	private String upperQuartileLengthRmrk;
	
	@Column(name = "LENGTH_BY_WEIGHT_OBSR")
	private Double lengthByWeightObsr;

	@Column(name = "LENGTH_BY_WEIGHT_RMRK")
	private String lengthByWeightRmrk;

	@Column(name = "LENGTH_BY_NO_OBSR")
	private Double lengthByNoObsr;

	@Column(name = "LENGTH_BY_NO_RMRK")
	private String lengthByNoRmrk;

	@Column(name = "SHORT_FIBER_CNT_BY_WT_OBSR")
	private Double shortFiberCntByWtObsr;

	@Column(name = "SHORT_FIBER_CONTENT_BY_WT_RMRK")
	private String shortFiberContentByWtRmrk;
	
	@Column(name = "SHORT_FIBER_CONTENT_BY_NO_OBSR")
	private Double shortFiberContentByNoObsr;

	@Column(name = "SHORT_FIBER_CONTENT_BY_NO_RMRK")
	private String shortFiberContentByNoRmrk;
	
	@Column(name = "WHITENESS_INDICES_OBSR")
	private Double whitenessIndicesObsr;
	
	@Column(name = "WHITENESS_INDICES_RMRK")
	private String whitenessIndicesRmrk; 

	@Column(name = "FLOURESCENCE_OBSR")
	private String flourescenceObsr;

	@Column(name = "FLOURESCENCE_RMRK")
	private String flourescenceRmrk;

	@Column(name = "ASH_CONTENT_FL_WT_OBSR")
	private Double ashContentFlWtObsr;
	
	@Column(name = "ASH_CONTENT_IL_WT_OBSR")
	private Double ashContentIlWtObsr;
	
	@Column(name = "ASH_CONTENT_FR_BA_OBSR")
	private Double ashContentFrBAObsr;
	
	@Column(name = "ASH_CONTENT_FR_RES_OBSR")
	private Double ashContentFrResObsr;

	@Column(name = "ASH_CONTENT_RMRK")
	private String ashContentRmrk;

	@Column(name = "EITHER_SOL_SUB_FL_WT_OBSR")
	private Double eitherSolSubFlWtObsr;

	@Column(name = "EITHER_SOL_SUB_IL_WT_OBSR")
	private Double eitherSolSubIlWtObsr;
	
	@Column(name = "EITHER_SOL_SUB_FR_YX_OBSR")
	private Double eitherSolSubFrYXObsr;
	
	@Column(name = "EITHER_SOL_SUB_FR_RES_OBSR")
	private Double eitherSolSubFrResObsr;

	@Column(name = "EITHER_SOL_SUB_RMRK")
	private String eitherSolSubRmrk;

	@Column(name = "MOISTURE_CONTENT_IL_WT_OBSR")
	private Double moistureContentIlWtObsr;
	
	@Column(name = "MOISTURE_CONTENT_FL_WT_OBSR")
	private Double moistureContentFlWtObsr;
	
	@Column(name = "MOISTURE_CONTENT_FR_KL_OBSR")
	private Double moistureContentFrKlObsr;
	
	@Column(name = "MOISTURE_CONTENT_FR_RES_OBSR")
	private Double moistureContentFrResObsr;

	@Column(name = "MOISTURE_CONTENT_RMRK")
	private String moistureContentRmrk;

	@Column(name = "TRASH_COTTON_WT_M_OBSR")
	private Double trashCottonWtMObsr;

	@Column(name = "TRASH_TRASH_WT_N_OBSR")
	private Double trashTrashWtNObsr;
	
	@Column(name = "TRASH_RES_OBSR")
	private Double trashResObsr;

	@Column(name = "TRASH_RMRK")
	private String trashRemark;

	@Column(name = "FINAL_REMARK")
	private String finalRemark;

	@Column(name = "LOT_STATUS_ACCEPTED")
	private Double lotStatusAccepted;

	@Column(name = "LOT_STATUS_ACCEPTED_UNDERDEVIATION")
	private Double lotStatusAcceptedUnderDeviation;

	@Column(name = "LOT_STATUS_REJECTED")
	private Double lotStatusRejected;
	
	@Column(name = "LOT_STATUS")
	private String lotStatus;
	
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RAW_COTTON_ANALYSIS_ID", nullable = false, insertable = false, updatable = false)
	private RawCottenAnalysisReportARF001History rawCottenAnalysisReportHistory;
}
