package com.focusr.Precot.QA.model;

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

import com.focusr.Precot.util.AppConstants;

import lombok.Data;


@Data
@Entity
@Table(name = "QA_CONTAINER_INSPECTION_REPORT_F039", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE","CIR_NO" }) })
public class QaContainerInspectionReport {
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CONTAINER_ID")
	private Long containerId;
	

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "SOP_NO")
	private String sopNumber;

	@Column(name = "REVISION_NO")
	private String revisionNo;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "CIR_NO")
	private String cirNo;
	
	@Column(name = "PRODUCT_DESCRIPTION")
	private String productDescription;
	
	@Column(name = "CUSTOMER")
	private String customer;
	
	@Column(name = "CONTAINER_NO")
	private String containerNO;
	
	@Column(name = "LOT_NO")
	private String lotNo;
	
	@Column(name = "INVOICE_NO")
	private String invoiceNo;
	
	@Column(name = "SEAL_ONETIMELOCKNO")
	private String sealOneTimeLockNo;
	
	@Column(name = "SEAL_STEAMERSEALNO")
	private String sealSteamerSealNo;
	
	@Column(name = "HIGH_SECURITYSEAL")
	private String highSecuritySeal;
	
	@Column(name = "SEAL_AFFIXPROPERRYVERIFIED")
	private String sealAffixPropertyVerified;
	
//	17 Points Container InspectionReview
	
	
	
	
	@Column(name = "BUMPER")
	private String bumper;
	
	@Column(name = "ENGINE")
	private String engine;
	
	@Column(name = "TYRE")
	private String tyre;
	
	@Column(name = "TRUCK_FLOOR")
	private String truckFloor;
	
	@Column(name = "FUEL_TANK")
	private String fuelTank;
	
	@Column(name = "CAB_STORAGECOMPARTMENT")
	private String cabSotrageCompartment;
	
	@Column(name = "AIR_TANKS")
	private String airTanks;
	
	@Column(name = "DRIVE_SHAFTS")
	private String driveShafts;
	
	@Column(name = "FIFTH_WHEEL")
	private String fifthWheel;
	
	@Column(name = "OUTSIDE_UNDERCARRIAGE")
	private String outsideUnderCarriage;
	
	@Column(name = "OUTSIDE_INSIDEDOORS")
	private String outsideInsideDoors;
	
	@Column(name = "INSIDE_FLOOR")
	private String insideFloor;
	
	@Column(name = "SIDE_WALLS")
	private String sideWalls;
	
	@Column(name = "FRONT_WALLS")
	private String frontWalls;
	
	@Column(name = "CEILING_ROOF")
	private String ceilingRoof;
	
	@Column(name = "REFRIGERATION_UNIT")
	private String refrigerationUnit;
	
	@Column(name = "EXHAUST")
	private String exhaust;
	
	
	
	@Column(name = "CONDITIONOF_CONTAINER")
	private String conditionOfContainer;
	
	@Column(name = "ROOFFREEFROM_DAMAGESHOLES")
	private String roofFreeFromDamagesHoles;
	
	@Column(name = "ALLTHESIDESFREE_FROMDAMAGESHOLE")
	private String allTheSidesFreeFromDamagesHoles;
	
	@Column(name = "FREEFROM_JOINTGRAPS")
	private String freeFromJointGraps;
	
	@Column(name = "FREEFROM_RUST")
	private String freeFromRust;
	
	@Column(name = "PROPERLY_PAINTED")
	private String properlyPainted;
	
	@Column(name = "OVERALL_GOODCONDITION")
	private String overallGoodCondition;
	
	@Column(name = "FREEFROM_STAINDIRT")
	private String freeFromStaindirt;
	
	@Column(name = "PROPERLY_CLEANED")
	private String properlyCleaned;
	
	@Column(name = "FREEFROM_ANYUNWANTEDSMELL")
	private String freeFromAnyUnwantedSmell;
	
	@Column(name = "DEPARTMENTHAVINGANY_STUFFINGPLAN")
	private String departmentHavingAnyStuffingPlan;
	
	@Column(name = "STUFFEDAS_PERPLAN")
	private String stuffedAsPerPlan;
	
	@Column(name = "NOOFPACKAGES_STUFFEDASPERPLAN")
	private String noOfPackagesStuffed;
	
	@Column(name = "DEPARTMENTHAVING_COPYOFCONTRACT")
	private String departmentHavingCopyOfContract;
	
	@Column(name = "STUFFINGISCARRIEDOY_ASPERINSTRUCTION")
	private String stuffingIsCarriedOutAsPerInstruction;
	
	@Column(name = "ISTHEREANY_SPECIALINSTRUCTION")
	private String isThereAnySpecialInstruction;
	
	@Column(name = "ISTHESTUFFIGISDONE_ASPERSPECIALINSTRUCTION")
	private String isTheStuffingIsDoneAsPerSpecialInstruction;
	
	@Column(name = "ISPOLYTHENESHEET_USEDFORFLOORCOVERING")
	private String isPolytheneSheetUsedForFloorCovering;
	
	@Column(name = "ISPOLYTHENE_CLEAN")
	private String isPolytheneClean;
	
	@Column(name = "ALLTHEPACKAGES_PROPERLYIDENTIFIED")
	private String allThePackagesProperlyIdentified;
	
	@Column(name = "FUMIGGATION_DONE")
	private String famigationDone;
	
	@Column(name = "ANYOTHER_SPECIALREQUIREMENT")
	private String anyOtherSpecialRequriement;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "FINAL_CONCLUSION")
	private String finalConclusion;
	
	
	
	@Column(name = "REASON")
	private String reason;
	
	
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
		
		
		//SECURITY
		
		@Column(name = "SECURITY__STATUS")
		private String security_status;
		
		@Column(name = "SECURITY__SAVED_ON")
		private Date security_saved_on;

		@Column(name = "SECURITY_SAVED_BY")
		private String security_saved_by;

		@Column(name = "SECURITY_SAVED_ID")
		private Long security_saved_id;

		@Column(name = "SECURITY__SUBMIT_ON")
		private Date security_submit_on;

		@Column(name = "SECURITY_SUBMIT_BY")
		private String security_submit_by;

		@Column(name = "SECURITY_SUBMIT_ID")
		private Long security_submit_id;

		@Column(name = "SECURITY__SIGN")
		private String security_sign;
		
		
		//PROD SUPERVISOR
		
			@Column(name = "DISPATCH_SUPERVISOR_STATUS")
			private String dispatch_supervisor_status;

			@Column(name = "DISPATCH_SUPERVISOR_SAVE_ON")
			private Date dispatch_supervisor_save_on;

			@Column(name = "DISPATCH_SUPERVISOR_SAVE_BY")
			private String dispatch_supervisor_save_by;

			@Column(name = "DISPATCH_SUPERVISOR_SAVE_ID")
			private Long dispatch_supervisor_save_id;

			@Column(name = "DISPATCH_SUPERVISOR_SUBMIT_ON")
			private Date dispatch_supervisor_submit_on;

			@Column(name = "DISPATCH_SUPERVISOR_SUBMIT_BY")
			private String dispatch_supervisor_submit_by;

			@Column(name = "DISPATCH_SUPERVISOR_SUBMIT_ID")
			private Long dispatch_supervisor_submit_id;

			@Column(name = "DISPATCH_SUPERVISOR_SIGN")
			private String dispatch_supervisor_sign;
		
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
			
			
			// sign image
			
			@Lob
			@Column(name = "SECURITY_SIGNATURE_IMAGE")
			private byte[] security_signature_image;

			@Lob
			@Column(name = "QA_INSPECTOR_SIGNATURE_IMAGE")
			private byte[] qa_inspector_signature_image;

			@Lob
			@Column(name = "DISPATCH_SUPERVISOR_SIGNATURE_IMAGE")
			private byte[] dispatch_supervisor_signature_image;

			@Lob
			@Column(name = "QA_MR_SIGNATURE_IMAGE")
			private byte[] qa_mr_signature_image;
	

@OneToMany(targetEntity = QaContainerInspectionReportLines.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "CONTAINER_ID", referencedColumnName = "CONTAINER_ID")
	private List<QaContainerInspectionReportLines> details;




}
