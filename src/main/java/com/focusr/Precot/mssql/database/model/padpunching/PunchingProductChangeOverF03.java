package com.focusr.Precot.mssql.database.model.padpunching;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.SpunlaceSaveSubmitQA;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PUNCHING_PROD_CHANGE_OVER_F03", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "SHIFT", "MACHINE_NAME", "ORDER_NO_1", "ORDER_NO_2" }) })
public class PunchingProductChangeOverF03 extends SpunlaceSaveSubmitQA {

	@Id
	@Column(name = "PRODUCT_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productId;

	// COMMON FIELDS

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;

	@Column(name = "TIME")
	private String time;

	@Column(name = "MACHINE_NAME")
	private String machineName;

	@Column(name = "CCP_MAINTAINED_BY")
	private String ccpMaintainedBy;

	@Column(name = "CCP_MAINTAINED_DATE")
	private String ccpMaintainedDate;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "REVISION_NUMBER")
	private String revisionNumber;

	@Column(name = "SOP_NUMBER")
	private String sopNumber;

	@Column(name = "REJECT_REASON")
	private String reason;

	// A. PRODUCT DETAILS - RUNNING PRODUCTION

	@Column(name = "PRODUCT_NAME_1")
	private String productName1;

	@Column(name = "ORDER_NO_1")
	private String orderNo1;

	@Column(name = "PO_NUMBER_1")
	private String poNumber1;

	@Column(name = "LOT_NUMBER_1")
	private String lotNo1;

	@Column(name = "FLEEZE_GSM_1")
	private String fleezeGSM1;

	@Column(name = "FLEEZE_PATTERN_1")
	private String fleezePattern1;

	@Column(name = "PACK_SIZE_1")
	private String packSize1;

	@Column(name = "EDGE_CONDITION_1")
	private String edgeCondition1;

	@Column(name = "PDS_NUMBER_1")
	private String pdsNumber1;

	// A. PRODUCT DETAILS - CHANGE OVER

	@Column(name = "PRODUCT_NAME_2")
	private String productName2;

	@Column(name = "ORDER_NO_2")
	private String orderNo2;

	@Column(name = "PO_NUMBER_2")
	private String poNumber2;

	@Column(name = "LOT_NUMBER_2")
	private String lotNo2;

	@Column(name = "FLEEZE_GSM_2")
	private String fleezeGSM2;

	@Column(name = "FLEEZE_PATTERN_2")
	private String fleezePattern2;

	@Column(name = "PACK_SIZE_2")
	private String packSize2;

	@Column(name = "EDGE_CONDITION_2")
	private String edgeCondition2;

	@Column(name = "PDS_NUMBER_2")
	private String pdsNumber2;

	// B. REMOVAL OF PACKAGING MATERIAL - REMOVED (Y OR N)

	@Column(name = "INNER_BAG")
	private String innerBag;

	@Column(name = "OUTER_BAG")
	private String outerBag;

	@Column(name = "INNER_CARTON")
	private String innerCarton;

	@Column(name = "OUTER_CARTON")
	private String outerCarton;

	@Column(name = "FLEEZE_ROLL")
	private String fleezeRoll;

	// B. REMOVAL OF PACKAGING MATERIAL - REMARKS

	@Column(name = "INNER_BAG_REMARKS")
	private String innerBagRemarks;

	@Column(name = "OUTER_BAG_REMARKS")
	private String outerBagRemarks;

	@Column(name = "INNER_CARTON_REMARKS")
	private String innerCartonRemarks;

	@Column(name = "OUTER_CARTON_REMARKS")
	private String outerCartonRemarks;

	@Column(name = "FLEEZE_ROLL_REMARKS")
	private String fleezeRollRemarks;

	// C. MACHINE SETTINGS

	@Column(name = "TOOL_CHANGE_REQUIRED")
	private String toolChangeRequired;

	@Column(name = "TOOL_CHANGE_DONE")
	private String toolChangeDone;

	@Column(name = "MACHINE_SETTING")
	private String machineSetting;

	// C. MACHINE SETTINGS - REMARKS

	@Column(name = "TOOL_CHANGE_REQUIRED_REMARKS")
	private String toolChangeRequiredRemarks;

	@Column(name = "TOOL_CHANGE_DONE_REMARKS")
	private String toolChangeDoneRemarks;

	@Column(name = "MACHINE_SETTING_REMARKS")
	private String machineSettingRemarks;

	// D. CCP SETTINGS

	@Column(name = "METAL_DETECTOR_TEACH")
	private String metalDetectorTeach;

	@Column(name = "METAL_DETECTOR_CHECK")
	private String metalDetectorCheck;

	// D. CCP SETTINGS - REMARKS

	@Column(name = "METAL_DETECTOR_TEACH_REMARKS")
	private String metalDetectorTeachRemarks;

	@Column(name = "METAL_DETECTOR_CHECK_REMARKS")
	private String metalDetectorCheckRemarks;

	// E. PRODUCTION START

	@Column(name = "PRODUCTION_CHECK")
	private String productionCheck;

	@Column(name = "QUALITY_VERIFICATION")
	private String qualityVerification;

	// E. PRODUCTION START - REMARKS

	@Column(name = "PRODUCTION_CHECK_REMARKS")
	private String productionCheckRemarks;

	@Column(name = "QUALITY_VERIFICATION_REMARKS")
	private String qualityVerificationRemarks;

}
