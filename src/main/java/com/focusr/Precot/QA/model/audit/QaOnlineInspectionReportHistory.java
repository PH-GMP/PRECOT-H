package com.focusr.Precot.QA.model.audit;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.QA.model.QaOnlineInspectionList;
import com.focusr.Precot.QA.model.QaOnlineInspectionReport;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data

@Entity
@Table(name = "QA_ONLINE_INSPECTION_REPORT_HISTORY_F034", schema = AppConstants.schema)
public class QaOnlineInspectionReportHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "INSPECTION_ID")
	private Long inspectionId;
	
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
	
	@Column(name = "BMR_NO")
	private String bmrNo;
	
	@Column(name = "SHIFT")
	private String shift;
	
	@Column(name = "CUSTOMER_NAME")
	private String customerName;
	
	@Column(name = "PORDER")
	private String pOrder;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "ITEM_CODE")
	private String itemCode;
	
	@Column(name = "MACHINE_NO")
	private String machineNo;
		
	@Column(name = "FG_NO")
	private String fgNo;
	
	@Column(name = "PO_NO")
	private String poNo;
	
	@Column(name = "AQL_SAMPLE_SIZE")
	private String aqlSampleSize;
	
	@Column(name = "LOT_NO")
	private String lotNo;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	//34
	
	@Column(name = "SURFACEPATTERN_SPECIFICATION")
	private String surfacePatternSpecification;
	
	@Column(name = "AVERAGEGSMWEIGHT_SPECIFICATION")
	private String averageGsmWeightSpecification;
	
	@Column(name = "PRODUCTSIZEDIAOFROLLS_SPECIFICATION")
	private String productSizeDiaOfRollsSpecification;
	
	@Column(name = "NOOFFOLDSPLEAT_SPECIFICATION")
	private String noOfFoldsPleatSpecification;
	
	@Column(name = "ARTWORKPRINTINGONBAGSLABLES_SPECIFICATION")
	private String artworkPrintingOnBagsLablesSpecification;
	
	
	@Column(name = "NOOFBAGSPERCARTON_SPECIFICATION")
	private String noofBagsPerCartonSpecification;
	
	@Column(name = "MOISTURE_SPECIFICATION")
	private String MoistureSpecification;
	
	@Column(name="FILLED_GROSS_BOX_WEIGHT_SPECIFICATION")
	private String filledBoxGrossWeightSpecification;
	
	@Column(name = "SURFACEPATTERN_OBSERVATION")
	private String surfacePatternObservation;
	
	@Column(name = "AVERAGEGSMWEIGHT_OBSERVATION")
	private String averageGsmWeightObservation;
	
	@Column(name = "PRODUCTSIZEDIAOFROLLS_OBSERVATION")
	private String productSizeDiaOfRollsObservation;
	
	@Column(name = "NOOFFOLDSPLEAT_OBSERVATION")
	private String noOfFoldsPleatObservation;
	
	@Column(name = "ARTWORKPRINTINGONBAGSLABLES_OBSERVATION")
	private String artworkPrintingOnBagsLablesObservation;
	
	@Column(name = "NOOFBAGSPERCARTON_OBSERVATION")
	private String noofBagsPerCartonObservation;
	
	@Column(name = "MOISTURE_OBSERVATION")
	private String MoistureObservation;
	
	@Column(name="FILLED_GROSS_BOX_WEIGHT_OBSERVATION")
	private String filledBoxGrossWeightObservation;
	
	
	
		//35
	
	@Column(name = "BAGWEIGHT_SPECIFICATION")
	private String bagWeightSpecification;
	
	@Column(name = "AVERAGEWEIGHTOFBALLS_SPECIFICATION")
	private String averageWeightOfBallsSpecification;
	
	@Column(name = "NOOFBALLSPERPACK_SPECIFICATION")
	private String noOfBallsPerPackSpecification;
	
	@Column(name = "BALLSDIA_SPECIFICATION")
	private String ballsDiaSpecification;
	
	@Column(name = "ARTWORKPRINTINGONBAGSLABELS_SPECIFICATION")
	private String artworkPrintingOnBagsLabelsSpecification;
	
	
	@Column(name = "NOOFPACKPERCARTON35_SPECIFICATION")
	private String noOfPackPerCotton35Specification;
	
	
	@Column(name = "BAGWEIGHT_OBSERVATION")
	private String bagWeightObservation;
	
	@Column(name = "AVERAGEWEIGHTOFBALLS_OBSERVATION")
	private String averageWeightOfBallsObservation;
	
	@Column(name = "NOOFBALLSPERPACK_OBSERVATION")
	private String noOfBallsPerPackObservation;
	
	@Column(name = "BALLSDIA_OBSERVATION")
	private String ballsDiaObservation;
	
	@Column(name = "ARTWORKPRINTINGONBAGSLABELS_OBSERVATION")
	private String artworkPrintingOnBagsLabelsObservation;
	
	@Column(name = "NOOFPACKPERCARTON35_OBSERVATION")
	private String noOfPackPerCotton35Observation;
	
	//36
	
	
	
	@Column(name = "BAGBOXWEIGHT_SPECIFICATION")
	private String bagBoxWeightSpecification;
	
	@Column(name = "AVERAGEWEIGHTOFBUDS_SPECIFICATION")
	private String averageWeightOfBudsSpecification;
	
	@Column(name = "NOOFBUDSPERPACK_SPECIFICATION")
	private String noOfBudsPerPackSpecification;
	
	@Column(name = "BUDSSIZEDIAMETER_SPECIFICATION")
	private String budssizedDiameterSpecification;
	
	@Column(name = "ARTWORKPRINTINGONBUDSLABELS_SPECIFICATION")
	private String artworkPrintingOnBudsLabelsSpecification;
	
	
	@Column(name = "NOOFPACKPERCARTON36_SPECIFICATION")
	private String noOfPackPerCotton36Specification;
	
	
	@Column(name = "BAGBOXWEIGHT_OBSERVATION")
	private String bagBoxWeightObservation;
	
	@Column(name = "AVERAGEWEIGHTOFBUDS_OBSERVATION")
	private String averageWeightOfBudsObservation;
	
	@Column(name = "NOOFBUDSPERPACK_OBSERVATION")
	private String noOfBudsPerPackObservation;
	
	@Column(name = "BUDSSIZEDIAMETER_OBSERVATION")
	private String budssizedDiameterObservation;
	
	@Column(name = "ARTWORKPRINTINGONBUDSLABELS_OBSERVATION")
	private String artworkPrintingOnBudsLabelsObservation;
	
	@Column(name = "NOOFPACKPERCARTON36_OBSERVATION")
	private String noOfPackPerCotton36Observation;
	
	
	@Column(name = "REMARK")
	private String remark;
	
	@Column(name = "LOT_STATUS")
	private String lotStatus;
	
	//QA Inspector
	
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
	
	
	//PROD SUPERVISOR
	
		@Column(name = "PROD_SUPERVISOR_STATUS")
		private String prod_supervisor_status;

		@Column(name = "PROD_SUPERVISOR_SAVE_ON")
		private Date prod_supervisor_save_on;

		@Column(name = "PROD_SUPERVISOR_SAVE_BY")
		private String prod_supervisor_save_by;

		@Column(name = "PROD_SUPERVISOR_SAVE_ID")
		private Long prod_supervisor_save_id;

		@Column(name = "PROD_SUPERVISOR_SUBMIT_ON")
		private Date prod_supervisor_submit_on;

		@Column(name = "PROD_SUPERVISOR_SUBMIT_BY")
		private String prod_supervisor_submit_by;

		@Column(name = "PROD_SUPERVISOR_SUBMIT_ID")
		private Long prod_supervisor_submit_id;

		@Column(name = "PROD_SUPERVISOR_SIGN")
		private String prod_supervisor_sign;
	
		//QA MANAGER
		
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
		
		
		@Column(name = "REASON")
		private String reason;
		
		@Column(name = "VERSION")
		private int version;
		
		
		@Lob
		@Column(name = "QA_INSPECTOR_SIGNATURE_IMAGE")
		private byte[] qa_inspector_signature_image;

		@Lob
		@Column(name = "PROD_SUPERVISOR_SIGNATURE_IMAGE")
		private byte[] prod_supervisor_signature_image;

		@Lob
		@Column(name = "QA_MR_SIGNATURE_IMAGE")
		private byte[] qa_mr_signature_image;
		
	
	
//	@OneToMany(targetEntity = QaOnlineInspectionList.class, cascade = CascadeType.ALL)
//	@JoinColumn(name = "INSPECTION_ID", referencedColumnName = "INSPECTION_ID")
//	private List<QaOnlineInspectionList> details;
		
		@OneToMany(targetEntity = QaOnlineInspectionListHistory.class, cascade = CascadeType.ALL)
		@JoinColumn(name = "INSPECTION_ID", referencedColumnName = "INSPECTION_ID")
		private List<QaOnlineInspectionListHistory> details;
		
	
	
	
}

