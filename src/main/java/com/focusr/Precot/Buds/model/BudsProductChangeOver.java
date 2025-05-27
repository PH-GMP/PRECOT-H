package com.focusr.Precot.Buds.model;

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

import lombok.Data;

@Data
@Entity
@Table(name = "BUDS_PRODUCT_CHANGE_OVER", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "ORDER_NO_1" }) })
public class BudsProductChangeOver extends UserDateAudit {

	@Column(name = "PRODUCT_ID")
	@Id
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

	@Column(name = "DEPARTMENT_NAME")
	private String deptName;

	// A. PRODUCT DETAILS - RUNNING PRODUCTION

	@Column(name = "PRODUCT_NAME_1")
	private String productName1;

	@Column(name = "ORDER_NO_1")
	private String orderNo1;

	@Column(name = "LOT_NUMBER_1")
	private String lotNo1;

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

	@Column(name = "SLIVER_WEIGHT_2")
	private String sliverWeight2;

	@Column(name = "PACK_SIZE_2")
	private String packSize2;

	@Column(name = "PDS_NUMBER_2")
	private String pdsNumber2;

	// B. REMOVAL OF PACKAGING MATERIAL - REMARKSD (Y OR N)

	@Column(name = "BLISTER")
	private String blister;

	@Column(name = "CONTAINER")
	private String container;

	@Column(name = "ZIP_LOCK")
	private String zipLock;

	@Column(name = "OUTER_CARTON")
	private String outerCarton;

	@Column(name = "SILVER_WEIGHT")
	private String silverWeight;

	// B. REMOVAL OF PACKAGING MATERIAL - REMARKS

	@Column(name = "BLISTER_REMARKS")
	private String blisterRemarks;

	@Column(name = "CONTAINER_REMARKS")
	private String containerRemarks;

	@Column(name = "ZIP_LOCK_REMARKS")
	private String zipLockRemarks;

	@Column(name = "OUTER_CARTON_REMARKS")
	private String outerCartonRemarks;

	@Column(name = "SILVER_WEIGHT_REMARKS")
	private String silverWeightRemarks;

	@Column(name = "ROLL_NO_REMARKS")
	private String rollNoRemarks;

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

	// D. CCP SETTINGS

	@Column(name = "METAL_DETECTOR_CHECK")
	private String metalDetectorCheck;
	
	@Column(name = "METAL_DETECTOR_REMARKS")
	private String metalDetectorRemarks;

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

	// HOD

	@Column(name = "HOD_NAME")
	private String hodName;

	@Column(name = "HOD_STATUS")
	private String hodStatus;

	@Column(name = "HOD_ID")
	private Long hodId;

	@Column(name = "HOD_APPROVED_DATE")
	private Date hodDate;

	// SUPERVISOR

	@Column(name = "SUPERVISOR_SUBMITTED_NAME")
	private String supervisorSubmittedName;

	@Column(name = "SUPERVISOR_SAVED_NAME")
	private String supervisorSavedName;

	@Column(name = "SUPERVISOR_SAVED_DATE")
	private Date supervisorSavedDate;

	@Column(name = "SUPERVISOR_SUBMITTED_DATE")
	private Date supervisorSubmittedDate;

	@Column(name = "SUPERVISOR_NAME")
	private String supervisorName;

	@Column(name = "SUPERVISOR_STATUS")
	private String supervisorStatus;

	@Column(name = "SUPERVISOR_ID")
	private Long supervisorId;

//	@Column(name = "SUPERVISOR_DATE")
//	private String supervisorDate;

	// QA

	@Column(name = "QA_NAME")
	private String qaName;

	@Column(name = "QA_STATUS")
	private String qaStatus;

	@Column(name = "QA_ID")
	private Long qaId;

	@Column(name = "QA_APPROVED_DATE")
	private Date qaApprovedDate;

}
