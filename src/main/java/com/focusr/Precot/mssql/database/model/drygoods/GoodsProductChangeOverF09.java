package com.focusr.Precot.mssql.database.model.drygoods;

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
@Table(name = "GOODS_PROD_CHANGE_OVER_F09",schema=AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "MACHINE_NAME", "ORDER_NO_1" }) })
public class GoodsProductChangeOverF09 extends SpunlaceSaveSubmitQA {

	@Id
	@Column(name = "PRODUCT_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productId;
	
	// COMMON FIELDS 

	@Column(name = "DATE")
	private String date;

	@Column(name = "SECTION")
	private String section;

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

	@Column(name = "LOT_NUMBER_1")
	private String lotNo1;
	
	@Column(name = "SALES_ORDER_1")
	private String salesorder1;

	@Column(name = "SLIVER_WEIGHT_1")
	private String sliverWeight1;

	@Column(name = "PACK_SIZE_1")
	private String packSize1;

	@Column(name = "PDS_NUMBER_1")
	private String pdsNumber1;
	
	// A. PRODUCT DETAILS - CHANGE OVER
	
	@Column(name = "PRODUCT_NAME_2")
	private String productName2;

	@Column(name = "ORDER_NO_2")
	private String orderNo2;

	@Column(name = "LOT_NUMBER_2")
	private String lotNo2;
	
	@Column(name = "SALES_ORDER_2")
	private String salesorder2;

	@Column(name = "SLIVER_WEIGHT_2")
	private String sliverWeight2;

	@Column(name = "PACK_SIZE_2")
	private String packSize2;

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

	@Column(name = "SILVER_WEIGHT")
	private String silverWeight;
	
	@Column(name = "ROLL_NO")
	private String rollNo;

	// B. REMOVAL OF PACKAGING MATERIAL - REMOVE

	@Column(name = "INNER_BAG_REMOVE")
	private String innerBagRemove;

	@Column(name = "OUTER_BAG_REMOVE")
	private String outerBagRemove;

	@Column(name = "INNER_CARTON_REMOVE")
	private String innerCartonRemove;

	@Column(name = "OUTER_CARTON_REMOVE")
	private String outerCartonRemove;
		
	@Column(name = "SILVER_WEIGHT_REMOVE")
	private String silverWeightRemove;
	
	@Column(name = "ROLL_NO_REMOVE")
	private String rollNoRemove;
	
	// C. MACHINE SETTINGS
	
	@Column(name = "TOOL_CHANGE_REQUIRED")
	private String toolChangeRequired;

	@Column(name = "TOOL_CHANGE_DONE")
	private String toolChangeDone;

	@Column(name = "MACHINE_SETTING")
	private String machineSetting;

	// C. MACHINE SETTINGS - REMOVE

	@Column(name = "TOOL_CHANGE_REQUIRED_REMOVE")
	private String toolChangeRequiredRemove;

	@Column(name = "TOOL_CHANGE_DONE_REMOVE")
	private String toolChangeDoneRemove;

	@Column(name = "MACHINE_SETTING_REMOVE")
	private String machineSettingRemove;
	
	// D. CCP SETTINGS
	
	@Column(name = "METAL_DETECTOR_TEACH")
	private String metalDetectorTeach;

	@Column(name = "METAL_DETECTOR_CHECK")
	private String metalDetectorCheck;

	// E.  PRODUCTION START
	
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
